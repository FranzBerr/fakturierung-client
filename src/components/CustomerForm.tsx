"use client";

import { useState } from "react";
import { Customer } from "@/types/customer";

interface CustomerFormProps {
  initialValues: Customer;
  submitLabel: string;
  onSubmit: (values: Customer) => Promise<void>;
}

export default function CustomerForm({
                                       initialValues,
                                       submitLabel,
                                       onSubmit,
                                     }: CustomerFormProps) {
  const [form, setForm] = useState<Customer>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
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

      <div className="flex gap-4">
        <div className="flex-1">
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

        <div className="flex-1">
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
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitLabel}
      </button>
    </form>
  );
}
