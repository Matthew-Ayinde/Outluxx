import { NOINDEX } from "@/lib/config/seo";
import CartView from "./CartView";

export const metadata = { title: "Your Bag", ...NOINDEX };

export default function CartPage() {
  return <CartView />;
}
