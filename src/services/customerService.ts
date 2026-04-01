import { Customer } from "@/types/customer";

const BASE_URL = "http://localhost:8080";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export async function getCustomers(): Promise<Customer[]> {
  const res = await fetch(`${BASE_URL}/api/customers`, {
    cache: "no-store"
  });
  return handleResponse<Customer[]>(res);
}

export async function getCustomer(id: number): Promise<Customer> {
  const res = await fetch(`${BASE_URL}/api/customers/${id}`, {
    cache: "no-store"
  });
  return handleResponse<Customer>(res);
}

export async function createCustomer(customer: Customer): Promise<Customer> {
  const res = await fetch(`${BASE_URL}/api/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer)
  });
  return handleResponse<Customer>(res);
}

export async function updateCustomer(id: number, customer: Customer): Promise<Customer> {
  const res = await fetch(`${BASE_URL}/api/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer)
  });
  return handleResponse<Customer>(res);
}

export async function deleteCustomer(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/customers/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
}
