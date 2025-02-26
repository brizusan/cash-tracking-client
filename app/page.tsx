import { ItemAccordion, Logo } from "@/src/components";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bienvenido  - CrashTracking",
  description:
    "Crashtracking , te ayudara a controlar mejor tus finanzas , gastos , tu sistema de confianza ",
  keywords: ["finanzas", "gastos", "presupuestos", "Sistema"],
};

export default function HomePage() {
  const ItemsAccordion = [
    {
      id: 1,
      title: "Organización sin esfuerzo",
      content:
        "Visualiza y clasifica tus gastos de forma clara con un panel intuitivo y fácil de usar",
    },
    {
      id: 2,
      title: "Presupuestos inteligentes",
      content:
        "Define metas financieras realistas y haz seguimiento con herramientas avanzadas de presupuestación.",
    },
    {
      id: 3,
      title: "Acceso desde cualquier lugar",
      content:
        "Gestiona tus finanzas en todo momento desde cualquier dispositivo.",
    },
    {
      id: 4,
      title: "Máxima seguridad",
      content:
        "Tus datos están protegidos con los más altos estándares de seguridad.",
    },
  ];
  return (
    <>
      <header className=" bg-purple-950 py-5">
        <div className="max-w-3xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="w-80 lg:w-[500px]">
            <Logo isHome={true} />
          </div>
          <nav className="flex flex-col lg:flex-row lg:justify-end gap-5 w-full ">
            <Link
              href={"/auth/login"}
              className="font-bold text-white hover:text-amber-500 uppercase text-sm text-center"
            >
              Iniciar Sesión
            </Link>
            <Link
              href={"/auth/register"}
              className="font-bold text-white hover:text-amber-500 uppercase text-sm text-center"
            >
              Crear Cuenta
            </Link>
          </nav>
        </div>
      </header>

      <main className=" max-w-3xl mx-auto p-5 space-y-5 mt-20">
        <h1 className="font-black text-3xl lg:text-5xl text-purple-800">
          Administrador de Gastos
        </h1>
        <p className="text-2xl font-bold">
          Controla o gestiona tus{" "}
          <span className="text-amber-500">finanzas</span>
        </p>

        <p className="text-lg">
          Simplifica la gestión de tus ingresos y gastos con nuestro{" "}
          <strong>Administrador de Gastos</strong>. Organiza tus finanzas de
          manera intuitiva y eficiente, ya sea para uso personal o empresarial.
          Toma el control total con una plataforma fácil de usar.
        </p>

        <h2 className="font-black text-2xl pt-8 text-center text-purple-950">
          ¿Por qué elegir CashTrackr?
        </h2>

        <div className="space-y-2">
          {ItemsAccordion.map((info) => (
            <ItemAccordion key={info.id} {...info} />
          ))}
        </div>
      </main>

      <footer>
        <nav className="flex flex-col lg:flex-row lg:justify-between gap-5 mt-10 pb-20 max-w-3xl mx-auto ">
          <Link
            href="/auth/register"
            className="text-gray-500 text-sm uppercase text-center"
          >
            ¿No tienes cuenta? Crea una
          </Link>
          <Link
            href="/auth/login"
            className="text-gray-500 text-sm uppercase text-center"
          >
            ¿Ya tienes cuenta? Iniciar Sesión
          </Link>
        </nav>
      </footer>
    </>
  );
}
