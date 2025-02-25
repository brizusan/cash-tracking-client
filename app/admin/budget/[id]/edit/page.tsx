import { getBudgetById } from "@/src/services/budgets";
import { Budget } from "@/src/types";
import { Metadata } from "next";
import Link from "next/link";
import { EditForm } from "./components/EditForm";

type Props = {
  params: Promise<{ id: Budget["id"] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const budget = await getBudgetById(id);
  return {
    title: ` ${budget.name} - CrashTracking`,
    description: `Editar presupuesto ${budget.name} , actualizar informacion`,
    keywords: "editar, presupuesto, crashtracking, update",
  };
}

export default async function BudgetEditPage({ params }: Props) {
  const id = (await params).id;
  const budget = await getBudgetById(id);

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
      <section className="p-10 mt-10  shadow-lg border ">
        <EditForm budget={budget} />
      </section>
    </>
  );
}
