import type { EditorialArticle } from "@/types/commerce";

const B = "https://picsum.photos/seed";

export const editorialArticles: EditorialArticle[] = [
  {
    id: "ed-001",
    slug: "the-new-quiet-luxury",
    title: "The New Quiet Luxury",
    subtitle: "Why Less Is Becoming More",
    category: "Style",
    coverImage: `${B}/olx-ed1/1200/800`,
    author: "Isabelle Fontaine",
    publishedAt: "2026-05-28",
    readTime: 6,
    excerpt: "Across fashion houses from Paris to Tokyo, the loudest statement is now silence. We examine why a generation of dressers is choosing restraint over opulence — and why the clothes are better for it.",
  },
  {
    id: "ed-002",
    slug: "the-art-of-layering",
    title: "Autumn Dressing",
    subtitle: "A Master Class in Layering",
    category: "How to Wear",
    coverImage: `${B}/olx-ed2/1200/800`,
    author: "Marcus Webb",
    publishedAt: "2026-05-14",
    readTime: 8,
    excerpt: "The best outfits for autumn are never single garments — they are systems. Here, our style director breaks down the architecture of a perfect layered look.",
  },
  {
    id: "ed-003",
    slug: "the-well-tailored-suit",
    title: "The Art of the Well-Tailored Suit",
    subtitle: "A Guide to Fit, Cloth, and Construction",
    category: "Investment Dressing",
    coverImage: `${B}/olx-ed3/1200/800`,
    author: "James Arrowsmith",
    publishedAt: "2026-04-30",
    readTime: 10,
    excerpt: "In an era of fast fashion, the well-tailored suit remains the ultimate investment. We travel to Naples to understand what separates a great suit from a merely good one.",
  },
  {
    id: "ed-004",
    slug: "the-power-of-monochrome",
    title: "Monochrome Dressing",
    subtitle: "The Power of One Colour",
    category: "Style",
    coverImage: `${B}/olx-ed4/1200/800`,
    author: "Isabelle Fontaine",
    publishedAt: "2026-04-12",
    readTime: 5,
    excerpt: "Head-to-toe colour is the most misunderstood technique in dressing. When it works, it is transformative. When it doesn't, the reasons are almost always the same. We explain both.",
  },
  {
    id: "ed-005",
    slug: "investment-pieces",
    title: "Investment Pieces Worth Every Penny",
    subtitle: "Twelve Things to Buy and Keep Forever",
    category: "Shopping Guide",
    coverImage: `${B}/olx-ed5/1200/800`,
    author: "Sophie Marchand",
    publishedAt: "2026-03-28",
    readTime: 7,
    excerpt: "Real investment dressing isn't about spending more — it's about spending once. Our edit of twelve pieces that will serve you for a lifetime, with thoughts on what to look for and what to avoid.",
  },
  {
    id: "ed-006",
    slug: "the-statement-coat",
    title: "The Return of the Statement Coat",
    subtitle: "Fashion's Most Powerful Garment, Reconsidered",
    category: "Trend",
    coverImage: `${B}/olx-ed6/1200/800`,
    author: "Marcus Webb",
    publishedAt: "2026-03-10",
    readTime: 6,
    excerpt: "After years of the uniform overcoat, designers are returning to the coat as canvas. We look at why this season's outerwear is the most exciting in a decade — and how to wear it.",
  },
];

export function getArticleBySlug(slug: string): EditorialArticle | undefined {
  return editorialArticles.find((a) => a.slug === slug);
}
