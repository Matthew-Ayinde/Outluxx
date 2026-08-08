// Fixed catalog of media "slots" — the specific pictures/videos that appear
// on the storefront. The admin Media section only ever swaps the file behind
// a slot; labels, copy, and layout stay hardcoded in the homepage components.
export type MediaType = "image" | "video";

export interface MediaSlotDef {
  id: string;
  label: string;
  group: string;
  allowed: MediaType[];
  defaultType: MediaType;
  defaultUrl: string;
}

export const MEDIA_SLOTS: MediaSlotDef[] = [
  {
    id: "hero-slide-1",
    label: "Hero Slide 1",
    group: "Homepage Hero",
    allowed: ["image", "video"],
    defaultType: "video",
    defaultUrl: "/media/home/hero1.MOV",
  },
  {
    id: "hero-slide-2",
    label: "Hero Slide 2",
    group: "Homepage Hero",
    allowed: ["image", "video"],
    defaultType: "image",
    defaultUrl: "/media/img3.PNG",
  },
  {
    id: "hero-slide-3",
    label: "Hero Slide 3",
    group: "Homepage Hero",
    allowed: ["image", "video"],
    defaultType: "video",
    defaultUrl: "/media/home/hero2.MOV",
  },
  {
    id: "hero-slide-4",
    label: "Hero Slide 4",
    group: "Homepage Hero",
    allowed: ["image", "video"],
    defaultType: "image",
    defaultUrl: "/media/img9.PNG",
  },
  {
    id: "category-tshirts",
    label: "T-Shirts Category",
    group: "Category Grid",
    allowed: ["image"],
    defaultType: "image",
    defaultUrl: "/media/img10.PNG",
  },
  {
    id: "category-pants",
    label: "Pants Category",
    group: "Category Grid",
    allowed: ["image"],
    defaultType: "image",
    defaultUrl: "/media/img2.PNG",
  },
  {
    id: "category-armless",
    label: "Armless Category",
    group: "Category Grid",
    allowed: ["image"],
    defaultType: "image",
    defaultUrl: "/media/img8.PNG",
  },
  {
    id: "category-tanktops",
    label: "Tank Tops Category",
    group: "Category Grid",
    allowed: ["image"],
    defaultType: "image",
    defaultUrl: "/media/img6.PNG",
  },
  {
    id: "plp-hero-tshirts",
    label: "T-Shirts Page Hero",
    group: "Category Page Hero",
    allowed: ["image"],
    defaultType: "image",
    defaultUrl: "https://picsum.photos/seed/olx-hero-tshirts/1600/600",
  },
  {
    id: "plp-hero-pants",
    label: "Pants Page Hero",
    group: "Category Page Hero",
    allowed: ["image"],
    defaultType: "image",
    defaultUrl: "https://picsum.photos/seed/olx-hero-pants/1600/600",
  },
  {
    id: "plp-hero-armless",
    label: "Armless Page Hero",
    group: "Category Page Hero",
    allowed: ["image"],
    defaultType: "image",
    defaultUrl: "https://picsum.photos/seed/olx-hero-armless/1600/600",
  },
  {
    id: "plp-hero-tanktops",
    label: "Tank Tops Page Hero",
    group: "Category Page Hero",
    allowed: ["image"],
    defaultType: "image",
    defaultUrl: "https://picsum.photos/seed/olx-hero-tanktops/1600/600",
  },
  {
    id: "plp-hero-newarrivals",
    label: "New Arrivals Page Hero",
    group: "Category Page Hero",
    allowed: ["image"],
    defaultType: "image",
    defaultUrl: "https://picsum.photos/seed/olx-hero-newarrivals/1600/600",
  },
  {
    id: "plp-hero-sale",
    label: "Sale Page Hero",
    group: "Category Page Hero",
    allowed: ["image"],
    defaultType: "image",
    defaultUrl: "https://picsum.photos/seed/olx-hero-sale/1600/600",
  },
];

export const MEDIA_SLOT_IDS = MEDIA_SLOTS.map((s) => s.id);

export function getMediaSlotDef(id: string): MediaSlotDef | undefined {
  return MEDIA_SLOTS.find((s) => s.id === id);
}

/** Derives a poster frame URL from a Cloudinary video delivery URL (first frame, as JPG). */
export function cloudinaryVideoPoster(url: string): string | undefined {
  if (!url.includes("res.cloudinary.com") || !url.includes("/video/upload/")) return undefined;
  return url.replace("/video/upload/", "/video/upload/so_0/").replace(/\.[a-zA-Z0-9]+($|\?)/, ".jpg$1");
}
