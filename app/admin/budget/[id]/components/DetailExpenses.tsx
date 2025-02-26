import { ExpenseGrafic } from "@/src/components";
import { Budget, BudgetResponse } from "@/src/types";
import { formatCurrency } from "@/src/utils";

type Props = {
  totalBudget: Budget["amount"];
  expenses: BudgetResponse["expenses"];
};

export const DetailExpenses = ({ totalBudget, expenses }: Props) => {
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + Number(expense.amount),
    0
  );

  const percentage = ((totalExpenses / totalBudget) * 100).toFixed(2);
  const percentageNumber = Math.round(Number(percentage));
  const remainingBudget = totalBudget - totalExpenses;

  return (
    <section className="my-10 flex flex-col lg:flex-row lg:justify-center py-6  items-center gap-4 lg:gap-10 border">
      <div className="relative w-60 h-60 mx-auto md:mx-0">
        <ExpenseGrafic percentage={+percentageNumber} />
      </div>
      <div className="space-y-3 text-center">
        <h3 className="text-xl font-semibold text-slate-800">
          Detalles de los gastos Realizados
        </h3>
        <p className="font-semibold text-slate-700">
          Monto de presupuesto :{" "}
          <span className="text-slate-600 font-light">
            {formatCurrency(+totalBudget)}
          </span>
        </p>
        <p className="font-semibold text-slate-700">
          Monto gastado :{" "}
          <span className="text-slate-600 font-light">
            {formatCurrency(totalExpenses)}
          </span>
        </p>
        <p className="font-semibold text-slate-700">
          Monto restante :
          <span
            className={`${
              percentageNumber >= 90
                ? "bg-red-200 text-red-400 px-1"
                : "text-slate-600"
            } font-light`}
          >
            {formatCurrency(remainingBudget)}
          </span>{" "}
        </p>
      </div>
    </section>
  );
};
