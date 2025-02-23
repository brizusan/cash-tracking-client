import { Metadata } from "next";
import Link from "next/link";
import { CreateForm } from "./components/CreateForm";

export const metadata: Metadata = {
  title: "Nuevo Presupuesto - CrashTracking",
  description: "Agregar presupuesto nuevo",
};

export default function NewBudgetPage() {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-purple-950 my-5">
            Nuevo Presupuesto
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
        <CreateForm />
      </section>
    </>
  );
}
