export const metadata = { title: "Size Guide" };

const WOMEN_SIZES = [
  { size: "XS", uk: "6–8", eu: "34–36", us: "2–4", bust: "80–84", waist: "62–66", hips: "88–92" },
  { size: "S",  uk: "8–10", eu: "36–38", us: "4–6", bust: "84–88", waist: "66–70", hips: "92–96" },
  { size: "M",  uk: "10–12", eu: "38–40", us: "6–8", bust: "88–92", waist: "70–74", hips: "96–100" },
  { size: "L",  uk: "12–14", eu: "40–42", us: "8–10", bust: "92–98", waist: "74–80", hips: "100–106" },
  { size: "XL", uk: "14–16", eu: "42–44", us: "10–12", bust: "98–104", waist: "80–86", hips: "106–112" },
];

const MEN_SIZES = [
  { size: "S",   uk: "36", eu: "46", us: "36", chest: "88–92", waist: "76–80", hips: "90–94" },
  { size: "M",   uk: "38", eu: "48", us: "38", chest: "92–96", waist: "80–84", hips: "94–98" },
  { size: "L",   uk: "40", eu: "50", us: "40", chest: "96–100", waist: "84–88", hips: "98–102" },
  { size: "XL",  uk: "42", eu: "52", us: "42", chest: "100–104", waist: "88–92", hips: "102–106" },
  { size: "XXL", uk: "44", eu: "54", us: "44", chest: "104–108", waist: "92–96", hips: "106–110" },
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
          All measurements are in centimetres unless stated. If you're between sizes, we recommend sizing up.
        </p>
      </div>

      {/* Women */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold">Women</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10">
                {["Size", "UK", "EU", "US", "Bust (cm)", "Waist (cm)", "Hips (cm)"].map((h) => (
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
                {["Size", "UK", "EU", "US", "Chest (cm)", "Waist (cm)", "Hips (cm)"].map((h) => (
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
            <p>Measure around your natural waistline — the narrowest part of your torso, above your belly button.</p>
          </div>
          <div>
            <p className="mb-1 font-semibold text-black">Hips</p>
            <p>Measure around the fullest part of your hips, approximately 20cm below your natural waist.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
