"use server";

import getToken from "@/src/auth/token";
import { DraftExpenseSchema } from "@/src/types";
import { revalidatePath } from "next/cache";

type ActionStateType = { errors: string[]; success: string };

export async function createExpense(
  budgetId: number,
  prevState: ActionStateType,
  formData: FormData
) {
  const data = DraftExpenseSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!data.success) {
    const errors = data.error.issues.map((issue) => issue.message);
    return { errors, success: "" };
  }

  const token = getToken();
  // crear gastos
  const req = await fetch(
    `${process.env.API_URL}/budgets/${budgetId}/expenses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data.data),
    }
  );

  const res = await req.json();

  if (req.status !== 201) return { errors: [res.message], success: "" };

  revalidatePath(`/admin/budget/${budgetId}`);

  return {
    errors: [],
    success: res.message,
  };
}
