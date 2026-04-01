"use client";

import { useState } from "react";
import { Customer } from "@/types/customer";

type CustomerFormProps = {
  initialCustomer: Customer;
  onSubmitAction: (customer: Customer) => void;
};

export default function CustomerForm({ initialCustomer, onSubmitAction }: CustomerFormProps) {
  const [customer, setCustomer] = useState<Customer>(initialCustomer);

  const fields: (keyof Customer)[] = [
    "kundennummer",
    "firma",
    "strasse",
    "plz",
    "ort"
  ];

  function update<K extends keyof Customer>(key: K, value: Customer[K]) {
    setCustomer(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmitAction(customer);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field}>
          <label className="block font-medium capitalize">{field}</label>
          <input
            className="border px-3 py-2 w-full"
            type="text"
            value={customer[field] ?? ""}
            onChange={e => update(field, e.target.value)}
            required
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Speichern
      </button>
    </form>
  );
}
