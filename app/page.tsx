import Link from "next/link";

export default function Home() {
  return (

    <>
      <h1 className="text-3xl font-bold">Fakturierung</h1>
      <p className="mt-4">Willkommen im Fakturierungssystem.</p>
      <Link href="/customers" className="text-blue-600 underline mt-6 block">
        Zur Kundenverwaltung
      </Link>
    </>
  );
}
