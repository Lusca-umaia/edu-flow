import { Disciplina } from "@/@types/disciplina";
import React from "react";
import Table from "@/components/UI/Table";
import { get } from "lodash";
import Link from "next/link";

interface DisciplinasTableProps {
  disciplinas: Disciplina[];
}

const headItems = [
  {
    name: "Nome",
    field: "nome",
    order: 1,
  },
  {
    name: "Professor",
    field: "professor.nome",
    order: 2,
  },
  {
    name: "Turma",
    field: "turma.nome",
    order: 3,
  },
];

const DisciplinasTable: React.FC<DisciplinasTableProps> = ({ disciplinas }) => {
  return (
    <React.Fragment>
      <Table.Root
        data={disciplinas}
        emptyMessage="Sem disciplinas cadastradas : ("
      >
        <Table.Head headItems={headItems} />
        {disciplinas.map((disciplina: Disciplina) => (
          <Table.Body key={disciplina.id}>
            <Table.Row>
              {headItems.map((item) => (
                <Table.Item key={item.name}>
                  {get(disciplina, item.field)}
                </Table.Item>
              ))}
              <Table.Item>
                <span className="flex items-center justify-end gap-2">
                  <Link
                    className="underline text-gray-500"
                    href={`/disciplina/${disciplina.id}`}
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

export default DisciplinasTable;
