import PageScaffold from "@/components/system/PageScaffold";

type BrandPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;

  return (
    <PageScaffold
      title={`Brand: ${slug}`}
      description="Designer/brand landing scaffold."
    />
  );
}
