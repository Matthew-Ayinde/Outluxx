import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { ok, err, requireAdmin, isNextResponse } from "@/lib/utils/api";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "products";

  if (!file) return err("No file provided", 400);

  const allowed = ["products", "content", "editorial"];
  if (!allowed.includes(folder)) return err("Invalid folder", 400);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const resourceType = file.type.startsWith("video") ? "video" : "image";

  const result = await cloudinary.uploader.upload(base64, {
    folder: `outluxx/${folder}`,
    resource_type: resourceType,
    transformation: resourceType === "image"
      ? [{ quality: "auto", fetch_format: "auto" }]
      : undefined,
  });

  return ok({
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    resourceType: result.resource_type,
  });
}
