"use client";

import Header from "@/components/UI/Header/Header";
import { useParams } from "next/navigation";
import React from "react";
import Loading from "@/components/UI/Loading/Loading";

import { useFetch } from "@/hooks/useFetch";
import TarefaAlunosTable from "./components/TarefaAlunosTable";
import { TarefaAlunos } from "@/@types/tarefa";
import { getTarefaAlunos } from "@/services/tarefa/getTarefaAlunos";
import InformationBox from "@/components/UI/InformationBox/InformationBox";
import { get } from "lodash";
import { parseDate } from "@/utils/auxiliars";

const fields = [
  {
    label: "Nome da tarefa",
    field: "nome",
  },
  {
    label: "Prazo da tarefa",
    field: "prazo",
  },
  {
    label: "Descrição da tarefa",
    field: "descricao",
  },
];

export default function ListTarefaAlunos() {
  const params = useParams();
  const { tarefaId } = params;

  const {
    data: tarefaAlunos,
    loading,
    error,
  } = useFetch<TarefaAlunos>({
    fetchFn: async () =>
      await getTarefaAlunos({ tarefaId: tarefaId as string }),
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}</p>;
  }

  const customizedTreatment: Record<string, (value: string) => string> = {
    prazo: (date: string) => parseDate(date).format("DD/MM/YYYY"),
  };

  return (
    <div>
      <Header
        backPath="/list-tarefas"
        title={`Informações da tarefa`}
        description={`Gerencia a tarefa dos alunos!`}
      />
      <div className="space-y-6">
        <div className="animate-appearance space-y-12 divide-y divide-gray-900/10">
          <div>
            <div className="bg-white shadow-md p-4 rounded-lg">
              <dl className="divide-y divide-gray-200">
                {fields.map((field, index) => (
                  <React.Fragment key={field.field}>
                    {get(tarefaAlunos, field.field) && (
                      <InformationBox
                        index={index + 1}
                        key={field.field}
                        length={fields.length}
                      >
                        <dt className=" flex gap-1 items-center text-sm font-semibold leading-6 text-gray-900">
                          <span>
                            {field.label}
                            <span className="md:hidden">:</span>
                          </span>
                        </dt>
                        <dd className="text-sm leading-6 font-medium text-gray-700 sm:col-span-1">
                          {customizedTreatment[field.field]
                            ? customizedTreatment[field.field](
                                get(tarefaAlunos, field.field)
                              )
                            : get(tarefaAlunos, field.field)}
                        </dd>
                      </InformationBox>
                    )}
                  </React.Fragment>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-xl mt-4 max-md:text-lg font-bold text-gray-900 sm:text-xl sm:tracking-tight">
        Listagem dos alunos associados à tarefa
      </h3>
      <TarefaAlunosTable tarefaAlunos={tarefaAlunos!} />
    </div>
  );
}
