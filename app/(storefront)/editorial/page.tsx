import Link from "next/link";
import Image from "next/image";
import { editorialArticles } from "@/lib/data";

export const metadata = { title: "Editorial" };

export default function EditorialPage() {
  const [hero, ...rest] = editorialArticles;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 border-b border-black/10 pb-6">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          The Journal
        </p>
        <h1 className="text-4xl font-semibold sm:text-5xl">Editorial</h1>
      </div>

      {/* Hero article */}
      <Link href={`/editorial/${hero.slug}`} className="group mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-video overflow-hidden bg-zinc-50">
          <Image
            src={hero.coverImage}
            alt={hero.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-red-600">
            {hero.category}
          </p>
          <h2 className="font-heading text-3xl font-semibold leading-tight group-hover:text-red-600 transition-colors">
            {hero.title}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">{hero.subtitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 line-clamp-3">{hero.excerpt}</p>
          <p className="mt-5 text-xs text-zinc-400">
            {hero.author} · {new Date(hero.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {hero.readTime} min read
          </p>
        </div>
      </Link>

      {/* Grid of remaining articles */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((article) => (
          <Link key={article.id} href={`/editorial/${article.slug}`} className="group">
            <div className="relative mb-4 aspect-video overflow-hidden bg-zinc-50">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-red-600">
              {article.category}
            </p>
            <h3 className="font-semibold group-hover:text-red-600 transition-colors">
              {article.title}
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              {article.author} · {article.readTime} min read
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
