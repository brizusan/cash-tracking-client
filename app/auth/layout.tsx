import { Logo, Navegacion, ToastNotification } from "@/src/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Page - CrashTracking",
  description: "Contenido de las paginas de autenticacion",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=" w-full h-screen lg:flex lg:justify-center">
        <aside className="lg:w-1/2 lg:h-screen bg-indigo-500 lg:bg-indigo-800 bg-cover">
          <Logo />
        </aside>
        <main className="lg:w-1/2 w-11/12 mx-auto h-full py-8 md:pt-16 lg:pt-24 lg:overflow-y-auto">
          {children}
          <Navegacion />
        </main>
      </div>

      <ToastNotification />
    </>
  );
}
