type PageScaffoldProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
};

export default function PageScaffold({
  title,
  description,
  eyebrow,
  children,
}: PageScaffoldProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="border-b border-border pb-8">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="section-title text-4xl sm:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-xl text-sm font-light leading-6 text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {children ? <div className="pt-10">{children}</div> : null}
    </section>
  );
}
