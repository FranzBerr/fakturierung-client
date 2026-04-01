import { getCustomer } from "@/services/customerService";
import CustomerForm from "./CustomerForm";

export default async function EditCustomerPage({ params }: { params: { id: string } }) {
  const customer = await getCustomer(Number(params.id));
  return <CustomerForm initial={customer} />;
}
