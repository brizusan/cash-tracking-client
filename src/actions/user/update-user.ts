"use server";

import getToken from "@/src/auth/token";
import { DrafUpdateProfile } from "@/src/types";
import { revalidatePath } from "next/cache";

type ActionStateType = { errors: string[]; success: string };

export async function updateUser(
  prevState: ActionStateType,
  formData: FormData
) {
  const dataForm = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  const response = DrafUpdateProfile.safeParse(dataForm);

  if (!response.success) {
    const errors = response.error.issues.map((issue) => issue.message);
    return {
      errors,
      success: "",
    };
  }

  const token = getToken();
  const req = await fetch(`${process.env.API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(response.data),
  });

  const res = await req.json();

  if (req.status !== 200) return { errors: [res.message], success: "" };

  revalidatePath("/admin/profile/settings");

  return {
    errors: [],
    success: res.message,
  };
}
