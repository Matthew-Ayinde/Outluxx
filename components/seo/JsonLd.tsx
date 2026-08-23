// Renders a JSON-LD <script> tag. Server-only — never pass user-controlled
// HTML through `data`, since it's serialized straight into the page.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
