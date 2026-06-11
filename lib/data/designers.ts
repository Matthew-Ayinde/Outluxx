import type { Designer } from "@/types/commerce";

const B = "https://picsum.photos/seed";

export const designers: Designer[] = [
  {
    id: "maison-altair", slug: "maison-altair", name: "Maison Altair",
    origin: "Paris, France", founded: 2009,
    description: "Maison Altair was founded with a single conviction: that luxury must be felt before it is seen. Working from a small atelier in the 8th arrondissement, the house produces fewer than 400 pieces each season — each one hand-cut and finished in-house.",
    image: `${B}/olx-d1/400/500`,
    productCount: 3,
  },
  {
    id: "studio-voss", slug: "studio-voss", name: "Studio Voss",
    origin: "Copenhagen, Denmark", founded: 2014,
    description: "Studio Voss is the embodiment of Nordic restraint. Founded by architect-turned-designer Astrid Voss, the label approaches each garment as a piece of architecture: engineered for the body, designed to outlast trends.",
    image: `${B}/olx-d2/400/500`,
    productCount: 2,
  },
  {
    id: "helios-collective", slug: "helios-collective", name: "Helios Collective",
    origin: "Milan, Italy", founded: 2011,
    description: "A collective of three designers working in dialogue, Helios is the rare fashion house where creative tension produces something greater than any individual voice. Their tailoring is precise; their fabrics, uncompromising.",
    image: `${B}/olx-d3/400/500`,
    productCount: 2,
  },
  {
    id: "nero-co", slug: "nero-co", name: "Nero & Co.",
    origin: "London, United Kingdom", founded: 2007,
    description: "Nero & Co. has spent nearly two decades perfecting the art of the understated. Known for exceptional knitwear and accessories, the label works exclusively with natural fibres sourced from traceable farms across Scotland and Mongolia.",
    image: `${B}/olx-d4/400/500`,
    productCount: 4,
  },
  {
    id: "valmont-atelier", slug: "valmont-atelier", name: "Valmont Atelier",
    origin: "Paris, France", founded: 2003,
    description: "Valmont Atelier has dressed the modern woman of consequence since its founding in 2003. The house is known for impeccable tailoring rooted in French couture tradition, reinterpreted for a woman who demands both beauty and practicality.",
    image: `${B}/olx-d5/400/500`,
    productCount: 3,
  },
  {
    id: "ligne-claire", slug: "ligne-claire", name: "Ligne Claire",
    origin: "Brussels, Belgium", founded: 2016,
    description: "Named after the Belgian comic art style characterized by clear, unambiguous lines, Ligne Claire applies the same philosophy to fashion. Every seam is deliberate; every silhouette, unmistakable.",
    image: `${B}/olx-d6/400/500`,
    productCount: 3,
  },
  {
    id: "opus-one", slug: "opus-one", name: "Opus One",
    origin: "New York, USA", founded: 2012,
    description: "Opus One is the creative project of Miriam Lee, who spent a decade in classical music before pivoting to fashion. The analogy is appropriate: her collections are composed, not assembled, with each piece finding its place in a larger whole.",
    image: `${B}/olx-d7/400/500`,
    productCount: 2,
  },
  {
    id: "silhouette-house", slug: "silhouette-house", name: "Silhouette House",
    origin: "Tokyo, Japan", founded: 2010,
    description: "Operating from an immaculate studio in Minami-Aoyama, Silhouette House blends the precision of Japanese construction with the grandeur of European tailoring tradition. The result is clothing of extraordinary authority.",
    image: `${B}/olx-d8/400/500`,
    productCount: 2,
  },
  {
    id: "atelier-milo", slug: "atelier-milo", name: "Atelier Milo",
    origin: "Naples, Italy", founded: 2001,
    description: "One of the oldest houses in the Outluxx portfolio, Atelier Milo has been perfecting the Neapolitan suit for over two decades. The family-run atelier on Via dei Mille remains the definitive source for handcrafted Italian tailoring.",
    image: `${B}/olx-d9/400/500`,
    productCount: 4,
  },
  {
    id: "forma-studio", slug: "forma-studio", name: "Forma Studio",
    origin: "Osaka, Japan", founded: 2018,
    description: "The newest house in the Outluxx stable, Forma Studio arrived fully formed. Designer Kenji Nakamura spent eight years at two of Japan's most respected menswear houses before launching his own label — and that experience shows in every stitch.",
    image: `${B}/olx-d10/400/500`,
    productCount: 2,
  },
  {
    id: "crespi-milano", slug: "crespi-milano", name: "Crespi Milano",
    origin: "Milan, Italy", founded: 1998,
    description: "Crespi Milano has been producing exceptional knitwear from their Milanese studio since 1998. Their relationship with a single family of cashmere farmers in Inner Mongolia spans three generations and produces some of the finest fibre available.",
    image: `${B}/olx-d11/400/500`,
    productCount: 3,
  },
  {
    id: "dorset-row", slug: "dorset-row", name: "Dorset Row",
    origin: "London, United Kingdom", founded: 2015,
    description: "Named after the street in Marylebone where its first studio was located, Dorset Row is the quintessential modern British brand: irreverent in spirit, uncompromising in craft. Known for outerwear that ages beautifully.",
    image: `${B}/olx-d12/400/500`,
    productCount: 2,
  },
];

export function getDesignerBySlug(slug: string): Designer | undefined {
  return designers.find((d) => d.slug === slug);
}
