import getToken from "@/src/auth/token";
import { BudgetItem } from "@/src/components";
import { ArrayBudgetSchema, type Budget } from "@/src/types";
import Link from "next/link";

async function getBudgets(): Promise<Budget[]> {
  const token = getToken();
  const res = await fetch(`${process.env.API_URL}/budgets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  const result = ArrayBudgetSchema.safeParse(data.budgets);
  if (!result.success) return [];
  return result.data;
}

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
        </section>
      )}
    </>
  );
}
