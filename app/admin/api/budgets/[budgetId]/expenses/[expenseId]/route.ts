import { verifySession } from "@/src/auth/dal";
import getToken from "@/src/auth/token";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ budgetId: string; expenseId: string }> }
) {
  await verifySession();

  const { budgetId, expenseId } = await params;

  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
  const token = getToken();
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    return new Response(data.message, {
      status: 404,
    });
  }

  return new Response(JSON.stringify(data.expense), {
    status: 200,
  });
}
