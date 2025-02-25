import { notFound } from "next/navigation";
import { cache } from "react";
import getToken from "../auth/token";
import { ArrayBudgetSchema, Budget, BudgetResponse } from "../types";

export async function getBudgets(): Promise<Budget[]> {
  const token = getToken();
  const res = await fetch(`${process.env.API_URL}/budgets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  const result = ArrayBudgetSchema.safeParse(data.budgets);
  if (!result.success) return [];
  return result.data;
}

export const getBudgetById = cache(
  async (id: Budget["id"]): Promise<BudgetResponse> => {
    const res = await fetch(`${process.env.API_URL}/budgets/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
    });
    if (!res.ok) return notFound();
    const data = await res.json();
    return data.budget;
  }
);

export const deleteBudgetById = async (id: Budget["id"]) => {
  const token = getToken();
  const req = await fetch(`${process.env.API_URL}/budgets/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return req;
};
