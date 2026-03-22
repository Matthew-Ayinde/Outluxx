type CartItemProps = {
  name: string;
  quantity: number;
};

export default function CartItem({ name, quantity }: CartItemProps) {
  return <div>{name} × {quantity}</div>;
}
