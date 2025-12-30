"use client";
import { useParams } from "next/navigation";
import InformationBox from "@/components/UI/InformationBox/InformationBox";
import Loading from "@/components/UI/Loading/Loading";
import { useFetch } from "@/hooks/useFetch";
import Header from "@/components/UI/Header/Header";
import React from "react";
import {
  getTarefaAluno,
  TarefaAlunoResponse,
} from "@/services/tarefa/getTarefaAluno";
import { get } from "lodash";
import {
  CARD_STATUS_INFORMATION,
  STATUS_KEYS,
} from "@/components/home/TarefaCard/TarefaCard";
import { classNames, parseDate } from "@/utils/auxiliars";
import Feedback from "./components/Feedback";
import { useUsuarioContext } from "@/context/UserContext/UserContext";
import { ROLE } from "@/@types/user";

const fields = [
  {
    label: "Nome aluno",
    field: "aluno.nome",
  },
  {
    label: "Nome da tarefa",
    field: "tarefa.nome",
  },
  {
    label: "Prazo da tarefa",
    field: "tarefa.prazo",
  },
  {
    label: "Data da entrega:",
    field: "tarefa.entregue_em",
  },
  {
    label: "Descrição da tarefa",
    field: "tarefa.descricao",
  },
  {
    label: "Feedback da tarefa",
    field: "tarefa.feedback",
  },
];

export default function TarefaAluno() {
  const params = useParams();

  const { user } = useUsuarioContext();

  const { tarefaId, alunoId } = params;
  const isProfessor = user?.role === ROLE.PROFESSOR;

  const route = isProfessor
    ? `/tarefa-alunos/${tarefaId}`
    : `/acompanhamento-tarefas`;

  const {
    data: tarefaAluno,
    loading: tarefaIsLoading,
    error: errorInDisciplina,
  } = useFetch<TarefaAlunoResponse>({
    fetchFn: async () =>
      await getTarefaAluno({
        tarefaId: tarefaId as string,
        alunoId: alunoId as string,
      }),
  });

  const error = errorInDisciplina;

  const loadingData = tarefaIsLoading;

  if (loadingData) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}</p>;
  }

  const customizedTreatment: Record<string, (value: string) => string> = {
    ["tarefa.entregue_em"]: (date: string) =>
      parseDate(date).format("DD/MM/YYYY"),
    ["tarefa.prazo"]: (date: string) => parseDate(date).format("DD/MM/YYYY"),
  };

  return (
    <div>
      <Header backPath={route} title="Informações da tarefa" />
      <div className="space-y-6">
        <div className="animate-appearance space-y-12 divide-y divide-gray-900/10">
          <div>
            <div className="bg-white shadow-md p-4 rounded-lg">
              <dl className="divide-y divide-gray-200">
                {fields.map((field, index) => (
                  <React.Fragment key={field.field}>
                    {get(tarefaAluno, field.field) && (
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
                                get(tarefaAluno, field.field)
                              )
                            : get(tarefaAluno, field.field)}
                        </dd>
                      </InformationBox>
                    )}
                  </React.Fragment>
                ))}
                <InformationBox
                  index={fields.length + 1}
                  length={fields.length}
                >
                  <dt className=" flex gap-1 items-center text-sm font-semibold leading-6 text-gray-900">
                    <span>
                      Status
                      <span className="md:hidden">:</span>
                    </span>
                  </dt>
                  <dd className="text-sm leading-6 font-medium text-gray-700 sm:col-span-1">
                    <span
                      className={classNames(
                        tarefaAluno?.tarefa.status === STATUS_KEYS.CONCLUIDA
                          ? "bg-green-600 text-white"
                          : "",
                        tarefaAluno?.tarefa.status === STATUS_KEYS.PENDENTE
                          ? "text-gray-900 ring-1 ring-inset ring-gray-200"
                          : "",
                        tarefaAluno?.tarefa.status === STATUS_KEYS.ATRASADA
                          ? "bg-red-600 text-white"
                          : "",
                        "whitespace-nowrap w-fit leading-0 flex justify-center items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium"
                      )}
                    >
                      {CARD_STATUS_INFORMATION[tarefaAluno!.tarefa.status].icon}
                      {
                        CARD_STATUS_INFORMATION[tarefaAluno!.tarefa.status]
                          .label
                      }
                    </span>
                  </dd>
                </InformationBox>
              </dl>
            </div>
          </div>
        </div>
        {!tarefaAluno?.tarefa.feedback && isProfessor && (
          <Feedback alunoId={alunoId as string} tarefaId={tarefaId as string} />
        )}
      </div>
    </div>
  );
}
