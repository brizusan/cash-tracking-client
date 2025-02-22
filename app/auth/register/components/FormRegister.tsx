"use client";
import { createAccount } from "@/src/actions/create-account";
import { ErrorMessage, SuccessMessage } from "@/src/components";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

export const FormRegister = () => {
  const [state, dispatch] = useFormState(createAccount, {
    errors: [],
    success: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={dispatch}
      className={`${
        state.errors.length > 0 ? "space-y-3" : "space-y-5"
      } mt-14 `}
      noValidate
    >
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}
      {state.success && <SuccessMessage>{state.success}</SuccessMessage>}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="email">
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
        <label htmlFor="name" className="font-bold text-2xl">
          Nombre
        </label>
        <input
          type="name"
          placeholder="Nombre de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-bold text-2xl">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password"
        />
      </div>

      <div className="flex flex-col gap-2">
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
        value="Registrarme"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  );
};
