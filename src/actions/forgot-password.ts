"use server";

import { emailValidateSchema } from "../types";

type ActionStateType = { errors: string[]; success: string };

export async function forgotPassword(
  prevState: ActionStateType,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
  };

  const result = emailValidateSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/forgot-password`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: result.data.email }),
  });

  const dataRes = await res.json();

  if (res.status !== 200) return { errors: [dataRes.message], success: "" };

  return { errors: [], success: dataRes.message };
}
