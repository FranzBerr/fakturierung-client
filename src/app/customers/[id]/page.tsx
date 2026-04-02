import { getCustomer, deleteCustomer } from "@/services/customerService";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CustomerDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;     // ⬅️ Next.js 16: params ist ein Promise
  const numericId = Number(id);

  const customer = await getCustomer(numericId);

  if (!customer) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Kunde nicht gefunden</h1>
        <Link href="/customers" className="text-blue-600 underline">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  async function handleDelete() {
    "use server";
    await deleteCustomer(numericId);
    redirect("/customers");
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">Kundendetails</h1>

      <div className="space-y-2">
        <p><strong>Kundennummer:</strong> {customer.kundennummer}</p>
        <p><strong>Firma:</strong> {customer.firma}</p>
        <p><strong>Straße:</strong> {customer.strasse}</p>
        <p><strong>PLZ:</strong> {customer.plz}</p>
        <p><strong>Ort:</strong> {customer.ort}</p>
      </div>

      <div className="flex gap-4">
        <Link
          href={`/customers/${numericId}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Bearbeiten
        </Link>

        <form action={handleDelete}>
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Löschen
          </button>
        </form>

        <Link
          href="/customers"
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Zurück
        </Link>
      </div>
    </div>
  );
}
