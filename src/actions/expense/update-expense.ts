"use server";

import getToken from "@/src/auth/token";
import {
  type Budget,
  DraftExpenseSchema,
  type ResponseExpense,
} from "@/src/types";
import { revalidatePath } from "next/cache";

type ValuesProps = {
  budgetId: Budget["id"];
  expenseId: ResponseExpense["id"];
};
type ActionState = { errors: string[]; success: string };
export async function updateExpense(
  { budgetId, expenseId }: ValuesProps,
  prevState: ActionState,
  formData: FormData
) {
  const response = DraftExpenseSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!response.success) {
    const errors = response.error.issues.map((issue) => issue.message);
    return { errors, success: "" };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(response.data),
  });

  const data = await req.json();

  if (!req.ok) return { errors: [data.message], success: "" };

  revalidatePath("/admin/budget");

  return {
    errors: [],
    success: data.message,
  };
}
