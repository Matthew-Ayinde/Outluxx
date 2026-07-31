"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { formatMoney } from "@/lib/utils/format";
import { ApiError } from "@/lib/api/client";
import {
  Shirt,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Tag,
  Star,
  Loader2,
  PackageSearch,
  UploadCloud,
  Save,
} from "lucide-react";

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
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
            <Shirt size={18} strokeWidth={1.75} />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-light">Products</h1>
            <p className="mt-1 text-sm text-muted">{displayProducts.length} products in catalogue</p>
          </div>
        </div>
        <button
          onClick={() => { setEditing(null); setShowModal(true); }}
          className="flex items-center gap-1.5 rounded-lg bg-foreground px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-background hover:opacity-90 transition-colors"
        >
          <Plus size={14} strokeWidth={2} />
          Add Product
        </button>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10">
          <AlertCircle size={16} strokeWidth={1.75} />
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-52">
          <Search size={14} strokeWidth={1.75} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-hairline py-2 pl-9 pr-3 text-sm outline-none focus:border-foreground"
          />
        </div>
        {CATEGORY_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={[
              "rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-colors",
              f === activeFilter
                ? "border-violet-500 bg-violet-500/10 text-violet-700 dark:text-violet-400"
                : "border-hairline hover:border-foreground",
            ].join(" ")}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-medium uppercase tracking-[0.28em] text-faint">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-faint">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> Loading…
                  </div>
                </td></tr>
              ) : displayProducts.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-faint">
                  <div className="flex flex-col items-center gap-2">
                    <PackageSearch size={24} strokeWidth={1.5} className="text-faint" />
                    No products found
                  </div>
                </td></tr>
              ) : displayProducts.map((product) => (
                <tr key={product._id} className="hover:bg-surface transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded-md bg-surface">
                        {product.images[0] && (
                          <Image src={product.images[0].src} alt={product.title} fill className="object-cover" sizes="36px" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-xs text-faint">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted">{categoryDisplayMap[product.category] ?? product.category}</td>
                  <td className="px-5 py-3">
                    <span className="font-medium">{formatMoney(product.price)}</span>
                    {product.compareAtPrice && (
                      <span className="ml-2 text-xs text-faint line-through">{formatMoney(product.compareAtPrice)}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                      product.stock > 0
                        ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                        : "bg-red-500/10 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                    }`}>
                      {product.stock > 0 ? <CheckCircle2 size={11} strokeWidth={2} /> : <AlertCircle size={11} strokeWidth={2} />}
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1">
                      {product.isNew && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                          <Sparkles size={9} /> New
                        </span>
                      )}
                      {product.isSale && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[9px] font-bold uppercase text-rose-700 dark:bg-rose-500/15 dark:text-rose-400">
                          <Tag size={9} /> Sale
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                          <Star size={9} /> Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => { setEditing(product); setShowModal(true); }}
                        className="flex items-center gap-1 text-xs text-faint hover:text-violet-600 dark:hover:text-violet-400"
                      ><Pencil size={13} strokeWidth={1.75} /> Edit</button>
                      <button
                        onClick={() => handleDelete(product.slug)}
                        disabled={deleting === product.slug}
                        className="flex items-center gap-1 text-xs text-faint hover:text-red-600 disabled:opacity-50"
                      >{deleting === product.slug ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} strokeWidth={1.75} />} Delete</button>
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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 pt-10 pb-10">
      <div className="w-full max-w-2xl rounded-xl bg-background mx-4">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground">
            <Shirt size={14} strokeWidth={1.75} className="text-violet-500" />
            {isEdit ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} className="text-faint hover:text-foreground"><X size={16} strokeWidth={1.75} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10">
              <AlertCircle size={14} strokeWidth={1.75} /> {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <F label="Title *" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required />
            <F label="Brand *" value={form.brand} onChange={(v) => setForm((f) => ({ ...f, brand: v }))} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <F label="Slug *" value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: v }))} required disabled={isEdit} />
            <div>
              <label className="mb-1 block text-[9px] font-medium uppercase tracking-[0.22em] text-muted">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm outline-none focus:border-foreground"
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
                <input type="checkbox" checked={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))} className="accent-violet-600" />
                {key === "isNew" ? "New" : key === "isSale" ? "On Sale" : "Featured"}
              </label>
            ))}
          </div>

          <div>
            <label className="mb-1 block text-[9px] font-medium uppercase tracking-[0.22em] text-muted">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              required
              className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm outline-none focus:border-foreground resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <F label="Material *" value={form.material} onChange={(v) => setForm((f) => ({ ...f, material: v }))} required />
            <F label="Care Instructions *" value={form.careInstructions} onChange={(v) => setForm((f) => ({ ...f, careInstructions: v }))} required />
          </div>

          <F label="Tags (comma-separated)" value={form.tags} onChange={(v) => setForm((f) => ({ ...f, tags: v }))} />

          {/* Images */}
          <div>
            <label className="mb-2 block text-[9px] font-medium uppercase tracking-[0.22em] text-muted">
              Images {uploadingImages && <span className="text-faint">(uploading…)</span>}
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.images.map((img, i) => (
                <div key={i} className="relative h-16 w-12 overflow-hidden rounded-md bg-surface">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="48px" />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                    className="absolute right-0 top-0 bg-foreground/70 text-background p-0.5"
                  ><X size={10} strokeWidth={2} /></button>
                </div>
              ))}
            </div>
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-hairline px-4 py-3 text-xs text-muted hover:border-foreground transition-colors">
              <UploadCloud size={16} strokeWidth={1.75} />
              Upload images or video
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={(e) => e.target.files && uploadImages(e.target.files)}
                className="hidden"
              />
            </label>
          </div>

          {/* Sizes */}
          <div>
            <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.22em] text-muted">Sizes</p>
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
                    className="accent-violet-600"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <button type="button" onClick={onClose} className="rounded-lg border border-hairline px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-foreground hover:border-foreground transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImages}
              className="flex items-center gap-1.5 rounded-lg bg-foreground px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-background hover:opacity-90 transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} strokeWidth={1.75} />}
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
      <label className="mb-1 block text-[9px] font-medium uppercase tracking-[0.22em] text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        required={required}
        disabled={disabled}
        className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm outline-none focus:border-foreground disabled:bg-surface disabled:text-faint"
      />
    </div>
  );
}
