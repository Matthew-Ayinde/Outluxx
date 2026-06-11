import type { Product, ProductCategory } from "@/types/commerce";

const B = "https://picsum.photos/seed";

export const products: Product[] = [
  // ── WOMEN ────────────────────────────────────────────────────────────────
  {
    id: "w-001", slug: "midnight-silk-slip-dress",
    title: "Midnight Silk Slip Dress", brand: "Maison Altair",
    category: "women", subcategory: "Dresses",
    price: 1250, isNew: true, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-w1a/600/800`, alt: "Midnight Silk Slip Dress – front" },
      { src: `${B}/olx-w1b/600/800`, alt: "Midnight Silk Slip Dress – back" },
      { src: `${B}/olx-w1c/600/800`, alt: "Midnight Silk Slip Dress – detail" },
    ],
    description: "Cut from fluid silk charmeuse, this minimalist slip dress captures effortless sophistication. The bias-cut silhouette skims the body with languid precision, the hem grazing the mid-calf. Adjustable spaghetti straps and a satin-covered button at the back.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: false },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Midnight", value: "midnight", available: true },
      { label: "Ivory",    value: "ivory",    available: true },
      { label: "Burgundy", value: "burgundy", available: false },
    ],
    material: "100% Silk Charmeuse",
    careInstructions: "Dry clean only",
    tags: ["silk", "slip-dress", "evening", "minimalist"],
    designerId: "maison-altair",
  },
  {
    id: "w-002", slug: "oversized-cashmere-coat",
    title: "Oversized Cashmere Coat", brand: "Studio Voss",
    category: "women", subcategory: "Coats",
    price: 3400, isNew: false, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-w2a/600/800`, alt: "Oversized Cashmere Coat – front" },
      { src: `${B}/olx-w2b/600/800`, alt: "Oversized Cashmere Coat – back" },
    ],
    description: "A generously cut coat crafted from double-faced cashmere. The oversized silhouette and clean lines epitomise quiet luxury. Notched lapels, two deep pockets, and a single-button fastening at the waist.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: false },
    ],
    colors: [
      { label: "Camel",  value: "camel",  available: true },
      { label: "Black",  value: "black",  available: true },
      { label: "Stone",  value: "stone",  available: true },
    ],
    material: "100% Double-faced Cashmere",
    careInstructions: "Dry clean only",
    tags: ["cashmere", "coat", "oversized", "investment"],
    designerId: "studio-voss",
  },
  {
    id: "w-003", slug: "wide-leg-crepe-trousers",
    title: "Wide-Leg Crêpe Trousers", brand: "Helios Collective",
    category: "women", subcategory: "Trousers",
    price: 680, compareAtPrice: 895,
    isNew: false, isSale: true, isFeatured: false,
    images: [
      { src: `${B}/olx-w3a/600/800`, alt: "Wide-Leg Crêpe Trousers – front" },
      { src: `${B}/olx-w3b/600/800`, alt: "Wide-Leg Crêpe Trousers – side" },
    ],
    description: "Tailored from fluid crêpe, these wide-leg trousers balance structured elegance with effortless wearability. High-rise waist with single pleat at the front.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: false },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Navy", value: "navy", available: true },
      { label: "Black", value: "black", available: true },
      { label: "Ivory", value: "ivory", available: false },
    ],
    material: "75% Polyester, 25% Viscose Crêpe",
    careInstructions: "Machine wash cold, hang dry",
    tags: ["trousers", "wide-leg", "sale", "workwear"],
    designerId: "helios-collective",
  },
  {
    id: "w-004", slug: "ribbed-merino-turtleneck",
    title: "Ribbed Merino Turtleneck", brand: "Nero & Co.",
    category: "women", subcategory: "Knitwear",
    price: 445, isNew: true, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-w4a/600/800`, alt: "Ribbed Merino Turtleneck – front" },
      { src: `${B}/olx-w4b/600/800`, alt: "Ribbed Merino Turtleneck – detail" },
    ],
    description: "A classic silhouette refined in superfine merino wool. The close-fitting ribbed construction flatters the body with understated precision. Falls to the hip.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Cream",    value: "cream",    available: true },
      { label: "Charcoal", value: "charcoal", available: true },
      { label: "Black",    value: "black",    available: true },
      { label: "Blush",    value: "blush",    available: true },
    ],
    material: "100% Superfine Merino Wool",
    careInstructions: "Hand wash cold or dry clean",
    tags: ["knitwear", "merino", "turtleneck", "new-arrival"],
    designerId: "nero-co",
  },
  {
    id: "w-005", slug: "tailored-single-breast-blazer",
    title: "Tailored Single-Breast Blazer", brand: "Valmont Atelier",
    category: "women", subcategory: "Blazers",
    price: 1650, isNew: false, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-w5a/600/800`, alt: "Tailored Blazer – front" },
      { src: `${B}/olx-w5b/600/800`, alt: "Tailored Blazer – back" },
    ],
    description: "Precision-tailored from Italian wool, this single-breast blazer is the cornerstone of a polished wardrobe. Structured shoulder, nipped waist, and flap pockets.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: false },
    ],
    colors: [
      { label: "Black", value: "black", available: true },
      { label: "Navy",  value: "navy",  available: true },
      { label: "Chalk", value: "chalk", available: true },
    ],
    material: "95% Virgin Wool, 5% Cashmere",
    careInstructions: "Dry clean only",
    tags: ["blazer", "tailored", "workwear", "investment"],
    designerId: "valmont-atelier",
  },
  {
    id: "w-006", slug: "asymmetric-silk-blouse",
    title: "Asymmetric Silk Blouse", brand: "Ligne Claire",
    category: "women", subcategory: "Tops",
    price: 595, compareAtPrice: 780,
    isNew: false, isSale: true, isFeatured: false,
    images: [
      { src: `${B}/olx-w6a/600/800`, alt: "Asymmetric Silk Blouse – front" },
    ],
    description: "An asymmetric hemline gives this silk blouse a sculptural edge. Crafted from Habotai silk with a relaxed, fluid drape. Concealed side zip.",
    sizes: [
      { label: "XS", value: "xs", available: false },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "White",      value: "white",      available: true },
      { label: "Champagne",  value: "champagne",  available: true },
    ],
    material: "100% Silk Habotai",
    careInstructions: "Dry clean only",
    tags: ["silk", "blouse", "sale", "evening"],
    designerId: "ligne-claire",
  },
  {
    id: "w-007", slug: "plisse-maxi-skirt",
    title: "Plissé Maxi Skirt", brand: "Opus One",
    category: "women", subcategory: "Skirts",
    price: 870, isNew: true, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-w7a/600/800`, alt: "Plissé Maxi Skirt – front" },
      { src: `${B}/olx-w7b/600/800`, alt: "Plissé Maxi Skirt – detail" },
    ],
    description: "Permanently pleated silk georgette falls in graceful, elongated columns. An editorial statement grounded in classical technique. Elasticated waistband.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: false },
    ],
    colors: [
      { label: "Forest Green", value: "forest-green", available: true },
      { label: "Blush",        value: "blush",        available: true },
      { label: "Black",        value: "black",        available: true },
    ],
    material: "100% Silk Georgette",
    careInstructions: "Dry clean only",
    tags: ["skirt", "silk", "maxi", "new-arrival", "editorial"],
    designerId: "opus-one",
  },
  {
    id: "w-008", slug: "double-breasted-wool-coat",
    title: "Double-Breasted Wool Coat", brand: "Silhouette House",
    category: "women", subcategory: "Coats",
    price: 2850, isNew: false, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-w8a/600/800`, alt: "Double-Breasted Wool Coat – front" },
      { src: `${B}/olx-w8b/600/800`, alt: "Double-Breasted Wool Coat – back" },
    ],
    description: "A commanding double-breasted silhouette in Italian virgin wool. Belt-optional design with structured lapels and covered buttons. Fully lined in silk satin.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: false },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Charcoal", value: "charcoal", available: true },
      { label: "Camel",    value: "camel",    available: true },
      { label: "Black",    value: "black",    available: true },
    ],
    material: "100% Italian Virgin Wool, Silk Satin Lining",
    careInstructions: "Dry clean only",
    tags: ["coat", "wool", "investment", "double-breasted"],
    designerId: "silhouette-house",
  },

  // ── MEN ──────────────────────────────────────────────────────────────────
  {
    id: "m-001", slug: "italian-wool-two-piece-suit",
    title: "Italian Wool Two-Piece Suit", brand: "Atelier Milo",
    category: "men", subcategory: "Suits",
    price: 4200, isNew: false, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-m1a/600/800`, alt: "Italian Wool Suit – front" },
      { src: `${B}/olx-m1b/600/800`, alt: "Italian Wool Suit – detail" },
    ],
    description: "Cut from Loro Piana wool in Napoli, this two-piece suit balances British structure with Mediterranean ease. Full-canvas construction for superior drape and longevity.",
    sizes: [
      { label: "44R", value: "44r", available: true },
      { label: "46R", value: "46r", available: true },
      { label: "48R", value: "48r", available: true },
      { label: "50R", value: "50r", available: false },
      { label: "52R", value: "52r", available: true },
    ],
    colors: [
      { label: "Charcoal",  value: "charcoal",  available: true },
      { label: "Navy",      value: "navy",      available: true },
      { label: "Mid Grey",  value: "mid-grey",  available: true },
    ],
    material: "100% Loro Piana Wool",
    careInstructions: "Dry clean only",
    tags: ["suit", "wool", "italian", "investment", "formal"],
    designerId: "atelier-milo",
  },
  {
    id: "m-002", slug: "oxford-button-down-shirt",
    title: "Oxford Button-Down Shirt", brand: "Forma Studio",
    category: "men", subcategory: "Shirts",
    price: 320, isNew: true, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-m2a/600/800`, alt: "Oxford Shirt – front" },
      { src: `${B}/olx-m2b/600/800`, alt: "Oxford Shirt – detail" },
    ],
    description: "Woven from Japanese Oxford cotton with a slightly stiff hand that softens with wear. Mother-of-pearl buttons, back box pleat. A shirt built to last decades.",
    sizes: [
      { label: "S",   value: "s",   available: true },
      { label: "M",   value: "m",   available: true },
      { label: "L",   value: "l",   available: true },
      { label: "XL",  value: "xl",  available: true },
      { label: "XXL", value: "xxl", available: false },
    ],
    colors: [
      { label: "White", value: "white", available: true },
      { label: "Blue",  value: "blue",  available: true },
      { label: "Pink",  value: "pink",  available: true },
    ],
    material: "100% Japanese Oxford Cotton",
    careInstructions: "Machine wash 30°C, iron medium heat",
    tags: ["shirt", "oxford", "classic", "new-arrival"],
    designerId: "forma-studio",
  },
  {
    id: "m-003", slug: "slim-fit-merino-crew",
    title: "Slim-Fit Merino Crew", brand: "Crespi Milano",
    category: "men", subcategory: "Knitwear",
    price: 490, compareAtPrice: 650,
    isNew: false, isSale: true, isFeatured: false,
    images: [
      { src: `${B}/olx-m3a/600/800`, alt: "Merino Crew – front" },
    ],
    description: "Extra-fine merino in a slim silhouette. Ribbed cuffs and hem, reinforced shoulder seams. Classic construction with no concessions to quality.",
    sizes: [
      { label: "S",   value: "s",   available: true },
      { label: "M",   value: "m",   available: true },
      { label: "L",   value: "l",   available: true },
      { label: "XL",  value: "xl",  available: false },
      { label: "XXL", value: "xxl", available: true },
    ],
    colors: [
      { label: "Navy",    value: "navy",    available: true },
      { label: "Oatmeal", value: "oatmeal", available: true },
      { label: "Black",   value: "black",   available: true },
      { label: "Forest",  value: "forest",  available: true },
    ],
    material: "100% Extra-Fine Merino Wool",
    careInstructions: "Hand wash or dry clean",
    tags: ["knitwear", "merino", "sale"],
    designerId: "crespi-milano",
  },
  {
    id: "m-004", slug: "leather-trim-bomber-jacket",
    title: "Leather-Trim Bomber Jacket", brand: "Dorset Row",
    category: "men", subcategory: "Jackets",
    price: 1890, isNew: true, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-m4a/600/800`, alt: "Bomber Jacket – front" },
      { src: `${B}/olx-m4b/600/800`, alt: "Bomber Jacket – back" },
    ],
    description: "Washed nylon shell with hand-finished full-grain leather collar and cuffs. A modern interpretation of the classic MA-1 reconsidered for contemporary luxury.",
    sizes: [
      { label: "S",   value: "s",   available: true },
      { label: "M",   value: "m",   available: true },
      { label: "L",   value: "l",   available: true },
      { label: "XL",  value: "xl",  available: true },
      { label: "XXL", value: "xxl", available: false },
    ],
    colors: [
      { label: "Black", value: "black", available: true },
      { label: "Olive", value: "olive", available: true },
    ],
    material: "Shell: 100% Nylon; Collar & Cuffs: Full-grain leather",
    careInstructions: "Dry clean leather elements only; wipe nylon with damp cloth",
    tags: ["jacket", "bomber", "leather", "new-arrival"],
    designerId: "dorset-row",
  },
  {
    id: "m-005", slug: "pleated-wool-trousers",
    title: "Pleated Wool Trousers", brand: "Atelier Milo",
    category: "men", subcategory: "Trousers",
    price: 780, isNew: false, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-m5a/600/800`, alt: "Pleated Trousers – front" },
    ],
    description: "Double-pleated trousers in flannel wool with a high-rise waist and tapered leg. Side adjusters. A masterclass in Italian tailoring tradition.",
    sizes: [
      { label: "28", value: "28", available: true },
      { label: "30", value: "30", available: true },
      { label: "32", value: "32", available: true },
      { label: "34", value: "34", available: true },
      { label: "36", value: "36", available: false },
    ],
    colors: [
      { label: "Stone",    value: "stone",    available: true },
      { label: "Charcoal", value: "charcoal", available: true },
      { label: "Navy",     value: "navy",     available: true },
    ],
    material: "100% Wool Flannel",
    careInstructions: "Dry clean only",
    tags: ["trousers", "wool", "tailored", "italian"],
    designerId: "atelier-milo",
  },
  {
    id: "m-006", slug: "cashmere-rollneck-sweater",
    title: "Cashmere Rollneck", brand: "Crespi Milano",
    category: "men", subcategory: "Knitwear",
    price: 820, isNew: false, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-m6a/600/800`, alt: "Cashmere Rollneck – front" },
      { src: `${B}/olx-m6b/600/800`, alt: "Cashmere Rollneck – detail" },
    ],
    description: "Grade-A Mongolian cashmere in a relaxed rollneck silhouette. Two-ply construction for warmth without weight.",
    sizes: [
      { label: "S",   value: "s",   available: true },
      { label: "M",   value: "m",   available: true },
      { label: "L",   value: "l",   available: true },
      { label: "XL",  value: "xl",  available: true },
      { label: "XXL", value: "xxl", available: true },
    ],
    colors: [
      { label: "Camel", value: "camel", available: true },
      { label: "Black", value: "black", available: true },
      { label: "Ivory", value: "ivory", available: true },
      { label: "Navy",  value: "navy",  available: true },
    ],
    material: "100% Grade-A Mongolian Cashmere",
    careInstructions: "Hand wash cold or dry clean",
    tags: ["cashmere", "knitwear", "rollneck"],
    designerId: "crespi-milano",
  },

  // ── ACCESSORIES ───────────────────────────────────────────────────────────
  {
    id: "a-001", slug: "structured-leather-tote",
    title: "Structured Leather Tote", brand: "Maison Altair",
    category: "accessories", subcategory: "Bags",
    price: 2100, isNew: true, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-a1a/600/800`, alt: "Structured Leather Tote – front" },
      { src: `${B}/olx-a1b/600/800`, alt: "Structured Leather Tote – interior" },
      { src: `${B}/olx-a1c/600/800`, alt: "Structured Leather Tote – detail" },
    ],
    description: "Full-grain Florentine leather structured to hold its form without sacrificing softness. Suede lining, polished brass fittings, two interior slip pockets and one zipped compartment.",
    sizes: [{ label: "One Size", value: "os", available: true }],
    colors: [
      { label: "Black",    value: "black",    available: true },
      { label: "Tan",      value: "tan",      available: true },
      { label: "Burgundy", value: "burgundy", available: true },
    ],
    material: "Full-grain Florentine Leather, Suede Lining",
    careInstructions: "Wipe with a dry cloth; condition with leather balm seasonally",
    tags: ["bag", "tote", "leather", "new-arrival", "investment"],
    designerId: "maison-altair",
  },
  {
    id: "a-002", slug: "italian-leather-belt",
    title: "Italian Leather Belt", brand: "Valmont Atelier",
    category: "accessories", subcategory: "Belts",
    price: 290, compareAtPrice: 380,
    isNew: false, isSale: true, isFeatured: false,
    images: [{ src: `${B}/olx-a2a/600/800`, alt: "Italian Leather Belt" }],
    description: "Single-piece full-grain vegetable-tanned leather with a polished silver buckle. Develops a rich patina with wear.",
    sizes: [
      { label: "75cm", value: "75", available: true },
      { label: "80cm", value: "80", available: true },
      { label: "85cm", value: "85", available: true },
      { label: "90cm", value: "90", available: true },
      { label: "95cm", value: "95", available: false },
    ],
    colors: [
      { label: "Tan",        value: "tan",        available: true },
      { label: "Black",      value: "black",      available: true },
      { label: "Dark Brown", value: "dark-brown", available: true },
    ],
    material: "Full-grain vegetable-tanned leather",
    careInstructions: "Condition with leather cream every 6 months",
    tags: ["belt", "leather", "sale", "italian"],
    designerId: "valmont-atelier",
  },
  {
    id: "a-003", slug: "cashmere-wrap-scarf",
    title: "Cashmere Wrap Scarf", brand: "Nero & Co.",
    category: "accessories", subcategory: "Scarves",
    price: 650, isNew: false, isSale: false, isFeatured: false,
    images: [{ src: `${B}/olx-a3a/600/800`, alt: "Cashmere Wrap Scarf" }],
    description: "Oversized cashmere wrap in a luxuriously soft hand. Woven in Scotland, naturally dyed, with hand-rolled edges. 200 × 70cm.",
    sizes: [{ label: "One Size", value: "os", available: true }],
    colors: [
      { label: "Burgundy",     value: "burgundy",     available: true },
      { label: "Camel",        value: "camel",        available: true },
      { label: "Forest Green", value: "forest-green", available: true },
      { label: "Black",        value: "black",        available: true },
    ],
    material: "100% Cashmere",
    careInstructions: "Hand wash cold with mild detergent, flat dry",
    tags: ["scarf", "cashmere", "wrap", "accessories"],
    designerId: "nero-co",
  },
  {
    id: "a-004", slug: "gold-frame-sunglasses",
    title: "Gold-Frame Sunglasses", brand: "Ligne Claire",
    category: "accessories", subcategory: "Eyewear",
    price: 420, isNew: true, isSale: false, isFeatured: false,
    images: [{ src: `${B}/olx-a4a/600/800`, alt: "Gold Frame Sunglasses" }],
    description: "Thin gold-tone frame with polarised lenses. Inspired by Sixties Italian elegance, produced by hand in Cadore, Italy. Includes leather case.",
    sizes: [{ label: "One Size", value: "os", available: true }],
    colors: [
      { label: "Gold / Grey Lens",   value: "gold-grey",   available: true },
      { label: "Gold / Brown Lens",  value: "gold-brown",  available: true },
      { label: "Silver / Grey Lens", value: "silver-grey", available: true },
    ],
    material: "Gold-tone metal frame, Polarised CR-39 lenses",
    careInstructions: "Clean with microfibre cloth; store in provided leather case",
    tags: ["sunglasses", "gold", "new-arrival", "italian"],
    designerId: "ligne-claire",
  },
  {
    id: "a-005", slug: "suede-chelsea-boots",
    title: "Suede Chelsea Boots", brand: "Atelier Milo",
    category: "accessories", subcategory: "Shoes",
    price: 1350, compareAtPrice: 1750,
    isNew: false, isSale: true, isFeatured: true,
    images: [
      { src: `${B}/olx-a5a/600/800`, alt: "Suede Chelsea Boots – side" },
      { src: `${B}/olx-a5b/600/800`, alt: "Suede Chelsea Boots – detail" },
    ],
    description: "Hand-lasted in London from butter-soft nubuck suede, with a Goodyear-welted leather sole. An heirloom quality boot built to be resoled and worn for a generation.",
    sizes: [
      { label: "38", value: "38", available: true },
      { label: "39", value: "39", available: true },
      { label: "40", value: "40", available: true },
      { label: "41", value: "41", available: true },
      { label: "42", value: "42", available: false },
      { label: "43", value: "43", available: true },
      { label: "44", value: "44", available: true },
    ],
    colors: [
      { label: "Tan",      value: "tan",      available: true },
      { label: "Black",    value: "black",    available: true },
      { label: "Chestnut", value: "chestnut", available: true },
    ],
    material: "Nubuck Suede Upper, Leather Insole, Goodyear-welted Leather Sole",
    careInstructions: "Brush with suede brush; waterproof before first wear",
    tags: ["boots", "chelsea", "suede", "sale", "shoes"],
    designerId: "atelier-milo",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getSaleProducts(): Product[] {
  return products.filter((p) => p.isSale);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
  );
}

export const ALL_SUBCATEGORIES = [...new Set(products.map((p) => p.subcategory))];
export const ALL_COLORS = [...new Set(products.flatMap((p) => p.colors.map((c) => c.label)))];
export const ALL_BRANDS = [...new Set(products.map((p) => p.brand))];
