import {
  AddExpenseButton,
  ExpenseItem,
  ModalContainer,
} from "@/src/components";
import { getBudgetById } from "@/src/services/budgets";
import { Budget } from "@/src/types";
import { Metadata } from "next";
import { DetailExpenses } from "./components/DetailExpenses";

type Props = { params: { id: Budget["id"] } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const budget = await getBudgetById(id);
  return {
    title: ` ${budget.name} - CrashTracking`,
    description: `Administra tus gastos ${budget.name} ,detalles de presupuesto`,
    keywords: " presupuesto, detalles, informacion , crashtracking",
  };
}

export default async function BudgetPage({ params }: Props) {
  const id = params.id;
  const budget = await getBudgetById(id);

  const isEmpty = budget.expenses.length === 0;

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center">
        <div>
          <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
          <p className="text-xl font-bold">
            Administra tus {""} <span className="text-amber-500">gastos</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>

      <section className="mt-10 ">
        <h2 className="text-xl font-bold text-center">
          Detalles de los gastos
        </h2>

        <DetailExpenses
          totalBudget={budget.amount}
          expenses={budget.expenses}
        />

        {isEmpty && (
          <p className="text-2xl font-bold text-center mt-10">
            No tenemos gastos ingresados
          </p>
        )}

        {!isEmpty && (
          <>
            <h2 className="text-xl font-bold text-center">Listado de gastos</h2>

            <ul
              role="list"
              className="divide-y divide-gray-300 border shadow-lg mt-10 "
            >
              {budget.expenses.map((expense) => (
                <ExpenseItem key={expense.id} {...expense} />
              ))}
            </ul>
          </>
        )}
      </section>

      <ModalContainer />
    </>
  );
}
