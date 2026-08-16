import { pageMetadata } from "@/lib/config/seo";

export const metadata = pageMetadata({
  title: "Size Guide",
  description: "Find your perfect fit with the Outlxx size guide — UK, EU, and US measurements for women's and men's clothing.",
  path: "/size-guide",
});

const WOMEN_SIZES = [
  { size: "M",   uk: "10–12", eu: "38–40", us: "6–8", bust: "35–36", waist: "28–29", hips: "38–39" },
  { size: "L",   uk: "12–14", eu: "40–42", us: "8–10", bust: "36–39", waist: "29–31", hips: "39–42" },
  { size: "XL",  uk: "14–16", eu: "42–44", us: "10–12", bust: "39–41", waist: "31–34", hips: "42–44" },
  { size: "2XL", uk: "16–18", eu: "44–46", us: "12–14", bust: "41–44", waist: "34–37", hips: "44–47" },
  { size: "3XL", uk: "18–20", eu: "46–48", us: "14–16", bust: "44–47", waist: "37–40", hips: "47–50" },
];

const MEN_SIZES = [
  { size: "M",   uk: "38", eu: "48", us: "38", chest: "36–38", waist: "31–33", hips: "37–39" },
  { size: "L",   uk: "40", eu: "50", us: "40", chest: "38–39", waist: "33–35", hips: "39–40" },
  { size: "XL",  uk: "42", eu: "52", us: "42", chest: "39–41", waist: "35–36", hips: "40–42" },
  { size: "2XL", uk: "44", eu: "54", us: "44", chest: "41–43", waist: "36–38", hips: "42–43" },
  { size: "3XL", uk: "46", eu: "56", us: "46", chest: "43–45", waist: "38–40", hips: "43–45" },
];

const TSHIRT_SIZES = [
  { size: "M",   chest: "42", length: "27", shoulder: "18", sleeve: "8.5" },
  { size: "L",   chest: "44", length: "28", shoulder: "19", sleeve: "9" },
  { size: "XL",  chest: "46", length: "29", shoulder: "20", sleeve: "9.5" },
  { size: "2XL", chest: "48", length: "30", shoulder: "21", sleeve: "10" },
  { size: "3XL", chest: "50", length: "31", shoulder: "22", sleeve: "10.5" },
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-10">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          Find Your Fit
        </p>
        <h1 className="text-4xl font-semibold">Size Guide</h1>
        <p className="mt-3 text-sm text-zinc-500">
          All measurements are in inches unless stated. If you're between sizes, we recommend sizing up.
        </p>
      </div>

      {/* Women */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold">Women</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10">
                {["Size", "UK", "EU", "US", "Bust (in)", "Waist (in)", "Hips (in)"].map((h) => (
                  <th key={h} className="pb-3 pr-6 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {WOMEN_SIZES.map((row) => (
                <tr key={row.size}>
                  <td className="py-3 pr-6 font-semibold">{row.size}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.uk}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.eu}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.us}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.bust}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.waist}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Men */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold">Men</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10">
                {["Size", "UK", "EU", "US", "Chest (in)", "Waist (in)", "Hips (in)"].map((h) => (
                  <th key={h} className="pb-3 pr-6 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MEN_SIZES.map((row) => (
                <tr key={row.size}>
                  <td className="py-3 pr-6 font-semibold">{row.size}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.uk}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.eu}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.us}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.chest}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.waist}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* T-Shirts */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold">T-Shirts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10">
                {["Size", "Chest (in)", "Length (in)", "Shoulder (in)", "Sleeve (in)"].map((h) => (
                  <th key={h} className="pb-3 pr-6 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {TSHIRT_SIZES.map((row) => (
                <tr key={row.size}>
                  <td className="py-3 pr-6 font-semibold">{row.size}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.chest}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.length}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.shoulder}</td>
                  <td className="py-3 pr-6 text-zinc-600">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How to measure */}
      <section className="border border-black/10 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest">How to Measure</h2>
        <div className="grid gap-6 sm:grid-cols-3 text-sm text-zinc-600">
          <div>
            <p className="mb-1 font-semibold text-black">Chest / Bust</p>
            <p>Measure around the fullest part of your chest, keeping the tape level and parallel to the floor.</p>
          </div>
          <div>
            <p className="mb-1 font-semibold text-black">Waist</p>
            <p>Measure around your natural waistline, the narrowest part of your torso, above your belly button.</p>
          </div>
          <div>
            <p className="mb-1 font-semibold text-black">Hips</p>
            <p>Measure around the fullest part of your hips, approximately 8 inches below your natural waist.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
