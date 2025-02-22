"use server";

import { tokenSchema } from "../types";

export async function confirmAccount(token: string) {
  const result = tokenSchema.safeParse(token);

  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/confirm-account`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: result.data }),
  });

  const data = await res.json();

  if (res.status === 401) return { errors: [data.message], success: "" };

  return {
    errors: [],
    success: data.message,
  };
}
