"use client";
import { deleteExpense } from "@/src/actions/expense/delete-expense";
import { DialogTitle } from "@headlessui/react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { ErrorMessage } from "../ui/error-message/ErrorMessage";

type DeleteExpenseForm = {
  closeModal: () => void;
};

export const DeleteExpenseForm = ({ closeModal }: DeleteExpenseForm) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("deleteExpense")!;

  const deleteExpenseWithValues = deleteExpense.bind(null, {
    budgetId: +params.id,
    expenseId: +expenseId,
  });

  const [state, dispatch] = useFormState(deleteExpenseWithValues, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
      router.push(pathname);
    }
  }, [state]);

  useEffect(() => {
    if (!Number.isInteger(+expenseId) || !Number.isInteger(+params.id)) {
      closeModal();
    }
  }, [state]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Eliminar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Confirma para eliminar, {""}
        <span className="text-amber-500">el gasto</span>
      </p>
      <p className="text-gray-600 text-sm">
        (Un gasto eliminado no se puede recuperar)
      </p>

      <form action={dispatch} className="mt-5 space-y-5">
        {state.errors.length > 0 &&
          state.errors.map((error, index) => (
            <ErrorMessage key={index}>{error}</ErrorMessage>
          ))}
        <div className="flex flex-col gap-5">
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10">
          <button
            type="button"
            className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
          >
            Eliminar
          </button>
        </div>
      </form>
    </>
  );
};
