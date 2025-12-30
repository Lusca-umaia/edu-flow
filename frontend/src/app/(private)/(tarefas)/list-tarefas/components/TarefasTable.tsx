import React from "react";
import Table from "@/components/UI/Table";
import Link from "next/link";
import { Tarefa } from "@/@types/tarefa";
import { get } from "lodash";
import { parseDate } from "@/utils/auxiliars";

interface TarefasTableProps {
  tarefas: Tarefa[];
}

const headItems = [
  {
    name: "Nome",
    field: "nome",
    order: 1,
  },
  {
    name: "Turma",
    field: "turma.nome",
    order: 2,
  },
  {
    name: "Disciplina",
    field: "disciplina.nome",
    order: 3,
  },
];

const TarefasTable: React.FC<TarefasTableProps> = ({ tarefas }) => {
  return (
    <React.Fragment>
      <Table.Root data={tarefas} emptyMessage="Sem tarefas cadastrados : (">
        <Table.Head headItems={[...headItems, { order: 4, name: "Prazo" }]} />
        {tarefas.map((tarefa: Tarefa) => (
          <Table.Body key={tarefa.id}>
            <Table.Row>
              {headItems.map((item) => (
                <Table.Item key={item.name}>
                  {get(tarefa, item.field)}
                </Table.Item>
              ))}
              <Table.Item>
                {parseDate(tarefa.prazo).format("DD/MM/YYYY")}
              </Table.Item>
              <Table.Item>
                <span className="flex items-center justify-end gap-2">
                  <Link
                    className="underline text-gray-500"
                    href={`/tarefa-alunos/${tarefa.id}`}
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

export default TarefasTable;
