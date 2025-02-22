"use server";

import { registerSchema } from "../types";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function createAccount(
  prevState: ActionStateType,
  formData: FormData
) {
  const registerData = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirmation"),
  };

  const response = registerSchema.safeParse(registerData);

  if (!response.success) {
    const errors = response.error?.errors.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/create-account`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: response.data.email,
      name: response.data.name,
      password: response.data.password,
    }),
  });

  const data = await res.json();
  if (res.status === 409) return { errors: [data.message], success: "" };

  return {
    errors: [],
    success: data.message,
  };
}
