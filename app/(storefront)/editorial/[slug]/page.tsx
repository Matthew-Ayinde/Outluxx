import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticleBySlug, editorialArticles } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = editorialArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Back */}
      <Link href="/editorial" className="mb-8 inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-black">
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
          <path d="M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        The Journal
      </Link>

      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-red-600">
        {article.category}
      </p>
      <h1 className="font-heading text-4xl font-semibold leading-tight sm:text-5xl">{article.title}</h1>
      <p className="mt-2 text-lg text-zinc-500">{article.subtitle}</p>

      <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400">
        <span>{article.author}</span>
        <span>·</span>
        <span>{new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
        <span>·</span>
        <span>{article.readTime} min read</span>
      </div>

      {/* Cover image */}
      <div className="relative my-8 aspect-video overflow-hidden bg-zinc-50">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {/* Article body (lorem placeholder) */}
      <div className="prose prose-sm max-w-none text-zinc-700">
        <p className="text-base leading-relaxed">{article.excerpt}</p>
        <p className="mt-5 leading-relaxed">
          Fashion has always existed in conversation with its time. The pieces that endure are those which resist the tyranny of the moment — garments that speak a language older than trend cycles and seasonal palettes. They are investments not merely in cloth and thread, but in a certain way of moving through the world.
        </p>
        <p className="mt-5 leading-relaxed">
          The houses represented in this edit understand this distinction intuitively. They are not chasing attention; they are building legacies. Each season, their collections arrive like chapters in an ongoing conversation about the nature of beauty, restraint, and craft. To wear their work is to participate in that conversation.
        </p>
        <p className="mt-5 leading-relaxed">
          What separates truly exceptional clothing from merely expensive clothing is rarely the material alone. It is the decisions made along the way: the choice to use full-canvas construction when fused interlining would suffice; the insistence on hand-finishing a seam that will never be seen; the months spent developing a fabric in partnership with a mill whose looms are a century old.
        </p>
        <p className="mt-5 leading-relaxed">
          These choices are invisible in the finished garment. But they are present in the way it wears — in the way it holds its shape at the end of a long day, in the way it falls differently than anything else in your wardrobe.
        </p>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16 border-t border-black/10 pt-10">
          <h2 className="mb-6 text-lg font-semibold">Continue Reading</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((a) => (
              <Link key={a.id} href={`/editorial/${a.slug}`} className="group">
                <div className="relative mb-3 aspect-video overflow-hidden bg-zinc-50">
                  <Image
                    src={a.coverImage}
                    alt={a.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="33vw"
                  />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-red-600">{a.category}</p>
                <h3 className="mt-1 text-sm font-semibold group-hover:text-red-600 transition-colors">{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
