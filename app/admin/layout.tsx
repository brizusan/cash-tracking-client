import { verifySession } from "@/src/auth/dal";
import { Logo, MenuAdmin, ToastNotification } from "@/src/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Page - CrashTracking",
  description:
    "Pagina de admin, contenido de adminstracion de presupuestos, usuarios, etc",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifySession();
  return (
    <>
      <header className="bg-purple-950 py-5">
        <div className="max-w-5xl  mx-auto flex flex-col lg:flex-row justify-between items-center">
          <Logo isAdmin={true} />
          <MenuAdmin user={user} />
        </div>
      </header>
      <section className="max-w-5xl mx-auto mt-12 p-3 py-10">
        {children}
      </section>
      <ToastNotification />

      <footer className="py-5">
        <p className="text-center">
          Todos los Derechos Reservados {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
