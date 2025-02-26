import { verifySession } from "@/src/auth/dal";
import { UpdateProfileForm } from "@/src/components";

export default async function SettingsPage() {
  const { user } = await verifySession();
  return (
    <>
      <h1 className="font-black text-4xl text-purple-950 mt-8 mb-1">
        Actualizar Perfil
      </h1>
      <p className="text-xl font-bold">
        Aquí puedes cambiar los datos de tu {""}
        <span className="text-amber-500">perfil</span>
      </p>

      <UpdateProfileForm user={user} />
    </>
  );
}
