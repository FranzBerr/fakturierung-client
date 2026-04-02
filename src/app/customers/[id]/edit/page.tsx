import { getCustomer } from "@/services/customerService";
import EditCustomerClient from "./EditCustomerClient";

export default async function EditCustomerPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const numericId = Number(id);

  const customer = await getCustomer(numericId);

  if (!customer) {
    return <div className="p-6">Kunde nicht gefunden</div>;
  }

  return <EditCustomerClient id={numericId} customer={customer} />;
}
