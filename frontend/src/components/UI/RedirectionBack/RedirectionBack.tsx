import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function RedirectionBack({ hrefBack }: { hrefBack: string }) {
  return (
    <Link
      href={hrefBack}
      className="text-xs flex w-fit gap-0.5 items-center leading-0 text-gray-600 font-semibold"
    >
      <MdKeyboardArrowLeft className=" -mx-1.5 text-2xl" />
      Voltar
    </Link>
  );
}
