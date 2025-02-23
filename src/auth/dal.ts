import { redirect } from "next/navigation";
import { cache } from "react";
import "server-only";
import { type User, userSchema } from "../types";
import getToken from "./token";

export const verifySession = cache(
  async (): Promise<{
    user: User;
    isAuth: boolean;
  }> => {
    const token = getToken();
    if (!token) redirect("/auth/login");

    // comprobar el token con la api
    const url = `${process.env.API_URL}/auth/user`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) redirect("/auth/login");

    const { user } = await res.json();

    const response = userSchema.safeParse(user);

    if (!response.success) redirect("/auth/login");

    return {
      user: response.data,
      isAuth: true,
    };
  }
);
