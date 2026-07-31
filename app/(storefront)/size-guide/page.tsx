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
    <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <div className="mb-10">
        <p className="eyebrow mb-3">
          Find Your Fit
        </p>
        <h1 className="section-title text-4xl sm:text-5xl">Size Guide</h1>
        <p className="mt-3 text-sm text-muted">
          All measurements are in centimetres unless stated. If you're between sizes, we recommend sizing up.
        </p>
      </div>

      {/* Women */}
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-lg font-light">Women</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Size", "UK", "EU", "US", "Bust (cm)", "Waist (cm)", "Hips (cm)"].map((h) => (
                  <th key={h} className="pb-3 pr-6 text-left text-[10px] font-medium uppercase tracking-[0.28em] text-faint">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {WOMEN_SIZES.map((row) => (
                <tr key={row.size}>
                  <td className="py-3 pr-6 font-medium">{row.size}</td>
                  <td className="py-3 pr-6 text-muted">{row.uk}</td>
                  <td className="py-3 pr-6 text-muted">{row.eu}</td>
                  <td className="py-3 pr-6 text-muted">{row.us}</td>
                  <td className="py-3 pr-6 text-muted">{row.bust}</td>
                  <td className="py-3 pr-6 text-muted">{row.waist}</td>
                  <td className="py-3 pr-6 text-muted">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Men */}
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-lg font-light">Men</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Size", "UK", "EU", "US", "Chest (cm)", "Waist (cm)", "Hips (cm)"].map((h) => (
                  <th key={h} className="pb-3 pr-6 text-left text-[10px] font-medium uppercase tracking-[0.28em] text-faint">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MEN_SIZES.map((row) => (
                <tr key={row.size}>
                  <td className="py-3 pr-6 font-medium">{row.size}</td>
                  <td className="py-3 pr-6 text-muted">{row.uk}</td>
                  <td className="py-3 pr-6 text-muted">{row.eu}</td>
                  <td className="py-3 pr-6 text-muted">{row.us}</td>
                  <td className="py-3 pr-6 text-muted">{row.chest}</td>
                  <td className="py-3 pr-6 text-muted">{row.waist}</td>
                  <td className="py-3 pr-6 text-muted">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How to measure */}
      <section className="border border-border p-6">
        <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-foreground">How to Measure</h2>
        <div className="grid gap-6 sm:grid-cols-3 text-sm text-muted">
          <div>
            <p className="mb-1 font-medium text-foreground">Chest / Bust</p>
            <p>Measure around the fullest part of your chest, keeping the tape level and parallel to the floor.</p>
          </div>
          <div>
            <p className="mb-1 font-medium text-foreground">Waist</p>
            <p>Measure around your natural waistline — the narrowest part of your torso, above your belly button.</p>
          </div>
          <div>
            <p className="mb-1 font-medium text-foreground">Hips</p>
            <p>Measure around the fullest part of your hips, approximately 20cm below your natural waist.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
