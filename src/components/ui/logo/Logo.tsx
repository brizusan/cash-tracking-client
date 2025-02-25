import Image from "next/image";
import Link from "next/link";

export const Logo = ({ isAdmin }: { isAdmin?: boolean }) => {
  return (
    <Link
      className={`${
        isAdmin ? "mx-0 lg:w-80 h-32 lg:h-52" : "mx-auto lg:w-72 lg:h-72 h-44"
      } relative  block w-60  `}
      href={isAdmin ? "/admin" : "/"}
    >
      <Image fill src="/logo.svg" alt="logo" priority />
    </Link>
  );
};
