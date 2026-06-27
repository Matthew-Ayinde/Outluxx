import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { Content } from "@/lib/db/models/Content";
import { ok, err, requireAdmin, isNextResponse } from "@/lib/utils/api";

const CreateContentSchema = z.object({
  key: z.string().min(1),
  type: z.enum(["hero", "editorial", "banner", "carousel"]),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  cloudinaryPublicId: z.string().optional(),
  mediaUrl: z.string().url(),
  mediaType: z.enum(["image", "video"]).default("image"),
  cta: z.object({ text: z.string(), href: z.string() }).optional(),
  active: z.boolean().default(true),
  order: z.number().int().default(0),
});

export async function GET() {
  await connectDB();
  const content = await Content.find({ active: true }).sort({ order: 1 }).lean();
  return ok(content);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  await connectDB();
  const body = await req.json();
  const parsed = CreateContentSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const existing = await Content.findOne({ key: parsed.data.key });
  if (existing) return err("A content block with this key already exists", 409);

  const content = await Content.create(parsed.data);
  return ok(content.toObject(), 201);
}
