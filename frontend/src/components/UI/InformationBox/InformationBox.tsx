import { classNames } from "@/utils/auxiliars";
import { ReactNode } from "react";

interface InformationBox {
  index: number;
  length: number;
  children: ReactNode;
}

export default function InformationBox({
  children,
  index,
  length,
}: InformationBox) {
  return (
    <div
      className={classNames(
        index == 0 ? "pb-6 pt-2" : "",
        index == length - 1 ? "pt-6 pb-6" : "",
        index != 0 && index != length - 1 ? "py-6" : "",
        "relative sm:items-center grid md:grid-cols-2 lg:grid-cols-3 sm:px-0"
      )}
    >
      {children}
    </div>
  );
}
