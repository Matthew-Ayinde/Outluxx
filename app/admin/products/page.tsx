import Image from "next/image";
import { products } from "@/lib/data";
import { formatMoney } from "@/lib/utils/format";

export const metadata = { title: "Products" };

export default function AdminProductsPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="mt-1 text-sm text-zinc-500">{products.length} products in catalogue</p>
        </div>
        <button className="bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors">
          + Add Product
        </button>
      </div>

      {/* Filters row */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Search products…"
          className="border border-black/15 px-3 py-2 text-sm outline-none focus:border-black w-52"
        />
        {["All", "Women", "Men", "Accessories", "On Sale", "New"].map((f) => (
          <button
            key={f}
            className="border border-black/15 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider hover:border-black transition-colors first-of-type:border-black first-of-type:bg-black first-of-type:text-white"
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border border-black/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-zinc-50">
                {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {products.map((product) => {
                const available = product.sizes.some((s) => s.available);
                return (
                  <tr key={product.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-9 shrink-0 overflow-hidden bg-zinc-50">
                          <Image
                            src={product.images[0].src}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <p className="text-xs text-zinc-400">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-zinc-600 capitalize">{product.category}</td>
                    <td className="px-5 py-3">
                      <span className="font-semibold">{formatMoney(product.price)}</span>
                      {product.compareAtPrice && (
                        <span className="ml-2 text-xs text-zinc-400 line-through">
                          {formatMoney(product.compareAtPrice)}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold ${available ? "text-green-600" : "text-red-600"}`}>
                        {available ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {product.isNew && (
                          <span className="bg-black px-2 py-0.5 text-[9px] font-bold uppercase text-white">New</span>
                        )}
                        {product.isSale && (
                          <span className="bg-red-600 px-2 py-0.5 text-[9px] font-bold uppercase text-white">Sale</span>
                        )}
                        {product.isFeatured && (
                          <span className="border border-black/20 px-2 py-0.5 text-[9px] font-bold uppercase text-zinc-500">Featured</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-3">
                        <button className="text-xs text-zinc-400 underline underline-offset-2 hover:text-black">Edit</button>
                        <button className="text-xs text-red-500 underline underline-offset-2 hover:text-red-700">Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
