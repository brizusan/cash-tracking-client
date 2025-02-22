import { Titulo } from "@/src/components";
import { FormConfirm } from "./components/FormConfirm";

export default function ConfirmPage() {
  return (
    <>
      <Titulo title="¿Confirmar Cuenta?" />
      <section className="mx-auto w-full md:w-1/2">
        <FormConfirm />
      </section>
    </>
  );
}
