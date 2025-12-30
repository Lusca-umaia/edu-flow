import React from "react";
import Table from "@/components/UI/Table";
import Link from "next/link";
import { Professor } from "@/@types/professor";

interface ProfessoresTableProps {
  professores: Professor[];
}

const headItems = [
  {
    name: "Nome",
    field: "nome",
    order: 1,
  },
  {
    name: "Email",
    field: "email",
    order: 2,
  },
  {
    name: "CPF",
    field: "cpf",
    order: 3,
  },
];

const ProfessoresTable: React.FC<ProfessoresTableProps> = ({ professores }) => {
  return (
    <React.Fragment>
      <Table.Root
        data={professores}
        emptyMessage="Sem professores cadastrados : ("
      >
        <Table.Head headItems={headItems} />
        {professores.map((professor: Professor) => (
          <Table.Body key={professor.id}>
            <Table.Row>
              {headItems.map((item) => (
                <Table.Item key={item.name}>
                  {professor[item.field as keyof Professor]}
                </Table.Item>
              ))}
              <Table.Item>
                <span className="flex items-center justify-end gap-2">
                  <Link
                    className="underline text-gray-500"
                    href={`/professor/${professor.id}`}
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

export default ProfessoresTable;
