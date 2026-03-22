import PageScaffold from "@/components/system/PageScaffold";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return (
    <PageScaffold
      title={`Product: ${slug}`}
      description="Product detail template scaffold."
    />
  );
}
