"use client";
import { createExpense } from "@/src/actions/expense/create-expense";
import { ErrorMessage } from "@/src/components";
import { DialogTitle } from "@headlessui/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { ExpenseForm } from "./ExpenseForm";

export const NewExpenseForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { id } = useParams();

  const ExpenseWithBudgetId = createExpense.bind(null, +id);

  const [state, dispatch] = useFormState(ExpenseWithBudgetId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      router.push(pathname);
    }
  }, [state]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">
        Llena el formulario y crea un {""}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        action={dispatch}
        className=" shadow-lg rounded-lg p-10 mt-10 space-y-4 border"
        noValidate
      >
        <legend className="text-center text-lg font-semibold text-slate-800">
          Informacion del Gasto
        </legend>
        {state.errors.length > 0 &&
          state.errors.map((error, index) => (
            <ErrorMessage key={index}>{error}</ErrorMessage>
          ))}
        <ExpenseForm />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3  text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Registrar Gasto"
        />
      </form>
    </>
  );
};
