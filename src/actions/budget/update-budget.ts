"use server";

import getToken from "@/src/auth/token";
import { DraftBudgetSchema } from "@/src/types";
import { revalidatePath } from "next/cache";

type ActionState = { errors: string[]; success: string };

export async function updateBudget(prevState: ActionState, formData: FormData) {
  const dataForm = {
    id: formData.get("id"),
  };

  const response = DraftBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!response.success) {
    const errors = response.error.issues.map((issue) => issue.message);

    return {
      errors,
      success: "",
    };
  }
  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${dataForm.id}`;
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(response.data),
  });

  const data = await req.json();
  if (req.status !== 200) return { errors: [data.message], success: "" };

  revalidatePath("/admin/");
  return { errors: [], success: data.message };
}
