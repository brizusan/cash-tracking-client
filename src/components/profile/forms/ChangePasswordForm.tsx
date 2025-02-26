"use client";

import { updatePassword } from "@/src/actions/password/update-password";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export const ChangePasswordForm = () => {
  const router = useRouter();
  const [state, dispatch] = useFormState(updatePassword, {
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
      toast.success(state.success);
      router.push("/admin/profile/settings");
    }
  }, [state]);

  return (
    <>
      <form
        action={dispatch}
        className=" mt-14 space-y-5 bg-gray-100 px-5 py-8 rounded  max-w-lg mx-auto"
        noValidate
      >
        <legend className="text-center text-lg text-slate-700 font-semibold ">
          Ingrese sus datos en el formulario
        </legend>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl" htmlFor="current_password">
            Password Actual
          </label>
          <input
            id="current_password"
            type="password"
            placeholder="Password Actual"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="current_password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl" htmlFor="password">
            Nuevo Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="password_confirmation" className="font-bold text-2xl">
            Repetir Password
          </label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password_confirmation"
          />
        </div>

        <input
          type="submit"
          value="Cambiar Password"
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
};
