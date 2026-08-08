import connectDB from "@/lib/db/mongoose";
import { SiteMedia } from "@/lib/db/models/SiteMedia";
import { MEDIA_SLOTS } from "@/lib/media/slots";
import { ok } from "@/lib/utils/api";

export interface ResolvedMediaSlot {
  slot: string;
  label: string;
  group: string;
  allowed: ("image" | "video")[];
  mediaType: "image" | "video";
  url: string;
  isCustom: boolean;
}

export async function GET() {
  await connectDB();
  const overrides = await SiteMedia.find({}).lean();
  const overrideMap = new Map(overrides.map((o) => [o.slot, o]));

  const resolved: ResolvedMediaSlot[] = MEDIA_SLOTS.map((def) => {
    const override = overrideMap.get(def.id);
    return {
      slot: def.id,
      label: def.label,
      group: def.group,
      allowed: def.allowed,
      mediaType: override?.mediaType ?? def.defaultType,
      url: override?.url ?? def.defaultUrl,
      isCustom: !!override,
    };
  });

  return ok(resolved);
}
