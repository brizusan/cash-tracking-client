import { Titulo } from "@/src/components";
import { Metadata } from "next";
import { FormRegister } from "./components/FormRegister";

export const metadata: Metadata = {
  title: "Register Page - CrashTracking",
  description: "Pagina de registro , formulario de registro",
  keywords: "registro, formulario, crashtracking",
};

export default function RegisterPage() {
  return (
    <>
      <Titulo title="Crear una cuenta" />
      <section className="mx-auto w-full md:w-1/2">
        <FormRegister />
      </section>
    </>
  );
}
