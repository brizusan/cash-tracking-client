"use server";

import getToken from "@/src/auth/token";
import { DrafUpdatePassword } from "@/src/types";

type ActionStateType = { errors: string[]; success: string };
export async function updatePassword(
  prevState: ActionStateType,
  formData: FormData
) {
  const dataForm = DrafUpdatePassword.safeParse({
    current_password: formData.get("current_password"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  });

  if (!dataForm.success) {
    const errors = dataForm.error.issues.map((issue) => issue.message);
    return { errors, success: "" };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/auth/update-password`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      current_password: dataForm.data.current_password,
      new_password: dataForm.data.password,
    }),
  });

  const res = await req.json();
  if (req.status !== 200) return { errors: [res.message], success: "" };

  return { errors: [], success: res.message };
}
