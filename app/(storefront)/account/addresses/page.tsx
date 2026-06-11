import { customers } from "@/lib/data";

export const metadata = { title: "My Addresses" };

const MOCK_ADDRESSES = customers[0].addresses;

export default function AddressesPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Saved Addresses</h2>
        <button className="border border-black px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
          + Add Address
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {MOCK_ADDRESSES.map((addr) => (
          <div key={addr.id} className="relative border border-black/10 p-5">
            {addr.isDefault && (
              <span className="absolute right-3 top-3 border border-black px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest">
                Default
              </span>
            )}
            <p className="font-medium">{addr.label}</p>
            <div className="mt-2 text-sm text-zinc-600">
              <p>{addr.firstName} {addr.lastName}</p>
              <p>{addr.line1}</p>
              {addr.line2 && <p>{addr.line2}</p>}
              <p>{addr.city}, {addr.postalCode}</p>
              <p>{addr.country}</p>
            </div>
            <div className="mt-4 flex gap-4">
              <button className="text-xs text-zinc-500 underline underline-offset-2 hover:text-black">Edit</button>
              {!addr.isDefault && (
                <button className="text-xs text-zinc-500 underline underline-offset-2 hover:text-black">
                  Set as default
                </button>
              )}
              {!addr.isDefault && (
                <button className="text-xs text-red-500 underline underline-offset-2 hover:text-red-700">Remove</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
