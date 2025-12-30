"use client";
import { usePathname } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { capitalizeFirstLetter, classNames } from "@/utils/auxiliars";
import { Route } from "./Navbar";
import { useUsuarioContext } from "@/context/UserContext/UserContext";
import { logout } from "@/services/authService";

interface NavbarDescktopProps {
  options: Route[];
}

export default function NavbarDescktop({ options }: NavbarDescktopProps) {
  const { user } = useUsuarioContext();

  const pathname = usePathname();

  const getFirstPath = () => {
    return "/" + pathname.split("/")[1];
  };

  return (
    <nav className="flex max-lg:hidden sticky top-0 bg-white h-screen flex-col min-w-72 max-w-72 gap-4 p-2">
      <Image
        src={"/logo.png"}
        className="w-8/12 mt-2 mx-auto h-auto"
        width={1000}
        height={1000}
        quality={100}
        alt="Logo"
      />
      <div className=" flex gap-2 border border-gray-100 rounded-full shadow-lg p-3">
        <div className="aspect-square h-full rounded-full bg-gray-200"></div>
        {user && (
          <div className="flex flex-col">
            <p className="font-semibold text-sm">{user.nome}</p>
            <span className="text-xs bg-gray-100 w-fit px-2 py-0.5 rounded-sm">
              {capitalizeFirstLetter(user.role)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col overflow-auto gap-2">
        {options.map((option) => (
          <Link
            key={option.path}
            href={`${option.path}`}
            className={classNames(
              option.path.includes(getFirstPath()) ? "bg-black text-white" : "",
              "text-2xl flex gap-2 text-black justify-start hover:text-white hover:bg-black duration-200 w-full items-center px-3 py-2 rounded-full"
            )}
          >
            {option.icon}
            <span className="text-sm font-semibold">{option.name}</span>
          </Link>
        ))}
      </div>
      <div className="mt-auto">
        <Link href={"/"} onClick={logout} className="flex gap-1 items-center">
          <HiOutlineLogout className="text-2xl" />
          <span className="text-sm font-semibold">Sair</span>
        </Link>
      </div>
    </nav>
  );
}
