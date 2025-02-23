"use server";

import { ResetPasswordSchema } from "../types";

type ActionStateType = { errors: string[]; success: string };

export async function newPassword(
  prevState: ActionStateType,
  formData: FormData
) {
  const dataForm = {
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
    token: formData.get("token"),
  };

  const { token, ...restData } = dataForm;

  const response = ResetPasswordSchema.safeParse(restData);

  if (!response.success) {
    const errors = response.error?.errors.map((error) => error.message);

    return {
      errors,
      success: "",
    };
  }

  const req = await fetch(
    `${process.env.API_URL}/auth/reset-password/${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: response.data.password,
        password_confirmation: response.data.password_confirmation,
      }),
    }
  );

  const data = await req.json();

  if (req.status !== 200) return { errors: [data.message], success: "" };

  return { errors: [], success: data.message };
}
