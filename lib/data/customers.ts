import type { Customer } from "@/types/commerce";

export const customers: Customer[] = [
  {
    id: "c-001",
    firstName: "Sarah", lastName: "Mitchell",
    email: "s.mitchell@email.com", phone: "+44 7700 900123",
    orderCount: 8, totalSpent: 18420,
    joinedAt: "2024-03-15",
    addresses: [
      {
        id: "addr-c1-1", label: "Home", isDefault: true,
        firstName: "Sarah", lastName: "Mitchell",
        line1: "24 Eaton Square", city: "London",
        state: "England", postalCode: "SW1W 9BB", country: "United Kingdom",
      },
    ],
  },
  {
    id: "c-002",
    firstName: "James", lastName: "Crawford",
    email: "j.crawford@email.com", phone: "+1 212 555 0174",
    orderCount: 5, totalSpent: 11250,
    joinedAt: "2024-06-22",
    addresses: [
      {
        id: "addr-c2-1", label: "Home", isDefault: true,
        firstName: "James", lastName: "Crawford",
        line1: "840 Park Avenue", line2: "Apt 12B",
        city: "New York", state: "NY", postalCode: "10021", country: "United States",
      },
    ],
  },
  {
    id: "c-003",
    firstName: "Emma", lastName: "Thornton",
    email: "e.thornton@email.com",
    orderCount: 12, totalSpent: 34800,
    joinedAt: "2023-11-08",
    addresses: [
      {
        id: "addr-c3-1", label: "Home", isDefault: true,
        firstName: "Emma", lastName: "Thornton",
        line1: "7 Rue de Rivoli", city: "Paris",
        state: "Île-de-France", postalCode: "75001", country: "France",
      },
    ],
  },
  {
    id: "c-004",
    firstName: "Marcus", lastName: "Reid",
    email: "m.reid@email.com", phone: "+61 2 9000 0000",
    orderCount: 3, totalSpent: 6100,
    joinedAt: "2025-01-30",
    addresses: [
      {
        id: "addr-c4-1", label: "Home", isDefault: true,
        firstName: "Marcus", lastName: "Reid",
        line1: "42 Macquarie Street", city: "Sydney",
        state: "NSW", postalCode: "2000", country: "Australia",
      },
    ],
  },
  {
    id: "c-005",
    firstName: "Olivia", lastName: "Chen",
    email: "o.chen@email.com", phone: "+852 9123 4567",
    orderCount: 15, totalSpent: 52300,
    joinedAt: "2023-07-19",
    addresses: [
      {
        id: "addr-c5-1", label: "Home", isDefault: true,
        firstName: "Olivia", lastName: "Chen",
        line1: "88 Repulse Bay Road", city: "Hong Kong",
        state: "Repulse Bay", postalCode: "", country: "Hong Kong SAR",
      },
    ],
  },
  {
    id: "c-006",
    firstName: "Luca", lastName: "Ferrara",
    email: "l.ferrara@email.com", phone: "+39 02 1234567",
    orderCount: 6, totalSpent: 14600,
    joinedAt: "2024-09-05",
    addresses: [
      {
        id: "addr-c6-1", label: "Home", isDefault: true,
        firstName: "Luca", lastName: "Ferrara",
        line1: "Via Montenapoleone 12", city: "Milan",
        state: "Lombardy", postalCode: "20121", country: "Italy",
      },
    ],
  },
  {
    id: "c-007",
    firstName: "Anna", lastName: "Söderström",
    email: "a.soderstrom@email.com",
    orderCount: 4, totalSpent: 8900,
    joinedAt: "2025-02-14",
    addresses: [
      {
        id: "addr-c7-1", label: "Home", isDefault: true,
        firstName: "Anna", lastName: "Söderström",
        line1: "Strandvägen 7", city: "Stockholm",
        state: "Stockholm County", postalCode: "114 51", country: "Sweden",
      },
    ],
  },
  {
    id: "c-008",
    firstName: "David", lastName: "Park",
    email: "d.park@email.com", phone: "+82 10 1234 5678",
    orderCount: 9, totalSpent: 22700,
    joinedAt: "2024-04-11",
    addresses: [
      {
        id: "addr-c8-1", label: "Home", isDefault: true,
        firstName: "David", lastName: "Park",
        line1: "123 Gangnam-daero", city: "Seoul",
        state: "Gangnam-gu", postalCode: "06100", country: "South Korea",
      },
    ],
  },
  {
    id: "c-009",
    firstName: "Isabelle", lastName: "Rousseau",
    email: "i.rousseau@email.com", phone: "+33 6 00 00 00 00",
    orderCount: 7, totalSpent: 16800,
    joinedAt: "2023-12-01",
    addresses: [
      {
        id: "addr-c9-1", label: "Home", isDefault: true,
        firstName: "Isabelle", lastName: "Rousseau",
        line1: "15 Avenue Montaigne", city: "Paris",
        state: "Île-de-France", postalCode: "75008", country: "France",
      },
    ],
  },
  {
    id: "c-010",
    firstName: "Henry", lastName: "Blackwood",
    email: "h.blackwood@email.com", phone: "+44 7911 123456",
    orderCount: 11, totalSpent: 29500,
    joinedAt: "2023-08-28",
    addresses: [
      {
        id: "addr-c10-1", label: "Home", isDefault: true,
        firstName: "Henry", lastName: "Blackwood",
        line1: "12 Cheyne Walk", city: "London",
        state: "England", postalCode: "SW3 5RA", country: "United Kingdom",
      },
    ],
  },
];

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}
