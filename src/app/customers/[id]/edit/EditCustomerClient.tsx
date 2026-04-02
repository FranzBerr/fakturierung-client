"use client";

import CustomerForm from "@/components/CustomerForm";
import { updateCustomer } from "@/services/customerService";
import { useRouter } from "next/navigation";
import { Customer } from "@/types/customer";
import Link from "next/link";

export default function EditCustomerClient({
   id,
  customer,
  }: {
  id: number;
  customer: Customer;
}) {
  const router = useRouter();


  return (
    <div className="space-y-6">
      <CustomerForm
        initialValues={customer}
        submitLabel="Aktualisieren"
        onSubmit={async (values) => {
          await updateCustomer(id, values);
          router.push("/customers");
        }}
      />

      <div className="flex gap-4">
        <Link
          href={`/customers/${id}`}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Zurück
        </Link>
      </div>
    </div>
    // <CustomerForm
    //   initialValues={customer}
    //   submitLabel="Aktualisieren"
    //   onSubmit={async (values) => {
    //     await updateCustomer(id, values);
    //     router.push("/customers");
    //   }}
    // />
  );
}
