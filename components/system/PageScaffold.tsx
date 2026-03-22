type PageScaffoldProps = {
  title: string;
  description?: string;
};

export default function PageScaffold({
  title,
  description,
}: PageScaffoldProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {description ? (
        <p className="mt-3 text-sm text-neutral-600">{description}</p>
      ) : null}
    </section>
  );
}