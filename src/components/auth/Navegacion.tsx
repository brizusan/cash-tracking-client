"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    href: "/auth/login",
    title: "Iniciar Sesión",
  },
  {
    href: "/auth/register",
    title: "Registrarse",
  },
  {
    href: "/auth/forgot-password",
    title: "¿Olvidaste tu contraseña?",
  },
];

export const Navegacion = () => {
  const pathname = usePathname();

  if (
    pathname === "/auth/confirm-account" ||
    pathname === "/auth/confirm-password"
  ) {
    return null;
  }

  return (
    <nav className="flex justify-evenly gap-4 py-8">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={` ${
            pathname === route.href ? "hidden" : "block"
          } text-sm font-semibold  text-slate-400 hover:text-amber-500 transition-colors`}
        >
          {route.title}
        </Link>
      ))}
    </nav>
  );
};
