import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/db/mongoose";
import { SiteMedia } from "@/lib/db/models/SiteMedia";
import { getMediaSlotDef } from "@/lib/media/slots";
import { ok, err, requireAdmin, isNextResponse } from "@/lib/utils/api";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Params = { params: Promise<{ slot: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  const { slot } = await params;
  const def = getMediaSlotDef(slot);
  if (!def) return err("Unknown media slot", 404);

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return err("No file provided", 400);

  const resourceType = file.type.startsWith("video") ? "video" : "image";
  if (!def.allowed.includes(resourceType)) {
    return err(`This slot only accepts: ${def.allowed.join(", ")}`, 400);
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  await connectDB();
  const existing = await SiteMedia.findOne({ slot });

  const result = await cloudinary.uploader.upload(base64, {
    folder: "outlxx/site-media",
    resource_type: resourceType,
    transformation:
      resourceType === "image" ? [{ quality: "auto", fetch_format: "auto" }] : undefined,
  });

  if (existing?.cloudinaryPublicId) {
    await cloudinary.uploader.destroy(existing.cloudinaryPublicId, {
      resource_type: existing.mediaType,
    });
  }

  const doc = await SiteMedia.findOneAndUpdate(
    { slot },
    {
      slot,
      mediaType: resourceType,
      url: result.secure_url,
      cloudinaryPublicId: result.public_id,
    },
    { new: true, upsert: true }
  ).lean();

  return ok(doc);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  const { slot } = await params;
  const def = getMediaSlotDef(slot);
  if (!def) return err("Unknown media slot", 404);

  await connectDB();
  const existing = await SiteMedia.findOne({ slot });
  if (!existing) return ok({ reset: true });

  if (existing.cloudinaryPublicId) {
    await cloudinary.uploader.destroy(existing.cloudinaryPublicId, {
      resource_type: existing.mediaType,
    });
  }

  await existing.deleteOne();
  return ok({ reset: true });
}
