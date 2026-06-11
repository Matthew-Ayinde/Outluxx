export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Legal</p>
        <h1 className="text-4xl font-semibold">Terms of Service</h1>
        <p className="mt-3 text-sm text-zinc-500">Last updated: 1 June 2026</p>
      </div>
      <div className="space-y-6 text-sm leading-relaxed text-zinc-700">
        {[
          ["1. Acceptance of Terms", "By accessing or using the Outluxx platform, you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not use our services."],
          ["2. Products and Pricing", "All prices are displayed in the currency of your region and include applicable taxes where required by law. Prices are subject to change without notice. We reserve the right to cancel or refuse any order at our discretion."],
          ["3. Intellectual Property", "All content on the Outluxx platform — including text, images, logos, and designs — is the property of Outluxx Ltd or its content partners. You may not reproduce, distribute, or modify any content without our express written permission."],
          ["4. User Accounts", "You are responsible for maintaining the security of your account credentials. Outluxx is not liable for any loss or damage arising from your failure to maintain the security of your account."],
          ["5. Privacy", "Your use of this platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference."],
          ["6. Limitation of Liability", "To the fullest extent permitted by law, Outluxx shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform."],
          ["7. Governing Law", "These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales."],
        ].map(([title, body]) => (
          <div key={title as string}>
            <h2 className="mb-2 font-semibold text-black">{title}</h2>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
