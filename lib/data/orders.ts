import type { Order } from "@/types/commerce";

const B = "https://picsum.photos/seed";

export const orders: Order[] = [
  {
    id: "ord-001", orderNumber: "OLX-28741",
    customerId: "c-001", status: "delivered",
    items: [
      { productId: "w-001", productTitle: "Midnight Silk Slip Dress", productBrand: "Maison Altair",
        productImage: `${B}/olx-w1a/120/160`, quantity: 1, selectedSize: "S", selectedColor: "Midnight", price: 1250 },
    ],
    subtotal: 1250, shipping: 0, discount: 0, total: 1250,
    shippingAddress: {
      id: "addr-c1-1", label: "Home", isDefault: true,
      firstName: "Sarah", lastName: "Mitchell",
      line1: "24 Eaton Square", city: "London",
      state: "England", postalCode: "SW1W 9BB", country: "United Kingdom",
    },
    placedAt: "2026-05-01T10:24:00Z", updatedAt: "2026-05-08T14:00:00Z",
  },
  {
    id: "ord-002", orderNumber: "OLX-28802",
    customerId: "c-003", status: "shipped",
    items: [
      { productId: "w-005", productTitle: "Tailored Single-Breast Blazer", productBrand: "Valmont Atelier",
        productImage: `${B}/olx-w5a/120/160`, quantity: 1, selectedSize: "M", selectedColor: "Black", price: 1650 },
      { productId: "w-003", productTitle: "Wide-Leg Crêpe Trousers", productBrand: "Helios Collective",
        productImage: `${B}/olx-w3a/120/160`, quantity: 1, selectedSize: "M", selectedColor: "Navy", price: 680 },
    ],
    subtotal: 2330, shipping: 0, discount: 0, total: 2330,
    shippingAddress: {
      id: "addr-c3-1", label: "Home", isDefault: true,
      firstName: "Emma", lastName: "Thornton",
      line1: "7 Rue de Rivoli", city: "Paris",
      state: "Île-de-France", postalCode: "75001", country: "France",
    },
    placedAt: "2026-05-18T09:15:00Z", updatedAt: "2026-05-22T11:30:00Z",
  },
  {
    id: "ord-003", orderNumber: "OLX-28890",
    customerId: "c-005", status: "processing",
    items: [
      { productId: "a-001", productTitle: "Structured Leather Tote", productBrand: "Maison Altair",
        productImage: `${B}/olx-a1a/120/160`, quantity: 1, selectedSize: "One Size", selectedColor: "Black", price: 2100 },
      { productId: "a-004", productTitle: "Gold-Frame Sunglasses", productBrand: "Ligne Claire",
        productImage: `${B}/olx-a4a/120/160`, quantity: 1, selectedSize: "One Size", selectedColor: "Gold / Grey Lens", price: 420 },
    ],
    subtotal: 2520, shipping: 0, discount: 0, total: 2520,
    shippingAddress: {
      id: "addr-c5-1", label: "Home", isDefault: true,
      firstName: "Olivia", lastName: "Chen",
      line1: "88 Repulse Bay Road", city: "Hong Kong",
      state: "Repulse Bay", postalCode: "", country: "Hong Kong SAR",
    },
    placedAt: "2026-06-02T16:40:00Z", updatedAt: "2026-06-03T08:00:00Z",
  },
  {
    id: "ord-004", orderNumber: "OLX-28911",
    customerId: "c-002", status: "delivered",
    items: [
      { productId: "m-001", productTitle: "Italian Wool Two-Piece Suit", productBrand: "Atelier Milo",
        productImage: `${B}/olx-m1a/120/160`, quantity: 1, selectedSize: "48R", selectedColor: "Navy", price: 4200 },
    ],
    subtotal: 4200, shipping: 0, discount: 0, total: 4200,
    shippingAddress: {
      id: "addr-c2-1", label: "Home", isDefault: true,
      firstName: "James", lastName: "Crawford",
      line1: "840 Park Avenue", line2: "Apt 12B",
      city: "New York", state: "NY", postalCode: "10021", country: "United States",
    },
    placedAt: "2026-04-10T12:00:00Z", updatedAt: "2026-04-18T09:00:00Z",
  },
  {
    id: "ord-005", orderNumber: "OLX-29010",
    customerId: "c-010", status: "delivered",
    items: [
      { productId: "m-004", productTitle: "Leather-Trim Bomber Jacket", productBrand: "Dorset Row",
        productImage: `${B}/olx-m4a/120/160`, quantity: 1, selectedSize: "L", selectedColor: "Black", price: 1890 },
      { productId: "m-006", productTitle: "Cashmere Rollneck", productBrand: "Crespi Milano",
        productImage: `${B}/olx-m6a/120/160`, quantity: 1, selectedSize: "L", selectedColor: "Camel", price: 820 },
    ],
    subtotal: 2710, shipping: 0, discount: 0, total: 2710,
    shippingAddress: {
      id: "addr-c10-1", label: "Home", isDefault: true,
      firstName: "Henry", lastName: "Blackwood",
      line1: "12 Cheyne Walk", city: "London",
      state: "England", postalCode: "SW3 5RA", country: "United Kingdom",
    },
    placedAt: "2026-03-05T14:20:00Z", updatedAt: "2026-03-12T10:00:00Z",
  },
  {
    id: "ord-006", orderNumber: "OLX-29124",
    customerId: "c-009", status: "pending",
    items: [
      { productId: "w-002", productTitle: "Oversized Cashmere Coat", productBrand: "Studio Voss",
        productImage: `${B}/olx-w2a/120/160`, quantity: 1, selectedSize: "S", selectedColor: "Camel", price: 3400 },
    ],
    subtotal: 3400, shipping: 0, discount: 0, total: 3400,
    shippingAddress: {
      id: "addr-c9-1", label: "Home", isDefault: true,
      firstName: "Isabelle", lastName: "Rousseau",
      line1: "15 Avenue Montaigne", city: "Paris",
      state: "Île-de-France", postalCode: "75008", country: "France",
    },
    placedAt: "2026-06-10T18:55:00Z", updatedAt: "2026-06-10T18:55:00Z",
  },
  {
    id: "ord-007", orderNumber: "OLX-29188",
    customerId: "c-006", status: "cancelled",
    items: [
      { productId: "a-005", productTitle: "Suede Chelsea Boots", productBrand: "Atelier Milo",
        productImage: `${B}/olx-a5a/120/160`, quantity: 1, selectedSize: "42", selectedColor: "Tan", price: 1350 },
    ],
    subtotal: 1350, shipping: 0, discount: 0, total: 1350,
    shippingAddress: {
      id: "addr-c6-1", label: "Home", isDefault: true,
      firstName: "Luca", lastName: "Ferrara",
      line1: "Via Montenapoleone 12", city: "Milan",
      state: "Lombardy", postalCode: "20121", country: "Italy",
    },
    placedAt: "2026-05-25T11:00:00Z", updatedAt: "2026-05-26T09:00:00Z",
  },
  {
    id: "ord-008", orderNumber: "OLX-29200",
    customerId: "c-004", status: "delivered",
    items: [
      { productId: "m-002", productTitle: "Oxford Button-Down Shirt", productBrand: "Forma Studio",
        productImage: `${B}/olx-m2a/120/160`, quantity: 2, selectedSize: "M", selectedColor: "White", price: 320 },
    ],
    subtotal: 640, shipping: 28, discount: 0, total: 668,
    shippingAddress: {
      id: "addr-c4-1", label: "Home", isDefault: true,
      firstName: "Marcus", lastName: "Reid",
      line1: "42 Macquarie Street", city: "Sydney",
      state: "NSW", postalCode: "2000", country: "Australia",
    },
    placedAt: "2026-04-28T07:30:00Z", updatedAt: "2026-05-06T15:00:00Z",
  },
  {
    id: "ord-009", orderNumber: "OLX-29314",
    customerId: "c-008", status: "returned",
    items: [
      { productId: "w-004", productTitle: "Ribbed Merino Turtleneck", productBrand: "Nero & Co.",
        productImage: `${B}/olx-w4a/120/160`, quantity: 1, selectedSize: "M", selectedColor: "Charcoal", price: 445 },
    ],
    subtotal: 445, shipping: 0, discount: 0, total: 445,
    shippingAddress: {
      id: "addr-c8-1", label: "Home", isDefault: true,
      firstName: "David", lastName: "Park",
      line1: "123 Gangnam-daero", city: "Seoul",
      state: "Gangnam-gu", postalCode: "06100", country: "South Korea",
    },
    placedAt: "2026-04-02T13:45:00Z", updatedAt: "2026-04-20T10:00:00Z",
  },
  {
    id: "ord-010", orderNumber: "OLX-29411",
    customerId: "c-001", status: "shipped",
    items: [
      { productId: "w-008", productTitle: "Double-Breasted Wool Coat", productBrand: "Silhouette House",
        productImage: `${B}/olx-w8a/120/160`, quantity: 1, selectedSize: "XS", selectedColor: "Black", price: 2850 },
    ],
    subtotal: 2850, shipping: 0, discount: 250, total: 2600,
    shippingAddress: {
      id: "addr-c1-1", label: "Home", isDefault: true,
      firstName: "Sarah", lastName: "Mitchell",
      line1: "24 Eaton Square", city: "London",
      state: "England", postalCode: "SW1W 9BB", country: "United Kingdom",
    },
    placedAt: "2026-06-07T10:00:00Z", updatedAt: "2026-06-09T14:30:00Z",
  },
  {
    id: "ord-011", orderNumber: "OLX-29500",
    customerId: "c-007", status: "processing",
    items: [
      { productId: "a-003", productTitle: "Cashmere Wrap Scarf", productBrand: "Nero & Co.",
        productImage: `${B}/olx-a3a/120/160`, quantity: 1, selectedSize: "One Size", selectedColor: "Camel", price: 650 },
      { productId: "a-002", productTitle: "Italian Leather Belt", productBrand: "Valmont Atelier",
        productImage: `${B}/olx-a2a/120/160`, quantity: 1, selectedSize: "80cm", selectedColor: "Black", price: 290 },
    ],
    subtotal: 940, shipping: 0, discount: 0, total: 940,
    shippingAddress: {
      id: "addr-c7-1", label: "Home", isDefault: true,
      firstName: "Anna", lastName: "Söderström",
      line1: "Strandvägen 7", city: "Stockholm",
      state: "Stockholm County", postalCode: "114 51", country: "Sweden",
    },
    placedAt: "2026-06-09T09:00:00Z", updatedAt: "2026-06-10T08:00:00Z",
  },
  {
    id: "ord-012", orderNumber: "OLX-29588",
    customerId: "c-003", status: "delivered",
    items: [
      { productId: "w-007", productTitle: "Plissé Maxi Skirt", productBrand: "Opus One",
        productImage: `${B}/olx-w7a/120/160`, quantity: 1, selectedSize: "S", selectedColor: "Forest Green", price: 870 },
      { productId: "w-006", productTitle: "Asymmetric Silk Blouse", productBrand: "Ligne Claire",
        productImage: `${B}/olx-w6a/120/160`, quantity: 1, selectedSize: "S", selectedColor: "White", price: 595 },
    ],
    subtotal: 1465, shipping: 0, discount: 0, total: 1465,
    shippingAddress: {
      id: "addr-c3-1", label: "Home", isDefault: true,
      firstName: "Emma", lastName: "Thornton",
      line1: "7 Rue de Rivoli", city: "Paris",
      state: "Île-de-France", postalCode: "75001", country: "France",
    },
    placedAt: "2026-03-14T11:00:00Z", updatedAt: "2026-03-21T09:00:00Z",
  },
  {
    id: "ord-013", orderNumber: "OLX-29650",
    customerId: "c-010", status: "delivered",
    items: [
      { productId: "m-005", productTitle: "Pleated Wool Trousers", productBrand: "Atelier Milo",
        productImage: `${B}/olx-m5a/120/160`, quantity: 1, selectedSize: "32", selectedColor: "Charcoal", price: 780 },
      { productId: "m-003", productTitle: "Slim-Fit Merino Crew", productBrand: "Crespi Milano",
        productImage: `${B}/olx-m3a/120/160`, quantity: 1, selectedSize: "L", selectedColor: "Navy", price: 490 },
    ],
    subtotal: 1270, shipping: 0, discount: 0, total: 1270,
    shippingAddress: {
      id: "addr-c10-1", label: "Home", isDefault: true,
      firstName: "Henry", lastName: "Blackwood",
      line1: "12 Cheyne Walk", city: "London",
      state: "England", postalCode: "SW3 5RA", country: "United Kingdom",
    },
    placedAt: "2026-02-18T14:00:00Z", updatedAt: "2026-02-25T10:00:00Z",
  },
  {
    id: "ord-014", orderNumber: "OLX-29720",
    customerId: "c-005", status: "delivered",
    items: [
      { productId: "w-001", productTitle: "Midnight Silk Slip Dress", productBrand: "Maison Altair",
        productImage: `${B}/olx-w1a/120/160`, quantity: 1, selectedSize: "XS", selectedColor: "Ivory", price: 1250 },
      { productId: "a-001", productTitle: "Structured Leather Tote", productBrand: "Maison Altair",
        productImage: `${B}/olx-a1a/120/160`, quantity: 1, selectedSize: "One Size", selectedColor: "Tan", price: 2100 },
    ],
    subtotal: 3350, shipping: 0, discount: 0, total: 3350,
    shippingAddress: {
      id: "addr-c5-1", label: "Home", isDefault: true,
      firstName: "Olivia", lastName: "Chen",
      line1: "88 Repulse Bay Road", city: "Hong Kong",
      state: "Repulse Bay", postalCode: "", country: "Hong Kong SAR",
    },
    placedAt: "2026-01-22T10:00:00Z", updatedAt: "2026-01-30T09:00:00Z",
  },
  {
    id: "ord-015", orderNumber: "OLX-29800",
    customerId: "c-002", status: "pending",
    items: [
      { productId: "m-004", productTitle: "Leather-Trim Bomber Jacket", productBrand: "Dorset Row",
        productImage: `${B}/olx-m4a/120/160`, quantity: 1, selectedSize: "M", selectedColor: "Olive", price: 1890 },
    ],
    subtotal: 1890, shipping: 0, discount: 0, total: 1890,
    shippingAddress: {
      id: "addr-c2-1", label: "Home", isDefault: true,
      firstName: "James", lastName: "Crawford",
      line1: "840 Park Avenue", line2: "Apt 12B",
      city: "New York", state: "NY", postalCode: "10021", country: "United States",
    },
    placedAt: "2026-06-11T08:00:00Z", updatedAt: "2026-06-11T08:00:00Z",
  },
];

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function getOrderByNumber(orderNumber: string): Order | undefined {
  return orders.find((o) => o.orderNumber === orderNumber);
}

export function getOrdersByCustomerId(customerId: string): Order[] {
  return orders.filter((o) => o.customerId === customerId);
}
