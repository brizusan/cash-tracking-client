import { PasswordResetHandler } from "./components/PasswordResetHandler";

export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="font-black text-4xl lg:text-center text-purple-950">
        Reestablecer Password
      </h1>
      <p className="text-xl lg:text-center font-bold">
        Ingresa el código que recibiste
        <span className="text-amber-500"> por email</span>
      </p>

      <section className="mx-auto w-full md:w-1/2">
        <PasswordResetHandler />
      </section>
    </>
  );
}
