import { createCustomer } from "@/services/customerService";
// /import CustomerForm from "@/components/CustomerForm";

import { Customer } from "@/types/customer";
import CustomerForm from "../[id]/CustomerForm";

export default function NewCustomerPage() {
  const emptyCustomer: Customer = {
    id: 0,
    kundennummer: "",
    firma: "",
    strasse: "",
    plz: "",
    ort: ""
  };

  async function saveCustomerAction(customer: Customer) {
    "use server";
    await createCustomer(customer);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Neuer Kunde</h1>

      <CustomerForm
        initialCustomer={emptyCustomer}
        onSubmitAction={saveCustomerAction}
      />
    </div>
  );
}
