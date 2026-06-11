export type ProductCategory = "women" | "men" | "accessories";

export type ProductVariant = {
  label: string;
  value: string;
  available: boolean;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  isNew: boolean;
  isSale: boolean;
  isFeatured: boolean;
  images: ProductImage[];
  description: string;
  sizes: ProductVariant[];
  colors: ProductVariant[];
  material: string;
  careInstructions: string;
  tags: string[];
  designerId: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type OrderItem = {
  productId: string;
  productTitle: string;
  productBrand: string;
  productImage: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  price: number;
};

export type Address = {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  placedAt: string;
  updatedAt: string;
};

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  orderCount: number;
  totalSpent: number;
  joinedAt: string;
  addresses: Address[];
};

export type Designer = {
  id: string;
  slug: string;
  name: string;
  origin: string;
  description: string;
  image: string;
  productCount: number;
  founded: number;
};

export type EditorialArticle = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readTime: number;
  excerpt: string;
};
