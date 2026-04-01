import { getCustomers } from "@/services/customerService";
import Link from "next/link";

export default async function CustomersPage() {
 const customers = await getCustomers();

  return (
    <div>
      <h1>Kunden</h1>

      <Link href="/customers/new" className="text-blue-600 underline">
        Neuer Kunde
      </Link>

      <table className="mt-6">
        <thead>
        <tr>
          <th>ID</th>
          <th>Kundennummer</th>
          <th>Firma</th>
          <th>Ort</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {customers.map(c => (
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.kundennummer}</td>
            <td>{c.firma}</td>
            <td>{c.plz} {c.ort}</td>
            <td>
              <Link href={`/customers/${c.id}`} className="text-blue-600 underline">
                Bearbeiten
              </Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
