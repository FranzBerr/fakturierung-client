import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL || "http://localhost:8080";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   // ⬅️ WICHTIG in Next.js 16

  const res = await fetch(`${BACKEND_URL}/api/customers/${id}`);

  if (res.status === 404) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch customer" },
      { status: res.status }
    );
  }

  return NextResponse.json(await res.json());
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   // ⬅️ WICHTIG
  const body = await request.json();

  const res = await fetch(`${BACKEND_URL}/api/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: res.status }
    );
  }

  return NextResponse.json(await res.json());
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   // ⬅️ WICHTIG

  const res = await fetch(`${BACKEND_URL}/api/customers/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: res.status }
    );
  }

  return NextResponse.json({ success: true });
}
