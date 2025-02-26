import { ChangePasswordForm } from "@/src/components";

export const metadata = {
  title: "Cambiar Password - CrashTracking",
  description: "Pagina de cambio de contraseña, formulario de cambio",
  keywords: "cambiar contraseña, formulario, actualizar, crashtracking",
};

export default function ChangePasswordPage() {
  return (
    <>
      <h1 className="font-black text-4xl text-purple-950 mt-8 mb-1">
        Cambiar Password
      </h1>
      <p className="text-xl font-bold">
        Aquí puedes cambiar tu {""}
        <span className="text-amber-500">password</span>
      </p>

      <ChangePasswordForm />
    </>
  );
}
