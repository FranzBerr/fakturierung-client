import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Willkommen im ERP‑System</h1>
        <p className="text-gray-600 mb-10">
          Wähle einen Bereich aus, um Kunden, Produkte oder Rechnungen zu verwalten.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/customers"
            className="block p-6 bg-white shadow rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">Kunden</h2>
            <p className="text-gray-500 text-sm">
              Kunden anzeigen, bearbeiten und neue Kunden anlegen.
            </p>
          </Link>

          <Link
            href="/products"
            className="block p-6 bg-white shadow rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">Produkte</h2>
            <p className="text-gray-500 text-sm">
              Produktstammdaten verwalten und neue Produkte anlegen.
            </p>
          </Link>

          <Link
            href="/invoices"
            className="block p-6 bg-white shadow rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">Rechnungen</h2>
            <p className="text-gray-500 text-sm">
              Rechnungen erstellen, bearbeiten und verwalten.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
