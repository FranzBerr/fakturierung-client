"use client";

import { useState } from "react";
import { Customer } from '@/types/Customer';
import { createCustomer, updateCustomer, deleteCustomer } from "@/services/customerService";
import { useRouter } from "next/navigation";

export default function CustomerForm({ initial }: { initial?: Customer }) {
  const router = useRouter();
  const isEdit = !!initial?.id;

  const [customer, setCustomer] = useState<Customer>(
    initial ?? { kundennummer: "", firma: "", strasse: "", plz: "", ort: "" }
  );

  async function save() {
    if (isEdit) {
      await updateCustomer(initial!.id!, customer);
    } else {
      await createCustomer(customer);
    }
    router.push("/customers");
    router.refresh();
  }

  async function remove() {
    if (!initial?.id) return;
    await deleteCustomer(initial.id);
    router.push("/customers");
    router.refresh();
  }

  return (
    <div>
      <h1>{isEdit ? "Kunde bearbeiten" : "Neuer Kunde"}</h1>

      <form
        onSubmit={e => {
          e.preventDefault();
          save();
        }}
        className="space-y-4"
      >
        {["kundennummer", "firma", "strasse", "plz", "ort"].map(field => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            <input
              className="border px-3 py-2 w-full"
              value={(customer as any)[field]}
              onChange={e => setCustomer({ ...customer, [field]: e.target.value })}
              required
            />
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Speichern
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={remove}
            className="bg-red-600 text-white px-4 py-2 rounded ml-4"
          >
            Löschen
          </button>
        )}
      </form>
    </div>
  );
}
