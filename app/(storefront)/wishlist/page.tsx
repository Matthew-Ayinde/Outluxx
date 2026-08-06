import { NOINDEX } from "@/lib/config/seo";
import WishlistView from "./WishlistView";

export const metadata = { title: "Wishlist", ...NOINDEX };

export default function WishlistPage() {
  return <WishlistView />;
}
