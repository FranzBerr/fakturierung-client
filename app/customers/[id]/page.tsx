import { getCustomer, updateCustomer } from "@/services/customerService";
import CustomerForm from "@/components/CustomerForm";

import { Customer } from "@/types/customer";

type Props = {
  params: { id: string };
};

export default async function EditCustomerPage({ params }: Props) {
  const id = Number(params.id);

  // Prevent NaN → avoids /api/customers/NaN
  if (Number.isNaN(id)) {
    throw new Error(`Invalid customer ID: ${params.id}`);
  }

  const customer = await getCustomer(id);

  async function updateCustomerAction(updated: Customer) {
    "use server";
    await updateCustomer(id, updated);
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Kunde bearbeiten</h1>

      <CustomerForm
        initialCustomer={customer}
        onSubmitAction={updateCustomerAction}
      />
    </div>
  );
}
