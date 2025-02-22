"use client";

import { loginAccount } from "@/src/actions/login-account";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export const FormLogin = () => {
  const [state, trigger] = useFormState(loginAccount, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error));
    }
  }, [state]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          alert("Redireccinando a la pagina principal");
        },
      });
    }
  }, [state]);

  return (
    <>
      <form action={trigger} className="mt-14 space-y-5" noValidate>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold text-2xl">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-bold text-2xl">
            Password
          </label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
};
