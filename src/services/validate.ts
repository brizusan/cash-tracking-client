import getToken from "../auth/token";

export const checkPassword = async (password: string) => {
  const token = getToken();
  const url = `${process.env.API_URL}/auth/check-password`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password: password }),
  });

  return req;
};
