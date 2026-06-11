import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getDesignerBySlug, products } from "@/lib/data";
import ProductGrid from "@/components/product/ProductGrid";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const designer = getDesignerBySlug(slug);
  if (!designer) return {};
  return { title: `${designer.name}` };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const designer = getDesignerBySlug(slug);
  if (!designer) notFound();

  const brandProducts = products.filter((p) => p.designerId === designer.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            {designer.origin} · Est. {designer.founded}
          </p>
          <h1 className="font-heading text-4xl font-semibold sm:text-5xl">{designer.name}</h1>
          <p className="mt-5 leading-relaxed text-zinc-600">{designer.description}</p>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            {designer.productCount} piece{designer.productCount !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="relative aspect-video overflow-hidden bg-zinc-50">
          <Image
            src={designer.image}
            alt={designer.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="mb-6 border-t border-black/10 pt-8 text-xl font-semibold">
          Collection
        </h2>
        {brandProducts.length > 0 ? (
          <ProductGrid products={brandProducts} columns={4} />
        ) : (
          <p className="py-10 text-sm text-zinc-500">No products available for this designer.</p>
        )}
      </div>
    </div>
  );
}
