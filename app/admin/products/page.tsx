"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { formatMoney } from "@/lib/utils/format";
import { ApiError } from "@/lib/api/client";

export const dynamic = "force-dynamic";

const CATEGORY_FILTERS = ["All", "T-Shirts", "Pants", "Armless", "Tank Tops", "On Sale", "New"];
const categorySlugMap: Record<string, string> = {
  "T-Shirts": "tshirts", Pants: "pants", Armless: "armless", "Tank Tops": "tank-tops",
};
const categoryDisplayMap: Record<string, string> = {
  tshirts: "T-Shirts", pants: "Pants", armless: "Armless", "tank-tops": "Tank Tops",
};

interface Product {
  _id: string; slug: string; title: string; brand: string; category: string;
  subcategory: string;
  price: number; compareAtPrice?: number; stock: number;
  isNew: boolean; isSale: boolean; isFeatured: boolean;
  images: { src: string; alt: string }[];
  description: string; sizes: { label: string; value: string; available: boolean }[];
  colors: { label: string; value: string; available: boolean }[];
  material: string; careInstructions: string; tags: string[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (activeFilter !== "All" && categorySlugMap[activeFilter]) {
        params.set("category", categorySlugMap[activeFilter]);
      }
      if (activeFilter === "On Sale") params.set("sale", "true");
      if (activeFilter === "New") params.set("newArrivals", "true");
      if (search) params.set("search", search);
      const res = await fetch(`/api/products?${params}`);
      const json = await res.json();
      setProducts(json.data?.products ?? []);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [activeFilter, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  async function handleDelete(slug: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/products/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new ApiError(res.status, "Delete failed");
      setProducts((p) => p.filter((x) => x.slug !== slug));
    } catch {
      alert("Failed to delete product");
    } finally {
      setDeleting(null);
    }
  }

  const displayProducts = products;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="mt-1 text-sm text-zinc-500">{displayProducts.length} products in catalogue</p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowModal(true); }}
          className="bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
        >
          + Add Product
        </button>
      </div>

      {error && <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-black/15 px-3 py-2 text-sm outline-none focus:border-black w-52"
        />
        {CATEGORY_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={[
              "border px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-colors",
              f === activeFilter
                ? "border-black bg-black text-white"
                : "border-black/15 hover:border-black",
            ].join(" ")}
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
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-zinc-400">Loading…</td></tr>
              ) : displayProducts.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-zinc-400">No products found</td></tr>
              ) : displayProducts.map((product) => (
                <tr key={product._id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-9 shrink-0 overflow-hidden bg-zinc-50">
                        {product.images[0] && (
                          <Image src={product.images[0].src} alt={product.title} fill className="object-cover" sizes="36px" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-xs text-zinc-400">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-zinc-600">{categoryDisplayMap[product.category] ?? product.category}</td>
                  <td className="px-5 py-3">
                    <span className="font-semibold">{formatMoney(product.price)}</span>
                    {product.compareAtPrice && (
                      <span className="ml-2 text-xs text-zinc-400 line-through">{formatMoney(product.compareAtPrice)}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold ${product.stock > 0 ? "text-green-600" : "text-zinc-400"}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1">
                      {product.isNew && <span className="bg-black px-2 py-0.5 text-[9px] font-bold uppercase text-white">New</span>}
                      {product.isSale && <span className="border border-black/20 px-2 py-0.5 text-[9px] font-bold uppercase text-zinc-600">Sale</span>}
                      {product.isFeatured && <span className="border border-black/20 px-2 py-0.5 text-[9px] font-bold uppercase text-zinc-400">Featured</span>}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => { setEditing(product); setShowModal(true); }}
                        className="text-xs text-zinc-400 underline underline-offset-2 hover:text-black"
                      >Edit</button>
                      <button
                        onClick={() => handleDelete(product.slug)}
                        disabled={deleting === product.slug}
                        className="text-xs text-red-400 underline underline-offset-2 hover:text-red-600 disabled:opacity-50"
                      >{deleting === product.slug ? "…" : "Delete"}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <ProductModal
          product={editing}
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); fetchProducts(); }}
        />
      )}
    </div>
  );
}

function ProductModal({
  product, onClose, onSaved,
}: {
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!product;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImages, setUploadingImages] = useState(false);

  const [form, setForm] = useState({
    slug: product?.slug ?? "",
    title: product?.title ?? "",
    brand: product?.brand ?? "",
    category: product?.category ?? "tshirts",
    subcategory: product?.subcategory ?? "",
    price: String(product?.price ?? ""),
    compareAtPrice: String(product?.compareAtPrice ?? ""),
    stock: String(product?.stock ?? "100"),
    isNew: product?.isNew ?? false,
    isSale: product?.isSale ?? false,
    isFeatured: product?.isFeatured ?? false,
    description: product?.description ?? "",
    material: product?.material ?? "",
    careInstructions: product?.careInstructions ?? "",
    tags: product?.tags?.join(", ") ?? "",
    images: product?.images ?? [] as { src: string; alt: string; cloudinaryPublicId?: string }[],
    sizes: product?.sizes ?? [
      { label: "XS", value: "xs", available: true },
      { label: "S", value: "s", available: true },
      { label: "M", value: "m", available: true },
      { label: "L", value: "l", available: true },
      { label: "XL", value: "xl", available: true },
    ],
    colors: product?.colors ?? [] as { label: string; value: string; available: boolean }[],
  });

  async function uploadImages(files: FileList) {
    setUploadingImages(true);
    const uploaded: { src: string; alt: string; cloudinaryPublicId?: string }[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "products");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const json = await res.json();
        uploaded.push({ src: json.data.url, alt: form.title || file.name, cloudinaryPublicId: json.data.publicId });
      }
    }
    setForm((f) => ({ ...f, images: [...f.images, ...uploaded] }));
    setUploadingImages(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        slug: form.slug,
        title: form.title,
        brand: form.brand,
        category: form.category,
        subcategory: form.subcategory || form.category,
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
        stock: Number(form.stock),
        isNew: form.isNew,
        isSale: form.isSale,
        isFeatured: form.isFeatured,
        description: form.description,
        material: form.material,
        careInstructions: form.careInstructions,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        images: form.images,
        sizes: form.sizes,
        colors: form.colors,
      };

      const url = isEdit ? `/api/products/${product!.slug}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Save failed");
      }
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 pt-10 pb-10">
      <div className="w-full max-w-2xl bg-white mx-4">
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest">{isEdit ? "Edit Product" : "Add Product"}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-black">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
          {error && <div className="border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">{error}</div>}

          <div className="grid grid-cols-2 gap-4">
            <F label="Title *" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required />
            <F label="Brand *" value={form.brand} onChange={(v) => setForm((f) => ({ ...f, brand: v }))} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <F label="Slug *" value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: v }))} required disabled={isEdit} />
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black"
              >
                {["tshirts", "pants", "armless", "tank-tops"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <F label="Price (£) *" type="number" value={form.price} onChange={(v) => setForm((f) => ({ ...f, price: v }))} required />
            <F label="Compare-at Price" type="number" value={form.compareAtPrice} onChange={(v) => setForm((f) => ({ ...f, compareAtPrice: v }))} />
            <F label="Stock *" type="number" value={form.stock} onChange={(v) => setForm((f) => ({ ...f, stock: v }))} required />
          </div>

          <div className="flex gap-6">
            {(["isNew", "isSale", "isFeatured"] as const).map((key) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))} className="accent-black" />
                {key === "isNew" ? "New" : key === "isSale" ? "On Sale" : "Featured"}
              </label>
            ))}
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              required
              className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <F label="Material *" value={form.material} onChange={(v) => setForm((f) => ({ ...f, material: v }))} required />
            <F label="Care Instructions *" value={form.careInstructions} onChange={(v) => setForm((f) => ({ ...f, careInstructions: v }))} required />
          </div>

          <F label="Tags (comma-separated)" value={form.tags} onChange={(v) => setForm((f) => ({ ...f, tags: v }))} />

          {/* Images */}
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Images {uploadingImages && <span className="text-zinc-400">(uploading…)</span>}
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.images.map((img, i) => (
                <div key={i} className="relative h-16 w-12 overflow-hidden bg-zinc-100">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="48px" />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                    className="absolute right-0 top-0 bg-black/70 text-white text-[10px] px-1"
                  >✕</button>
                </div>
              ))}
            </div>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={(e) => e.target.files && uploadImages(e.target.files)}
              className="text-sm text-zinc-500"
            />
          </div>

          {/* Sizes */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Sizes</p>
            <div className="flex flex-wrap gap-2">
              {form.sizes.map((s, i) => (
                <label key={s.value} className="flex items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={s.available}
                    onChange={(e) => {
                      const sizes = [...form.sizes];
                      sizes[i] = { ...sizes[i], available: e.target.checked };
                      setForm((f) => ({ ...f, sizes }));
                    }}
                    className="accent-black"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-black/10">
            <button type="button" onClick={onClose} className="border border-black/20 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:border-black transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImages}
              className="bg-black px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors disabled:opacity-60"
            >
              {loading ? "Saving…" : isEdit ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function F({ label, value, onChange, type = "text", required, disabled }: {
  label: string; value: string; onChange?: (v: string) => void; type?: string; required?: boolean; disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        required={required}
        disabled={disabled}
        className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black disabled:bg-zinc-50 disabled:text-zinc-400"
      />
    </div>
  );
}
