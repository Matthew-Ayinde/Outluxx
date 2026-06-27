import type { Product, ProductCategory } from "@/types/commerce";

const B = "https://picsum.photos/seed";

export const products: Product[] = [
  // ── T-SHIRTS ─────────────────────────────────────────────────────────────
  {
    id: "ts-001", slug: "supima-classic-crew-tee",
    title: "Supima Classic Crew", brand: "Maison Altair",
    category: "tshirts", subcategory: "T-Shirts",
    price: 195, isNew: true, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-ts1a/600/800`, alt: "Supima Classic Crew – front" },
      { src: `${B}/olx-ts1b/600/800`, alt: "Supima Classic Crew – back" },
    ],
    description: "Cut from 100% Supima cotton in a structured single-jersey knit. The weight and hand-feel are immediately apparent — dense without stiffness, cool without thinness. A crew neck with precisely ribbed collar and a slightly elongated hem.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: false },
    ],
    colors: [
      { label: "White",    value: "white",    available: true },
      { label: "Black",    value: "black",    available: true },
      { label: "Stone",    value: "stone",    available: true },
    ],
    material: "100% Supima Cotton",
    careInstructions: "Machine wash cold, tumble dry low",
    tags: ["tshirt", "supima", "classic", "new-arrival"],
  },
  {
    id: "ts-002", slug: "pima-relaxed-v-neck",
    title: "Relaxed Pima V-Neck", brand: "Studio Voss",
    category: "tshirts", subcategory: "T-Shirts",
    price: 175, compareAtPrice: 225,
    isNew: false, isSale: true, isFeatured: false,
    images: [
      { src: `${B}/olx-ts2a/600/800`, alt: "Relaxed V-Neck – front" },
      { src: `${B}/olx-ts2b/600/800`, alt: "Relaxed V-Neck – detail" },
    ],
    description: "A relaxed, slightly oversized silhouette in Peruvian Pima cotton. The V-neck opening is shallow — refined rather than revealing. Drop shoulders for an effortlessly modern proportion.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: false },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Ivory",    value: "ivory",    available: true },
      { label: "Charcoal", value: "charcoal", available: true },
    ],
    material: "100% Peruvian Pima Cotton",
    careInstructions: "Machine wash cold, hang dry",
    tags: ["tshirt", "pima", "relaxed", "sale"],
  },
  {
    id: "ts-003", slug: "mercerised-polo-tee",
    title: "Mercerised Polo Tee", brand: "Crespi Milano",
    category: "tshirts", subcategory: "T-Shirts",
    price: 285, isNew: true, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-ts3a/600/800`, alt: "Mercerised Polo Tee – front" },
      { src: `${B}/olx-ts3b/600/800`, alt: "Mercerised Polo Tee – side" },
    ],
    description: "Mercerised Egyptian cotton with a subtle lustre and silk-like drape. A two-button placket, spread collar, and clean hems. The fabric is cool to the touch and holds its form over years of wear.",
    sizes: [
      { label: "S",   value: "s",   available: true },
      { label: "M",   value: "m",   available: true },
      { label: "L",   value: "l",   available: true },
      { label: "XL",  value: "xl",  available: true },
      { label: "XXL", value: "xxl", available: false },
    ],
    colors: [
      { label: "White",     value: "white",     available: true },
      { label: "Navy",      value: "navy",      available: true },
      { label: "Midnight",  value: "midnight",  available: true },
    ],
    material: "100% Mercerised Egyptian Cotton",
    careInstructions: "Hand wash cold or machine wash delicate",
    tags: ["tshirt", "polo", "mercerised", "new-arrival"],
  },
  {
    id: "ts-004", slug: "modal-longline-tee",
    title: "Modal Longline Tee", brand: "Nero & Co.",
    category: "tshirts", subcategory: "T-Shirts",
    price: 155, isNew: false, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-ts4a/600/800`, alt: "Modal Longline Tee – front" },
    ],
    description: "A longline silhouette in TENCEL Modal — one of the softest natural fibres available. The slight curve hem and minimal seaming create a clean architectural line. Exceptionally lightweight.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Black",     value: "black",     available: true },
      { label: "Chalk",     value: "chalk",     available: true },
      { label: "Slate",     value: "slate",     available: true },
    ],
    material: "100% TENCEL Modal",
    careInstructions: "Machine wash cold, hang dry",
    tags: ["tshirt", "modal", "longline", "minimalist"],
  },
  {
    id: "ts-005", slug: "structured-boxy-tee",
    title: "Structured Boxy Tee", brand: "Forma Studio",
    category: "tshirts", subcategory: "T-Shirts",
    price: 220, isNew: false, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-ts5a/600/800`, alt: "Structured Boxy Tee – front" },
      { src: `${B}/olx-ts5b/600/800`, alt: "Structured Boxy Tee – back" },
    ],
    description: "Japanese heavy cotton twill in a boxy, cropped silhouette. Seams are doubled for structure. A contemporary take on a wardrobe fundamental — architectural rather than casual.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: false },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Black",    value: "black",    available: true },
      { label: "Ecru",     value: "ecru",     available: true },
    ],
    material: "100% Japanese Heavy Cotton",
    careInstructions: "Machine wash cold inside out, hang dry",
    tags: ["tshirt", "boxy", "structured", "japanese"],
  },
  {
    id: "ts-006", slug: "silk-cotton-blend-tee",
    title: "Silk-Cotton Blend Tee", brand: "Valmont Atelier",
    category: "tshirts", subcategory: "T-Shirts",
    price: 340, isNew: true, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-ts6a/600/800`, alt: "Silk-Cotton Tee – front" },
      { src: `${B}/olx-ts6b/600/800`, alt: "Silk-Cotton Tee – detail" },
    ],
    description: "A 70/30 blend of cotton and Mulberry silk — an exceptional combination that yields extraordinary softness and a subtle natural sheen. Crew neck with a refined slubby texture.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: false },
    ],
    colors: [
      { label: "Pearl",    value: "pearl",    available: true },
      { label: "Black",    value: "black",    available: true },
    ],
    material: "70% Egyptian Cotton, 30% Mulberry Silk",
    careInstructions: "Hand wash cold only",
    tags: ["tshirt", "silk", "blend", "new-arrival", "luxury"],
  },

  // ── PANTS ─────────────────────────────────────────────────────────────────
  {
    id: "pt-001", slug: "wool-flannel-wide-trousers",
    title: "Wool Flannel Wide Trousers", brand: "Atelier Milo",
    category: "pants", subcategory: "Pants",
    price: 890, isNew: true, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-pt1a/600/800`, alt: "Wool Flannel Wide Trousers – front" },
      { src: `${B}/olx-pt1b/600/800`, alt: "Wool Flannel Wide Trousers – detail" },
    ],
    description: "Double-pleated, wide-leg trousers in Italian wool flannel. A high-rise waist with belt loops and side adjusters. The pleat creates volume through the thigh that tapers to a precise hem — a silhouette with genuine character.",
    sizes: [
      { label: "28", value: "28", available: true },
      { label: "30", value: "30", available: true },
      { label: "32", value: "32", available: true },
      { label: "34", value: "34", available: true },
      { label: "36", value: "36", available: false },
    ],
    colors: [
      { label: "Charcoal", value: "charcoal", available: true },
      { label: "Stone",    value: "stone",    available: true },
      { label: "Navy",     value: "navy",     available: true },
    ],
    material: "100% Wool Flannel",
    careInstructions: "Dry clean only",
    tags: ["pants", "wool", "wide-leg", "tailored", "new-arrival"],
  },
  {
    id: "pt-002", slug: "crepe-slim-trousers",
    title: "Crêpe Slim Trousers", brand: "Ligne Claire",
    category: "pants", subcategory: "Pants",
    price: 620, compareAtPrice: 780,
    isNew: false, isSale: true, isFeatured: false,
    images: [
      { src: `${B}/olx-pt2a/600/800`, alt: "Crêpe Slim Trousers – front" },
      { src: `${B}/olx-pt2b/600/800`, alt: "Crêpe Slim Trousers – back" },
    ],
    description: "Fluid crêpe in a slim, straight cut. The mid-rise waist and clean front present a refined, contemporary silhouette. Invisible side-zip fastening. A wardrobe essential in understated luxury.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: false },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Black",    value: "black",    available: true },
      { label: "Ivory",    value: "ivory",    available: true },
      { label: "Taupe",    value: "taupe",    available: true },
    ],
    material: "75% Polyester, 25% Viscose Crêpe",
    careInstructions: "Machine wash cold, hang dry",
    tags: ["pants", "crepe", "slim", "sale"],
  },
  {
    id: "pt-003", slug: "cashmere-jogger-pant",
    title: "Cashmere Jogger Pant", brand: "Nero & Co.",
    category: "pants", subcategory: "Pants",
    price: 1150, isNew: true, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-pt3a/600/800`, alt: "Cashmere Jogger – front" },
      { src: `${B}/olx-pt3b/600/800`, alt: "Cashmere Jogger – detail" },
    ],
    description: "Grade-A Mongolian cashmere in a relaxed jogger silhouette. Elasticated waistband with a single drawstring, ribbed cuffs at the ankle. Elevates the casual register into something genuinely considered.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Camel",    value: "camel",    available: true },
      { label: "Charcoal", value: "charcoal", available: true },
      { label: "Black",    value: "black",    available: true },
    ],
    material: "100% Grade-A Mongolian Cashmere",
    careInstructions: "Hand wash cold or dry clean",
    tags: ["pants", "cashmere", "jogger", "new-arrival", "luxury"],
  },
  {
    id: "pt-004", slug: "linen-wide-leg-pants",
    title: "Linen Wide-Leg Pants", brand: "Helios Collective",
    category: "pants", subcategory: "Pants",
    price: 485, isNew: false, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-pt4a/600/800`, alt: "Linen Wide-Leg Pants – front" },
    ],
    description: "Belgian linen in a generously wide cut. The fabric softens with each wash, developing a natural lived-in drape. High-rise waist with a concealed hook-and-bar closure. Clean, unlined, minimal.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: false },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Natural",  value: "natural",  available: true },
      { label: "Black",    value: "black",    available: true },
      { label: "Sand",     value: "sand",     available: true },
    ],
    material: "100% Belgian Linen",
    careInstructions: "Machine wash cold, line dry",
    tags: ["pants", "linen", "wide-leg", "minimal"],
  },
  {
    id: "pt-005", slug: "technical-tapered-trousers",
    title: "Technical Tapered Trousers", brand: "Forma Studio",
    category: "pants", subcategory: "Pants",
    price: 740, isNew: false, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-pt5a/600/800`, alt: "Technical Trousers – front" },
      { src: `${B}/olx-pt5b/600/800`, alt: "Technical Trousers – back" },
    ],
    description: "A performance-derived fabric — woven with stretch nylon — in a tailored, tapered cut. Water-resistant finish, invisible side pockets, single back welt pocket. Uncompromising function in a refined silhouette.",
    sizes: [
      { label: "28", value: "28", available: true },
      { label: "30", value: "30", available: true },
      { label: "32", value: "32", available: true },
      { label: "34", value: "34", available: true },
      { label: "36", value: "36", available: true },
    ],
    colors: [
      { label: "Black",     value: "black",     available: true },
      { label: "Graphite",  value: "graphite",  available: true },
    ],
    material: "85% Nylon, 15% Elastane",
    careInstructions: "Machine wash cold, hang dry",
    tags: ["pants", "technical", "tapered", "performance"],
  },
  {
    id: "pt-006", slug: "silk-wide-palazzo-pants",
    title: "Silk Wide Palazzo Pants", brand: "Valmont Atelier",
    category: "pants", subcategory: "Pants",
    price: 980, compareAtPrice: 1250,
    isNew: false, isSale: true, isFeatured: false,
    images: [
      { src: `${B}/olx-pt6a/600/800`, alt: "Palazzo Pants – front" },
      { src: `${B}/olx-pt6b/600/800`, alt: "Palazzo Pants – side" },
    ],
    description: "Palazzo-width trousers cut from Habotai silk — flowing and weightless. The fluid movement of the fabric creates a sculptural quality in motion. Elasticated waistband for ease. An evening silhouette reconsidered.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: false },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Ivory",    value: "ivory",    available: true },
      { label: "Black",    value: "black",    available: true },
      { label: "Nude",     value: "nude",     available: true },
    ],
    material: "100% Habotai Silk",
    careInstructions: "Dry clean only",
    tags: ["pants", "silk", "palazzo", "sale", "evening"],
  },

  // ── ARMLESS ───────────────────────────────────────────────────────────────
  {
    id: "ar-001", slug: "silk-slip-camisole",
    title: "Silk Slip Camisole", brand: "Maison Altair",
    category: "armless", subcategory: "Armless",
    price: 420, isNew: true, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-ar1a/600/800`, alt: "Silk Slip Camisole – front" },
      { src: `${B}/olx-ar1b/600/800`, alt: "Silk Slip Camisole – back" },
    ],
    description: "Washed Charmeuse silk in a languid camisole cut. Adjustable satin straps, a barely-there lace trim at the décolleté, and a fluid hem. Worn alone or layered — both are correct choices.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: false },
    ],
    colors: [
      { label: "Ivory",    value: "ivory",    available: true },
      { label: "Black",    value: "black",    available: true },
      { label: "Champagne", value: "champagne", available: true },
    ],
    material: "100% Washed Charmeuse Silk",
    careInstructions: "Dry clean only",
    tags: ["armless", "silk", "camisole", "new-arrival"],
  },
  {
    id: "ar-002", slug: "ribbed-knit-sleeveless-top",
    title: "Ribbed Knit Sleeveless", brand: "Studio Voss",
    category: "armless", subcategory: "Armless",
    price: 295, isNew: false, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-ar2a/600/800`, alt: "Ribbed Sleeveless – front" },
    ],
    description: "Fine-gauge merino wool in a close-knit rib. The sleeveless silhouette and scoop neck give it versatility — layer under a blazer or wear alone. Fitted without being restrictive.",
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
    ],
    material: "100% Fine-Gauge Merino Wool",
    careInstructions: "Hand wash cold or dry clean",
    tags: ["armless", "knit", "merino", "sleeveless"],
  },
  {
    id: "ar-003", slug: "structured-bustier-top",
    title: "Structured Bustier Top", brand: "Valmont Atelier",
    category: "armless", subcategory: "Armless",
    price: 695, compareAtPrice: 890,
    isNew: false, isSale: true, isFeatured: false,
    images: [
      { src: `${B}/olx-ar3a/600/800`, alt: "Structured Bustier – front" },
      { src: `${B}/olx-ar3b/600/800`, alt: "Structured Bustier – detail" },
    ],
    description: "A structured bustier with boned side panels in Italian silk faille. The strapless neckline is clean and architectural — supported but not severe. Concealed back zip, fully lined.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: false },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Black",    value: "black",    available: true },
      { label: "Ivory",    value: "ivory",    available: true },
    ],
    material: "100% Silk Faille, Fully Lined",
    careInstructions: "Dry clean only",
    tags: ["armless", "bustier", "strapless", "sale", "evening"],
  },
  {
    id: "ar-004", slug: "cashmere-sleeveless-vest",
    title: "Cashmere Sleeveless Vest", brand: "Crespi Milano",
    category: "armless", subcategory: "Armless",
    price: 590, isNew: true, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-ar4a/600/800`, alt: "Cashmere Sleeveless Vest – front" },
      { src: `${B}/olx-ar4b/600/800`, alt: "Cashmere Sleeveless Vest – back" },
    ],
    description: "A relaxed-fit sleeveless vest in Grade-A Mongolian cashmere. Minimal seaming, a crew neck, and a slightly curved hem. The kind of piece that looks expensive even before you touch it.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: false },
    ],
    colors: [
      { label: "Camel",    value: "camel",    available: true },
      { label: "Black",    value: "black",    available: true },
      { label: "Oatmeal",  value: "oatmeal",  available: true },
    ],
    material: "100% Grade-A Mongolian Cashmere",
    careInstructions: "Hand wash cold or dry clean",
    tags: ["armless", "cashmere", "vest", "new-arrival", "luxury"],
  },
  {
    id: "ar-005", slug: "linen-square-neck-top",
    title: "Linen Square-Neck Top", brand: "Helios Collective",
    category: "armless", subcategory: "Armless",
    price: 265, isNew: false, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-ar5a/600/800`, alt: "Linen Square-Neck – front" },
    ],
    description: "Stone-washed Belgian linen in a sleeveless, square-neck cut. The fabric texture is tactile without being rough. A clean, minimal garment that anchors an outfit with understated confidence.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Natural",  value: "natural",  available: true },
      { label: "Black",    value: "black",    available: true },
      { label: "White",    value: "white",    available: true },
    ],
    material: "100% Belgian Linen",
    careInstructions: "Machine wash cold, hang dry",
    tags: ["armless", "linen", "square-neck", "minimal"],
  },
  {
    id: "ar-006", slug: "modal-racerback-top",
    title: "Modal Racerback Top", brand: "Nero & Co.",
    category: "armless", subcategory: "Armless",
    price: 185, isNew: false, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-ar6a/600/800`, alt: "Modal Racerback – front" },
      { src: `${B}/olx-ar6b/600/800`, alt: "Modal Racerback – back" },
    ],
    description: "TENCEL Modal in a racerback silhouette. Exceptionally soft against the skin, with a natural moisture-wicking quality. A simple shape executed with complete conviction.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: false },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Black",    value: "black",    available: true },
      { label: "White",    value: "white",    available: true },
      { label: "Slate",    value: "slate",    available: true },
    ],
    material: "100% TENCEL Modal",
    careInstructions: "Machine wash cold, hang dry",
    tags: ["armless", "modal", "racerback", "essential"],
  },

  // ── TANK TOPS ─────────────────────────────────────────────────────────────
  {
    id: "tt-001", slug: "supima-fitted-tank",
    title: "Supima Fitted Tank", brand: "Maison Altair",
    category: "tank-tops", subcategory: "Tank Tops",
    price: 145, isNew: true, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-tt1a/600/800`, alt: "Supima Fitted Tank – front" },
      { src: `${B}/olx-tt1b/600/800`, alt: "Supima Fitted Tank – back" },
    ],
    description: "Our foundational tank in 200gsm Supima cotton — medium weight, opaque, and precisely cut. A fitted silhouette with a narrow rib neckline and armhole trim. The tank every wardrobe needs to exist.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "White",    value: "white",    available: true },
      { label: "Black",    value: "black",    available: true },
      { label: "Stone",    value: "stone",    available: true },
      { label: "Cream",    value: "cream",    available: true },
    ],
    material: "100% Supima Cotton 200gsm",
    careInstructions: "Machine wash cold, tumble dry low",
    tags: ["tank-top", "supima", "fitted", "new-arrival", "essential"],
  },
  {
    id: "tt-002", slug: "silk-charmeuse-tank",
    title: "Silk Charmeuse Tank", brand: "Studio Voss",
    category: "tank-tops", subcategory: "Tank Tops",
    price: 385, compareAtPrice: 480,
    isNew: false, isSale: true, isFeatured: false,
    images: [
      { src: `${B}/olx-tt2a/600/800`, alt: "Silk Charmeuse Tank – front" },
    ],
    description: "Pure Charmeuse silk in a relaxed tank silhouette. Wide shoulder straps for stability, a fluid drape that skims the body without clinging. As refined as a tank top can be.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: false },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Champagne", value: "champagne", available: true },
      { label: "Black",     value: "black",     available: true },
      { label: "Ivory",     value: "ivory",     available: true },
    ],
    material: "100% Charmeuse Silk",
    careInstructions: "Dry clean only",
    tags: ["tank-top", "silk", "charmeuse", "sale"],
  },
  {
    id: "tt-003", slug: "ribbed-merino-tank",
    title: "Ribbed Merino Tank", brand: "Crespi Milano",
    category: "tank-tops", subcategory: "Tank Tops",
    price: 275, isNew: false, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-tt3a/600/800`, alt: "Ribbed Merino Tank – front" },
      { src: `${B}/olx-tt3b/600/800`, alt: "Ribbed Merino Tank – detail" },
    ],
    description: "Fine-rib superfine merino in a close-fitting tank. The natural temperature-regulation of the fibre makes this a year-round essential. Understated branding, clean hems, no excess.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: false },
    ],
    colors: [
      { label: "Black",    value: "black",    available: true },
      { label: "Cream",    value: "cream",    available: true },
      { label: "Navy",     value: "navy",     available: true },
      { label: "Charcoal", value: "charcoal", available: true },
    ],
    material: "100% Superfine Merino Wool",
    careInstructions: "Hand wash cold or dry clean",
    tags: ["tank-top", "merino", "ribbed", "year-round"],
  },
  {
    id: "tt-004", slug: "linen-drape-tank",
    title: "Linen Drape Tank", brand: "Helios Collective",
    category: "tank-tops", subcategory: "Tank Tops",
    price: 195, isNew: true, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-tt4a/600/800`, alt: "Linen Drape Tank – front" },
    ],
    description: "Enzyme-washed Italian linen in a relaxed, slightly draping tank. A wide scoop neck and generous armhole. The linen ages beautifully — acquiring softness and character over seasons of wear.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Natural",  value: "natural",  available: true },
      { label: "White",    value: "white",    available: true },
      { label: "Black",    value: "black",    available: true },
    ],
    material: "100% Italian Linen",
    careInstructions: "Machine wash cold, line dry",
    tags: ["tank-top", "linen", "drape", "new-arrival"],
  },
  {
    id: "tt-005", slug: "modal-longline-tank",
    title: "Modal Longline Tank", brand: "Nero & Co.",
    category: "tank-tops", subcategory: "Tank Tops",
    price: 165, isNew: false, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-tt5a/600/800`, alt: "Modal Longline Tank – front" },
    ],
    description: "TENCEL Modal in a longline, slightly loose tank. The fabric falls with an exceptional softness and has a subtle matte sheen. A versatile layering piece or standalone wardrobe essential.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: false },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "Black",    value: "black",    available: true },
      { label: "White",    value: "white",    available: true },
      { label: "Slate",    value: "slate",    available: true },
    ],
    material: "100% TENCEL Modal",
    careInstructions: "Machine wash cold, hang dry",
    tags: ["tank-top", "modal", "longline", "layering"],
  },
  {
    id: "tt-006", slug: "cashmere-knit-tank",
    title: "Cashmere Knit Tank", brand: "Valmont Atelier",
    category: "tank-tops", subcategory: "Tank Tops",
    price: 680, isNew: true, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-tt6a/600/800`, alt: "Cashmere Knit Tank – front" },
      { src: `${B}/olx-tt6b/600/800`, alt: "Cashmere Knit Tank – detail" },
    ],
    description: "A Grade-A cashmere tank knitted in a fine-gauge, smooth stitch. The silhouette is relaxed but structured — wide shoulders, a clean V-neck, and a slightly longer body. Unmistakably luxurious in the hand.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S",  value: "s",  available: true },
      { label: "M",  value: "m",  available: true },
      { label: "L",  value: "l",  available: true },
      { label: "XL", value: "xl", available: false },
    ],
    colors: [
      { label: "Ivory",    value: "ivory",    available: true },
      { label: "Black",    value: "black",    available: true },
      { label: "Camel",    value: "camel",    available: true },
    ],
    material: "100% Grade-A Cashmere",
    careInstructions: "Hand wash cold or dry clean",
    tags: ["tank-top", "cashmere", "knit", "new-arrival", "luxury"],
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
