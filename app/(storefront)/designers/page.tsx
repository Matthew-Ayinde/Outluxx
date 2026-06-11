import Link from "next/link";
import Image from "next/image";
import { designers } from "@/lib/data";

export const metadata = { title: "Designers" };

export default function DesignersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 border-b border-black/10 pb-6">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          Our Portfolio
        </p>
        <h1 className="text-4xl font-semibold sm:text-5xl">Designers</h1>
        <p className="mt-3 max-w-xl text-sm text-zinc-500">
          A curated selection of the world's most considered fashion houses — chosen for
          craft, vision, and an unwillingness to compromise.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {designers.map((d) => (
          <Link
            key={d.id}
            href={`/brands/${d.slug}`}
            className="group border border-black/10 hover:border-black transition-colors"
          >
            <div className="relative aspect-video overflow-hidden bg-zinc-50">
              <Image
                src={d.image}
                alt={d.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-5">
              <h2 className="text-base font-semibold group-hover:text-red-600 transition-colors">
                {d.name}
              </h2>
              <p className="mt-1 text-xs text-zinc-500">{d.origin} · Est. {d.founded}</p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-600 line-clamp-2">
                {d.description}
              </p>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-widest text-red-600">
                {d.productCount} pieces →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
