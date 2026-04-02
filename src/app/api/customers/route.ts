import { NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:8080/api/customers";

export async function GET() {
  const res = await fetch(BACKEND_URL);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
