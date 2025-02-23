import { cookies } from "next/headers";

export default function getToken() {
  const token = cookies().get("crashtracking_token")?.value;
  return token;
}
