"use server";

import getToken from "@/src/auth/token";
import { DraftBudgetSchema } from "@/src/types";

type ActionStateType = { errors: string[]; success: string };

export async function createBudget(
  prevState: ActionStateType,
  formData: FormData
) {
  const dataForm = {
    name: formData.get("name"),
    amount: formData.get("amount"),
  };

  const token = getToken();

  const response = DraftBudgetSchema.safeParse(dataForm);

  if (!response.success) {
    const errors = response.error.issues.map((issue) => issue.message);

    return {
      errors,
      success: "",
    };
  }

  const req = await fetch(`${process.env.API_URL}/budgets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(response.data),
  });

  const data = await req.json();
  if (req.status !== 201) return { errors: [data.message], success: "" };
  return { errors: [], success: data.message };
}
