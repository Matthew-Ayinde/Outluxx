# Outluxx Frontend Project Structure

This file maps the implementation scaffold created from `FRONTEND_IMPLEMENTATION_CHECKLIST.md`.

## App Routes (`app/`)
- Storefront pages: Home, New Arrivals, Women, Men, Accessories, Sale, Designers, Editorial, Search, Wishlist, Cart
- Checkout flow: `/checkout`, `/checkout/shipping`, `/checkout/delivery`, `/checkout/payment`, `/checkout/review`, `/checkout/confirmation`
- Account area: auth, profile, addresses, orders, order details, returns
- Utility pages: About, Shipping, Returns, Size Guide, Support, FAQ, Contact, Legal pages
- Dynamic templates: `products/[slug]`, `categories/[slug]`, `brands/[slug]`

## Components (`components/`)
- `layout/`: app shell, header, footer
- `navigation/`: mega menu, mobile nav, breadcrumbs
- `product/`: card, gallery, price block, variants
- `cart/`, `checkout/`, `forms/`, `feedback/`, `search/`, `account/`, `cms/`, `system/`

## Features (`features/`)
- home, plp, pdp, search, wishlist, cart, checkout, account

## Shared Libraries (`lib/`)
- `api/`: commerce/search/cms/payments stubs
- `analytics/`: event names + tracker stub
- `auth/`: session state stub
- `config/`: site, nav, SEO
- `constants/`: route constants
- `utils/`: format + validation helpers

## Shared Types and Hooks
- `types/`: commerce, CMS, analytics
- `hooks/`: `useCart`, `useWishlist`, `useLocale`

This scaffold is intentionally lightweight and ready for gradual implementation.
