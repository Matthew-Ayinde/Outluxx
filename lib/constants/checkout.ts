// Flat delivery fee applied to every order, regardless of delivery speed.
// Must stay in sync across the payment-intent charge and the saved order
// record — see app/api/checkout/intent/route.ts and app/api/checkout/confirm/route.ts.
export const DELIVERY_FEE = 3.98;
