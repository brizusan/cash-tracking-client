import { verifySession } from "@/src/auth/dal";
import { ProfileTabs, ToastNotification } from "@/src/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Profile - CrashTracking",
  description:
    "Pagina de Profil,configuraciones de perfil, informacion de usuario",
};

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifySession();
  console.log(user);
  return (
    <>
      <ProfileTabs />
      {children}
      <ToastNotification />
    </>
  );
}
