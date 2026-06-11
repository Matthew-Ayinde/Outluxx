import Image from "next/image";
import { editorialArticles } from "@/lib/data";

export const metadata = { title: "Editorial Content" };

export default function AdminContentPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Editorial Content</h1>
          <p className="mt-1 text-sm text-zinc-500">{editorialArticles.length} articles published</p>
        </div>
        <button className="bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors">
          + New Article
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {editorialArticles.map((article) => (
          <div key={article.id} className="border border-black/10 bg-white">
            <div className="relative aspect-video overflow-hidden bg-zinc-50">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-black/30" />
              <span className="absolute left-3 top-3 bg-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
                {article.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold leading-tight">{article.title}</h3>
              <p className="mt-1 text-xs text-zinc-400">{article.author} · {article.readTime} min read</p>
              <p className="mt-1 text-xs text-zinc-500">
                {new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <div className="mt-3 flex gap-3">
                <button className="text-xs text-zinc-400 underline underline-offset-2 hover:text-black">Edit</button>
                <button className="text-xs text-zinc-400 underline underline-offset-2 hover:text-black">Preview</button>
                <button className="text-xs text-red-500 underline underline-offset-2 hover:text-red-700">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
