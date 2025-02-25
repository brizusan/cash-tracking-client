"use server";

import getToken from "@/src/auth/token";
import { checkPassword } from "@/src/services/validate";
import { Budget, passwordSchema, ResponseExpense } from "@/src/types";
import { revalidatePath } from "next/cache";

type ActionState = { errors: string[]; success: string };
type ValuesProps = { budgetId: Budget["id"]; expenseId: ResponseExpense["id"] };
export async function deleteExpense(
  { budgetId, expenseId }: ValuesProps,
  prevState: ActionState,
  formData: FormData
) {
  const password = passwordSchema.safeParse(formData.get("password"));

  if (!password.success) {
    const errors = password.error?.errors.map((error) => error.message);
    return { errors, success: "" };
  }

  const req = await checkPassword(password.data);
  const res = await req.json();

  if (req.status !== 200) return { errors: [res.message], success: "" };

  const token = getToken();

  const reqDelete = await fetch(
    `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const resDelete = await reqDelete.json();

  if (reqDelete.status !== 200)
    return { errors: [resDelete.message], success: "" };

  revalidatePath("/admin/budget");

  return { errors: [], success: resDelete.message };
}
