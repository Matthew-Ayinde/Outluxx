import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { Content } from "@/lib/db/models/Content";
import { ok, err, requireAdmin, isNextResponse } from "@/lib/utils/api";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Params = { params: Promise<{ key: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  await connectDB();
  const { key } = await params;
  const content = await Content.findOne({ key }).lean();
  if (!content) return err("Content block not found", 404);
  return ok(content);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  await connectDB();
  const { key } = await params;

  const UpdateSchema = z.object({
    title: z.string().min(1).optional(),
    subtitle: z.string().optional(),
    cloudinaryPublicId: z.string().optional(),
    mediaUrl: z.string().url().optional(),
    mediaType: z.enum(["image", "video"]).optional(),
    cta: z.object({ text: z.string(), href: z.string() }).optional(),
    active: z.boolean().optional(),
    order: z.number().int().optional(),
  });

  const body = await req.json();
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const content = await Content.findOneAndUpdate(
    { key },
    { $set: parsed.data },
    { new: true, runValidators: true }
  ).lean();

  if (!content) return err("Content block not found", 404);
  return ok(content);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  await connectDB();
  const { key } = await params;

  const content = await Content.findOne({ key });
  if (!content) return err("Content block not found", 404);

  if (content.cloudinaryPublicId) {
    const resourceType = content.mediaType === "video" ? "video" : "image";
    await cloudinary.uploader.destroy(content.cloudinaryPublicId, { resource_type: resourceType });
  }

  await content.deleteOne();
  return ok({ deleted: true });
}
