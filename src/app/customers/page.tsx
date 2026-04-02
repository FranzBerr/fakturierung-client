import Link from "next/link";
import { getCustomers } from "@/services/customerService";
import {Customer} from "@/types/customer";

export default async function CustomerListPage() {
  let customers: Customer[] = [];

  try {
    customers = await getCustomers();
  } catch (error) {
    console.error("Error loading customers:", error);
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kunden</h1>

        <Link
          href="/customers/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Neuer Kunde
        </Link>
      </div>

      {customers.length === 0 && (
        <p className="text-gray-600">Keine Kunden gefunden.</p>
      )}

      <table className="min-w-full bg-white border border-gray-200 shadow-sm">
        <thead>
        <tr className="bg-gray-100 border-b">
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Kundennummer</th>
          <th className="px-4 py-2 text-left">Firma</th>
          <th className="px-4 py-2 text-left">Ort</th>
          <th className="px-4 py-2 text-left">Aktionen</th>
        </tr>
        </thead>

        <tbody>
        {customers.map((c: Customer) => (
          <tr key={c.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2">{c.id}</td>
            <td className="px-4 py-2">{c.kundennummer}</td>
            <td className="px-4 py-2">{c.firma}</td>
            <td className="px-4 py-2">{c.ort}</td>
            <td className="px-4 py-2">
              <Link
                href={`/customers/${c.id}`}
                className="text-blue-600 hover:underline"
              >
                Details
              </Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
