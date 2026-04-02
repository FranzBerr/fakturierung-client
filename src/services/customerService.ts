import { Customer } from "@/types/customer";
import { getApiBaseUrl } from "@/lib/apiBase";

// const API_URL = "http://localhost:8080/api/customers";
const BASE = getApiBaseUrl();
const API_URL = `${BASE}/api/customers`;

// Alle Kunden laden
// export async function getCustomers(): Promise<Customer[]> {
//   const res = await fetch(API_URL, { cache: "no-store" });
//
//   if (!res.ok) {
//     throw new Error("Failed to fetch customers");
//   }
//
//   return res.json();
// }
export async function getCustomers() {
  const res = await fetch(API_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch customers");
  }

  return res.json();
}
// Einzelnen Kunden laden
export async function getCustomer(id: number): Promise<Customer | null> {
  const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch customer");

  return res.json();
}

// Neuen Kunden anlegen
export async function createCustomer(customer: Customer): Promise<Customer> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });

  if (!res.ok) {
    throw new Error("Failed to create customer");
  }

  return res.json();
}

// Kunden aktualisieren
export async function updateCustomer(
  id: number,
  customer: Customer
): Promise<Customer> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });

  if (!res.ok) {
    throw new Error("Failed to update customer");
  }

  return res.json();
}

// Kunden löschen
export async function deleteCustomer(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete customer");
  }
}
