"use server";
import { cookies } from "next/headers";
import { loginSchema } from "../types";

export type ActionStateType = { errors: string[]; success: string };

export async function loginAccount(
  prevState: ActionStateType,
  formData: FormData
) {
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = loginSchema.safeParse(loginData);

  if (!response.success) {
    const errors = response.error?.errors.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/login`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: response.data.email,
      password: response.data.password,
    }),
  });

  const data = await res.json();

  if (res.status !== 200) return { errors: [data.message], success: "" };

  cookies().set({
    name: "crashtracking_token",
    value: data.token,
    httpOnly: true,
    path: "/",
    secure: true,
  });

  return {
    errors: [],
    success: data.message,
  };
}
