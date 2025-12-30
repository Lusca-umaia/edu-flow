"use client";
import { RiProgress2Line } from "react-icons/ri";
import { MdOutlineDoneAll } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdAssignmentLate } from "react-icons/md";
import { classNames, parseDate } from "@/utils/auxiliars";
import Link from "next/link";

export const STATUS_KEYS = {
  PENDENTE: "PENDENTE",
  CONCLUIDA: "CONCLUIDA",
  ATRASADA: "ATRASADA",
} as const;

interface DisciplineCardProps {
  nome: string;
  prazo: string;
  alunoId: number;
  id: number;
  status: keyof typeof STATUS_KEYS;
}

export const CARD_STATUS_INFORMATION = {
  [STATUS_KEYS.CONCLUIDA]: {
    label: "Concluída",
    icon: <MdOutlineDoneAll className="text-xl text-muted-foreground" />,
  },
  [STATUS_KEYS.ATRASADA]: {
    label: "Atrasada",
    icon: <MdAssignmentLate className="text-xl text-muted-foreground" />,
  },
  [STATUS_KEYS.PENDENTE]: {
    label: "Pendente",
    icon: <RiProgress2Line className="text-xl text-muted-foreground" />,
  },
};

const TarefaCard: React.FC<DisciplineCardProps> = ({
  nome,
  id,
  status,
  prazo,
  alunoId,
}) => {
  const { icon, label } = CARD_STATUS_INFORMATION[status];

  return (
    <Link href={`/tarefa-aluno/${id}/${alunoId}`}>
      <div className="bg-white border border-gray-100 flex items-center max-md:space-y-4 rounded-2xl space-y-2 shadow-md p-4 cursor-pointer hover:opacity-85 duration-200 hover:scale-[101%]">
        <span className="justify-between max-md:flex-col flex w-full max-md:gap-4 md:items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={classNames(
                status === STATUS_KEYS.CONCLUIDA ? "bg-green-600" : "",
                status === STATUS_KEYS.ATRASADA ? "bg-red-600" : "",
                status === STATUS_KEYS.PENDENTE ? "bg-black" : "",
                "aspect-square rounded-full h-max p-3 flex items-center justify-center"
              )}
            >
              <FaTasks className="text-xl text-white" />
            </div>
            <div className="flex flex-col">
              <h3
                title={nome}
                className="line-clamp-1 max-lg:text-base text-sm font-bold leading-none tracking-tight"
              >
                {nome}
              </h3>
              <span className="text-sm font-medium text-gray-500">
                Matemática
              </span>
            </div>
          </div>
          <div className="flex max-lg:flex-col justify-center gap-2">
            {status !== STATUS_KEYS.CONCLUIDA && (
              <span className="whitespace-nowrap leading-0 flex justify-center items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                <FaRegCalendarAlt className="text-lg text-muted-foreground" />
                {parseDate(prazo).format("DD/MM/YYYY")}
              </span>
            )}
            <span
              className={classNames(
                status === STATUS_KEYS.CONCLUIDA
                  ? "bg-green-600 text-white"
                  : "",
                status === STATUS_KEYS.PENDENTE
                  ? "text-gray-900 ring-1 ring-inset ring-gray-200"
                  : "",
                status === STATUS_KEYS.ATRASADA ? "bg-red-600 text-white" : "",
                "whitespace-nowrap leading-0 flex justify-center items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium"
              )}
            >
              {icon}
              {label}
            </span>
          </div>
        </span>
      </div>
    </Link>
  );
};

export default TarefaCard;
