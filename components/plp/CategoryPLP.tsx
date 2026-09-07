import type { Metadata } from "next";
import PLPTemplate from "@/components/plp/PLPTemplate";
import JsonLd from "@/components/seo/JsonLd";
import { getProductsByCategory, getSiteMedia } from "@/lib/data/server";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/config/seo";
import { getCategory } from "@/lib/config/categories";
import type { ProductCategory } from "@/types/commerce";

/**
 * Every category listing page is the same page with a different slug, so the
 * route files under app/(storefront)/<slug>/ are thin wrappers around this and
 * the copy/media/SEO all come from lib/config/categories.ts.
 */

export function categoryMetadata(category: ProductCategory): Metadata {
  const def = getCategory(category);
  return pageMetadata({
    title: def.label,
    description: def.description,
    path: def.path,
  });
}

export default async function CategoryPLP({ category }: { category: ProductCategory }) {
  const def = getCategory(category);
  const [products, media] = await Promise.all([getProductsByCategory(category), getSiteMedia()]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: def.label, path: def.path },
        ])}
      />
      <PLPTemplate
        title={def.label}
        subtitle={def.subtitle}
        heroImage={media[def.heroSlot].url}
        products={products}
      />
    </>
  );
}
