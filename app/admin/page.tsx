import { BudgetItem, DeleteBudgetModal } from "@/src/components";
import { getBudgets } from "@/src/services/budgets";
import Link from "next/link";

export default async function AdminPage() {
  const budgets = await getBudgets();

  const isEmpty = budgets.length === 0;
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-purple-950 my-5">
            Mis Presupuestos
          </h1>
          <p className="text-xl font-bold">
            Maneja y administra tus {""}
            <span className="text-amber-500">presupuestos</span>
          </p>
        </div>
        <Link
          href={"/admin/budget/new"}
          className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Crear Presupuesto
        </Link>
      </div>

      {isEmpty && (
        <p className="text-2xl font-bold text-center mt-10">
          No tenemos presupuesto ingresados
        </p>
      )}

      {!isEmpty && (
        <section className="mt-10 ">
          <h2 className="text-xl font-bold text-center">
            Presupuesto Registrados
          </h2>
          <ul
            role="list"
            className="divide-y divide-gray-300 border shadow-lg mt-10 "
          >
            {budgets.map((budget) => (
              <BudgetItem key={budget.id} {...budget} />
            ))}
          </ul>

          <DeleteBudgetModal />
        </section>
      )}
    </>
  );
}
