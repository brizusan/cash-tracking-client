import getToken from "@/src/auth/token";
import { Budget } from "@/src/types";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getBudgetById(id: Budget["id"]): Promise<Budget> {
  const res = await fetch(`${process.env.API_URL}/budgets/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) return notFound();
  const data = await res.json();
  return data.budget;
}

export default async function BudgetEditPage({
  params,
}: {
  params: { id: Budget["id"] };
}) {
  const budget = await getBudgetById(params.id);
  console.log(budget);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-purple-950 my-5">
            Editar Presupuesto: {budget.name}{" "}
          </h1>
          <p className="text-xl font-bold">
            Llena el formulario y crea un nuevo {""}
            <span className="text-amber-500">presupuesto</span>
          </p>
        </div>
        <Link
          href={"/admin"}
          className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Volver
        </Link>
      </div>
      <div className="p-10 mt-10  shadow-lg border "></div>
    </>
  );
}
