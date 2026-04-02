"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomer } from "@/services/customerService";
import { Customer } from "@/types/customer";

export default function NewCustomerPage() {
  const router = useRouter();

  const [form, setForm] = useState<Customer>({
    kundennummer: "",
    firma: "",
    strasse: "",
    plz: "",
    ort: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createCustomer(form);
      router.push("/customers");
    } catch (err) {
      console.error("Failed to create customer", err);
      alert("Fehler beim Anlegen des Kunden");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Neuen Kunden anlegen</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium mb-1">Kundennummer</label>
          <input
            type="text"
            name="kundennummer"
            value={form.kundennummer}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Firma</label>
          <input
            type="text"
            name="firma"
            value={form.firma}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Straße</label>
          <input
            type="text"
            name="strasse"
            value={form.strasse}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">PLZ</label>
          <input
            type="text"
            name="plz"
            value={form.plz}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Ort</label>
          <input
            type="text"
            name="ort"
            value={form.ort}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Speichern
        </button>
      </form>
    </div>
  );
}
