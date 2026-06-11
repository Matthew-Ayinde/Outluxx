export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Legal</p>
        <h1 className="text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-3 text-sm text-zinc-500">Last updated: 1 June 2026</p>
      </div>
      <div className="space-y-6 text-sm leading-relaxed text-zinc-700">
        {[
          ["1. Data We Collect", "We collect information you provide directly (name, email, address, payment details) and information collected automatically (browsing data, device information) when you use our services."],
          ["2. How We Use Your Data", "We use your data to process orders, provide customer support, send transactional emails, and improve our platform. We do not sell your personal data to third parties."],
          ["3. Data Retention", "We retain your personal data for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time."],
          ["4. Cookies", "We use cookies to enhance your browsing experience, analyse platform usage, and deliver relevant content. You can manage your cookie preferences at any time in your browser settings or via our Cookie Policy."],
          ["5. Your Rights", "Under GDPR, you have the right to access, correct, delete, and port your personal data. To exercise these rights, contact us at privacy@outluxx.com."],
          ["6. Security", "We use industry-standard encryption and security measures to protect your data. However, no online transmission is completely secure, and we cannot guarantee absolute security."],
          ["7. Contact", "For privacy-related enquiries, contact our Data Protection Officer at privacy@outluxx.com or write to us at Outluxx Ltd, 14 Savile Row, London W1S 3JN."],
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
