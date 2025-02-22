import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link className="relative block w-44 h-44 lg:w-72 lg:h-72 mx-auto" href="/">
      <Image fill src="/logo.svg" alt="logo" priority />
    </Link>
  );
};
