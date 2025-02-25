import type { Expense } from "@/src/types";

type ExpenseFormProps = {
  expense?: Expense;
};

export const ExpenseForm = ({ expense }: ExpenseFormProps) => {
  return (
    <>
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Nombre del Gasto
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          type="text"
          placeholder="Nombre del gasto"
          name="name"
          defaultValue={expense?.name ? expense.name : ""}
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
          Cantidad de Gasto
        </label>
        <input
          type="number"
          id="amount"
          defaultValue={expense?.amount ? expense.amount : ""}
          className="w-full p-3  border border-gray-100 bg-slate-100"
          placeholder="Cantidad gasto"
          name="amount"
        />
      </div>
    </>
  );
};
