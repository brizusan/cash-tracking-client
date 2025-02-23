"use server";

import { tokenSchema } from "../types";

export async function validateResetToken(token: string) {
  const validateToken = tokenSchema.parse(token);

  const res = await fetch(`${process.env.API_URL}/auth/validate-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: validateToken }),
  });

  const data = await res.json();

  if (res.status === 404) return { errors: [data.message], success: "" };

  return { errors: [], success: data.message };
}
