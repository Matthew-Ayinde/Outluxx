"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

const sizeChart = [
  { size: "M",   uk: "10", eu: "38", us: "6",  bust: "35-36", waist: "28-29", hips: "37-39" },
  { size: "L",   uk: "12", eu: "40", us: "8",  bust: "36-37", waist: "29-30", hips: "39-40" },
  { size: "XL",  uk: "14", eu: "42", us: "10", bust: "38-39", waist: "31-32", hips: "41-42" },
  { size: "2XL", uk: "16", eu: "44", us: "12", bust: "40-41", waist: "32-34", hips: "43-44" },
  { size: "3XL", uk: "18", eu: "46", us: "14", bust: "42-44", waist: "34-36", hips: "45-46" },
];

const tshirtChart = [
  { size: "M",   chest: "42", length: "27", shoulder: "18", sleeve: "8.5" },
  { size: "L",   chest: "44", length: "28", shoulder: "19", sleeve: "9" },
  { size: "XL",  chest: "46", length: "29", shoulder: "20", sleeve: "9.5" },
  { size: "2XL", chest: "48", length: "30", shoulder: "21", sleeve: "10" },
  { size: "3XL", chest: "50", length: "31", shoulder: "22", sleeve: "10.5" },
];

export default function SizeGuideModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-medium underline underline-offset-2 text-muted hover:text-foreground transition-colors"
      >
        Size Guide
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Size Guide" size="lg">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-xs text-zinc-500">
              All measurements are in inches. Model is 5&apos;10&quot; (70in) and wears a size M.
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
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-black">T-Shirt Measurement Guide</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-black/10">
                    {["Size", "Chest", "Length", "Shoulder", "Sleeve"].map((h) => (
                      <th key={h} className="pb-3 text-left font-semibold uppercase tracking-widest text-black pr-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tshirtChart.map((row) => (
                    <tr key={row.size} className="border-b border-black/5">
                      <td className="py-3 pr-4 font-semibold">{row.size}</td>
                      <td className="py-3 pr-4 text-zinc-600">{row.chest}&quot;</td>
                      <td className="py-3 pr-4 text-zinc-600">{row.length}&quot;</td>
                      <td className="py-3 pr-4 text-zinc-600">{row.shoulder}&quot;</td>
                      <td className="py-3 pr-4 text-zinc-600">{row.sleeve}&quot;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
