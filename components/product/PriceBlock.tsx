type PriceBlockProps = {
  currentPrice: string;
  compareAtPrice?: string;
};

export default function PriceBlock({ currentPrice, compareAtPrice }: PriceBlockProps) {
  return (
    <p>
      {currentPrice}
      {compareAtPrice ? ` (was ${compareAtPrice})` : ""}
    </p>
  );
}
