type ProductCardProps = {
  title: string;
  price: string;
};

export default function ProductCard({ title, price }: ProductCardProps) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{price}</p>
    </article>
  );
}
