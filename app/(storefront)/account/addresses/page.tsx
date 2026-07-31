import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/utils/auth";
import { getCustomerProfile } from "@/lib/data/server";

export const metadata = { title: "My Addresses" };

export default async function AddressesPage() {
  const session = await getSession();
  if (!session) redirect("/account/sign-in?redirect=/account/addresses");

  const customer = await getCustomerProfile(session.sub);
  if (!customer) redirect("/account/sign-in?redirect=/account/addresses");

  const addresses = customer.addresses;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-xl font-light">Saved Addresses</h2>
      </div>

      {addresses.length === 0 ? (
        <div className="border border-border p-8 text-center">
          <p className="text-sm font-medium">No saved addresses yet</p>
          <p className="mt-1 text-xs text-muted">
            Addresses you use at checkout will appear here for faster ordering.
          </p>
          <Link
            href="/new-arrivals"
            className="mt-4 inline-block border border-foreground px-5 py-2 text-[10px] font-medium uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div key={addr.id} className="relative border border-border p-5">
              {addr.isDefault && (
                <span className="absolute right-3 top-3 border border-foreground px-2 py-0.5 text-[9px] font-medium uppercase tracking-widest">
                  Default
                </span>
              )}
              <p className="font-medium">{addr.label}</p>
              <div className="mt-2 text-sm text-muted">
                <p>{addr.firstName} {addr.lastName}</p>
                <p>{addr.line1}</p>
                {addr.line2 && <p>{addr.line2}</p>}
                <p>{addr.city}, {addr.postalCode}</p>
                <p>{addr.country}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
