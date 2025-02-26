"use client";

import { updateUser } from "@/src/actions/user/update-user";
import { User } from "@/src/types";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

type UpdateProfileFormProps = {
  user: User;
};

export const UpdateProfileForm = ({ user }: UpdateProfileFormProps) => {
  const [state, dispatch] = useFormState(updateUser, {
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
    }
  }, [state]);

  return (
    <>
      <form
        action={dispatch}
        className=" mt-14 space-y-5 max-w-lg mx-auto bg-gray-100 py-8 px-5 rounded"
        noValidate
      >
        <legend className="text-center text-lg text-slate-700 font-semibold ">
          Ingrese sus datos en el formulario
        </legend>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl">Nombre</label>
          <input
            type="name"
            placeholder="Tu Nombre"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="name"
            defaultValue={user?.name}
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Tu Email"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="email"
            defaultValue={user?.email}
          />
        </div>

        <input
          type="submit"
          value="Guardar Cambios"
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
};
