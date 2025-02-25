"use client";
import { updateExpense } from "@/src/actions/expense/update-expense";
import { ErrorMessage, ExpenseForm } from "@/src/components";
import type { Expense } from "@/src/types";
import { DialogTitle } from "@headlessui/react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

type EditExpenseForm = {
  closeModal: () => void;
};

export const EditExpenseForm = ({ closeModal }: EditExpenseForm) => {
  const [expense, setExpense] = useState<Expense>();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const budgetId = params.id;
  const searchParams = useSearchParams();
  const editExpenseId = searchParams.get("editExpense")!;

  const updateExpenseWithValues = updateExpense.bind(null, {
    budgetId: +budgetId,
    expenseId: +editExpenseId,
  });

  const [state, dispatch] = useFormState(updateExpenseWithValues, {
    errors: [],
    success: "",
  });

  const getExpenseById = async () => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${editExpenseId}`;
    const res = await fetch(url);
    const data = await res.json();
    setExpense(data);
  };

  useEffect(() => {
    getExpenseById();
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
      router.push(pathname);
    }
  }, [state.success]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Editar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">
        Llena el formulario y actualiza un {""}
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
        <ExpenseForm expense={expense} />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3  text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Actualizar Gasto"
        />
      </form>
    </>
  );
};
