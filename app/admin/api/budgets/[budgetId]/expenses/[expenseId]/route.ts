import { verifySession } from "@/src/auth/dal";
import getToken from "@/src/auth/token";
import { NextApiRequest } from "next";

export async function GET(
  request: NextApiRequest,
  { params }: { params: { budgetId: string; expenseId: string } }
) {
  await verifySession();

  const url = `${process.env.API_URL}/budgets/${params.budgetId}/expenses/${params.expenseId}`;
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
