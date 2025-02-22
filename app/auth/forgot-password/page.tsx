import { Titulo } from "@/src/components";
import { Metadata } from "next";
import { FormPassword } from "./components/FormPassword";

export const metadata: Metadata = {
  title: "Olvidaste tu contraseña - CrashTracking",
  description: "Pagina de olvido de contraseña, formulario de recuperacion",
  keywords: "olvide contraseña, formulario, crashtracking",
};

export default function ForgotPage() {
  return (
    <>
      <Titulo title="¿Olvidaste tu contraseña?" subtitle={true} />
      <section className="mx-auto w-full md:w-1/2">
        <FormPassword />
      </section>
    </>
  );
}
