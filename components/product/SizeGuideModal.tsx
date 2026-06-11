"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

const sizeChart = [
  { size: "XS", uk: "6",  eu: "34", us: "2",  bust: "80-83", waist: "62-65", hips: "87-90" },
  { size: "S",  uk: "8",  eu: "36", us: "4",  bust: "84-87", waist: "66-69", hips: "91-94" },
  { size: "M",  uk: "10", eu: "38", us: "6",  bust: "88-91", waist: "70-73", hips: "95-98" },
  { size: "L",  uk: "12", eu: "40", us: "8",  bust: "92-95", waist: "74-77", hips: "99-102" },
  { size: "XL", uk: "14", eu: "42", us: "10", bust: "96-99", waist: "78-81", hips: "103-106" },
];

export default function SizeGuideModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-medium underline underline-offset-2 text-zinc-500 hover:text-black transition-colors"
      >
        Size Guide
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Size Guide" size="lg">
        <div className="space-y-4">
          <p className="text-xs text-zinc-500">
            All measurements are in centimetres. Model is 178cm and wears a size S.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-black/10">
                  {["Size", "UK", "EU", "US", "Bust", "Waist", "Hips"].map((h) => (
                    <th key={h} className="pb-3 text-left font-semibold uppercase tracking-widest text-black pr-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row) => (
                  <tr key={row.size} className="border-b border-black/5">
                    <td className="py-3 pr-4 font-semibold">{row.size}</td>
                    <td className="py-3 pr-4 text-zinc-600">{row.uk}</td>
                    <td className="py-3 pr-4 text-zinc-600">{row.eu}</td>
                    <td className="py-3 pr-4 text-zinc-600">{row.us}</td>
                    <td className="py-3 pr-4 text-zinc-600">{row.bust}</td>
                    <td className="py-3 pr-4 text-zinc-600">{row.waist}</td>
                    <td className="py-3 pr-4 text-zinc-600">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500">
            If you are between sizes, we recommend sizing up. For garments with detailed fit
            notes, please refer to the product description.
          </p>
        </div>
      </Modal>
    </>
  );
}
