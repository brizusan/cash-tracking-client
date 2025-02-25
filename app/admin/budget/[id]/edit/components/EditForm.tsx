"use client";
import { updateBudget } from "@/src/actions/budget/update-budget";
import { BudgetForm, ErrorMessage } from "@/src/components";
import type { Budget } from "@/src/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export const EditForm = ({ budget }: { budget: Budget }) => {
  const router = useRouter();
  const [state, dispatch] = useFormState(updateBudget, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/admin");
        },
      });
    }
  }, [state]);

  return (
    <>
      <form
        action={dispatch}
        className={`${
          state.errors.length > 0 || state.success ? "mt-0" : "mt-8"
        } space-y-3 max-w-lg mx-auto`}
        noValidate
      >
        {state.errors.map((error, index) => (
          <ErrorMessage key={index}>{error}</ErrorMessage>
        ))}

        <legend className="text-2xl font-bold pb-5">
          Actualizar informacion
        </legend>
        <BudgetForm {...budget} />
        <input type="hidden" name="id" defaultValue={budget.id} hidden />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Guardar Cambios"
        />
      </form>
    </>
  );
};
