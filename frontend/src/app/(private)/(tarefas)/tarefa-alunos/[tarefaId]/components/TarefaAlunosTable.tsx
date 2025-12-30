import React from "react";
import Table from "@/components/UI/Table";
import Link from "next/link";
import { TarefaAlunos } from "@/@types/tarefa";
import {
  CARD_STATUS_INFORMATION,
  STATUS_KEYS,
} from "@/components/home/TarefaCard/TarefaCard";
import { classNames } from "@/utils/auxiliars";

interface TarefaAlunosTableProps {
  tarefaAlunos: TarefaAlunos;
}

const headItems = [
  {
    name: "Nome do Aluno",
    field: "aluno.nome",
    order: 1,
  },
  {
    name: "Turma",
    field: "turma",
    order: 2,
  },
  {
    name: "Disciplina",
    field: "disciplina",
    order: 3,
  },
  {
    name: "Status",
    field: "status",
    order: 4,
  },
];

const TarefaAlunosTable: React.FC<TarefaAlunosTableProps> = ({
  tarefaAlunos,
}) => {
  return (
    <React.Fragment>
      <Table.Root
        data={tarefaAlunos.alunos}
        emptyMessage="Sem alunos associados a esse tarefa : ("
      >
        <Table.Head headItems={headItems} />
        {tarefaAlunos.alunos.map((aluno: TarefaAlunos["alunos"][number]) => (
          <Table.Body key={aluno.id}>
            <Table.Row>
              <Table.Item>{aluno.nome}</Table.Item>
              <Table.Item>{tarefaAlunos.turma.nome}</Table.Item>
              <Table.Item>{tarefaAlunos.disciplina.nome}</Table.Item>
              <Table.Item>
                <span
                  className={classNames(
                    aluno.status === STATUS_KEYS.CONCLUIDA
                      ? "bg-green-600 text-white"
                      : "",
                    aluno.status === STATUS_KEYS.PENDENTE
                      ? "text-gray-900 ring-1 ring-inset ring-gray-200"
                      : "",
                    aluno.status === STATUS_KEYS.ATRASADA
                      ? "bg-red-600 text-white"
                      : "",
                    "whitespace-nowrap w-fit leading-0 flex justify-center items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium"
                  )}
                >
                  {CARD_STATUS_INFORMATION[aluno.status].icon}
                  {CARD_STATUS_INFORMATION[aluno.status].label}
                </span>
              </Table.Item>
              <Table.Item>
                <span className="flex items-center justify-end gap-2">
                  <Link
                    className="underline text-gray-500"
                    href={`/tarefa-aluno/${tarefaAlunos.id}/${aluno.id}`}
                  >
                    Visualizar
                  </Link>
                </span>
              </Table.Item>
            </Table.Row>
          </Table.Body>
        ))}
      </Table.Root>
    </React.Fragment>
  );
};

export default TarefaAlunosTable;
