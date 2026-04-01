"use client";

import React, { useState } from "react";
import { Customer } from "@/types/customer";

type CustomerFormProps = {
  initialCustomer: Customer;
  onSubmitAction: (customer: Customer) => void;
};

export default function CustomerForm({
                                       initialCustomer,
                                       onSubmitAction
                                     }: CustomerFormProps) {
  const [customer, setCustomer] = useState<Customer>(initialCustomer);

  const fields: (keyof Customer)[] = [
    "kundennummer",
    "firma",
    "strasse",
    "plz",
    "ort"
  ];

  function update<K extends keyof Customer>(key: K, value: Customer[K]) {
    setCustomer(prev => ({
      ...prev,
      [key]: value
    }));
  }

  //später
  // function handleSubmit(e: SubmitEvent) {
  //   e.preventDefault();
  //   onSubmitAction(customer);
  // }

  // übergangsweise
  function handleSubmit(e: unknown) {
    const event = e as SubmitEvent;
    event.preventDefault();
    onSubmitAction(customer);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {fields.map(field => (
        <div key={field} className="flex flex-col gap-1">
          <label className="font-medium capitalize">
            {field}
          </label>

          <input
            type="text"
            value={customer[field] ?? ""}
            onChange={e => update(field, e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded
                   hover:bg-blue-700 transition"
      >
        Speichern
      </button>

    </form>
  );
}
