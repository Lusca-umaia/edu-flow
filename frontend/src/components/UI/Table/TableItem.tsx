import { ReactNode } from "react";

export default function TableItem({ children }: { children: ReactNode }) {
  return (
    <td className="whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-800 ">
      {children}
    </td>
  );
}
