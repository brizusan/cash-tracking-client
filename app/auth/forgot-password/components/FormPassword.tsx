"use client";

import { forgotPassword } from "@/src/actions/forgot-password";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export const FormPassword = () => {
  const router = useRouter();
  const [state, trigger] = useFormState(forgotPassword, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
  }, [state]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/auth/login");
        },
      });
    }
  }, [state]);

  return (
    <form action={trigger} className=" mt-14 space-y-2" noValidate>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="email" className="font-bold text-2xl">
          Email
        </label>

        <input
          type="email"
          id="email"
          placeholder="Email de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="email"
        />
      </div>

      <input
        type="submit"
        value="Enviar Instrucciones"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer "
      />
    </form>
  );
};
