import React from "react";
import Table from "@/components/UI/Table";
import Link from "next/link";
import { Turma } from "@/@types/turma";

interface TurmasTableProps {
  turmas: Turma[];
}

const headItems = [
  {
    name: "Nome",
    field: "nome",
    order: 1,
  },
];

const TurmasTable: React.FC<TurmasTableProps> = ({ turmas }) => {
  return (
    <React.Fragment>
      <Table.Root data={turmas} emptyMessage="Sem turmas cadastradas : (">
        <Table.Head headItems={headItems} />
        {turmas.map((turma: Turma) => (
          <Table.Body key={turma.id}>
            <Table.Row>
              {headItems.map((item) => (
                <Table.Item key={item.name}>
                  {turma[item.field as keyof Turma]}
                </Table.Item>
              ))}
              <Table.Item>
                <span className="flex items-center justify-end gap-2">
                  <Link
                    className="underline text-gray-500"
                    href={`/turma/${turma.id}`}
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

export default TurmasTable;
