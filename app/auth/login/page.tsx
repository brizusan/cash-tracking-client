import { Titulo } from "@/src/components";
import { Metadata } from "next";
import { FormLogin } from "./components/FormLogin";

export const metadata: Metadata = {
  title: "Login Page - CrashTracking",
  description: "Pagina de inicio de sesion, formulario de acceso",
  keywords: "iniciar sesion, formulario, crashtracking",
};

export default function LoginPage() {
  return (
    <>
      <Titulo title="Inicia Sesión" />
      <section className="mx-auto w-full md:w-1/2">
        <FormLogin />
      </section>
    </>
  );
}
