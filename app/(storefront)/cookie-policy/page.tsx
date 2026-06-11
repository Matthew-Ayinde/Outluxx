export const metadata = { title: "Cookie Policy" };

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Legal</p>
        <h1 className="text-4xl font-semibold">Cookie Policy</h1>
        <p className="mt-3 text-sm text-zinc-500">Last updated: 1 June 2026</p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-zinc-700">
        <p>We use cookies to improve your experience on Outluxx. This policy explains what cookies are, what we use them for, and how you can control them.</p>

        <div>
          <h2 className="mb-3 font-semibold text-black">What are cookies?</h2>
          <p>Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work more efficiently and to provide information to site owners.</p>
        </div>

        <div>
          <h2 className="mb-4 font-semibold text-black">Types of Cookies We Use</h2>
          <div className="space-y-4">
            {[
              { type: "Essential", desc: "Required for the website to function. These include session cookies and security cookies. These cannot be disabled." },
              { type: "Performance", desc: "Help us understand how visitors use our site by collecting anonymous information. We use this to improve the platform." },
              { type: "Functional", desc: "Allow the website to remember choices you make (such as your preferred currency) and provide enhanced, personalised features." },
              { type: "Marketing", desc: "Used to track visitors across websites so we can display relevant ads. You can opt out of these at any time." },
            ].map((c) => (
              <div key={c.type} className="border-l-2 border-black/10 pl-4">
                <p className="mb-1 font-semibold text-black">{c.type}</p>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-black">Managing Cookies</h2>
          <p>Most browsers allow you to control cookies through their settings. You can also use our cookie preference centre (accessible via the footer) to manage your preferences at any time.</p>
        </div>
      </div>
    </div>
  );
}
