import Link from "next/link";
import Image from "next/image";
import { editorialArticles } from "@/lib/data";

export default function EditorialStrip() {
  const articles = editorialArticles.slice(0, 3);

  return (
    <section className="border-t border-black/10 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-black/10 pb-4">
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              The Edit
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">From Our Journal</h2>
          </div>
          <Link
            href="/editorial"
            className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-black hover:text-red-600 transition-colors"
          >
            All Articles →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/editorial/${article.slug}`}
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden bg-zinc-100">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-red-600">
                  {article.category}
                </p>
                <h3 className="text-base font-semibold leading-snug group-hover:text-red-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
                <p className="pt-1 text-[10px] font-medium uppercase tracking-widest text-zinc-400">
                  {article.readTime} min read
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
