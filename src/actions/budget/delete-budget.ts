"use server";

import { deleteBudgetById } from "@/src/services/budgets";
import { checkPassword } from "@/src/services/validate";
import type { Budget } from "@/src/types";
import { passwordSchema } from "@/src/types";
import { revalidatePath } from "next/cache";

type ActionState = { errors: string[]; success: string };

export async function deleteBudget(
  budgetId: Budget["id"],
  prevState: ActionState,
  formData: FormData
) {
  const data = {
    password: formData.get("password"),
  };

  const password = passwordSchema.safeParse(data.password);

  if (!password.success) {
    const errors = password.error?.errors.map((error) => error.message);
    return { errors, success: "" };
  }

  const req = await checkPassword(password.data);
  const res = await req.json();

  if (req.status !== 200) return { errors: [res.message], success: "" };

  const reqDelete = await deleteBudgetById(budgetId);
  const dataDelete = await reqDelete.json();

  if (reqDelete.status !== 200)
    return { errors: [dataDelete.message], success: "" };

  revalidatePath("/admin");

  return { errors: [], success: dataDelete.message };
}
