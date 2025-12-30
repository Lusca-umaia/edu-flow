"use client";
import Header from "@/components/UI/Header/Header";
import StatCard from "@/components/StatCard/StatCard";
import { GoGoal } from "react-icons/go";
import { RiProgress2Line } from "react-icons/ri";

import { LuTrendingUp } from "react-icons/lu";
import { LuBookCheck } from "react-icons/lu";
import { MdAssignmentLate } from "react-icons/md";
import clsx from "clsx";
import { useState } from "react";
import TarefaCard from "@/components/home/TarefaCard/TarefaCard";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading/Loading";
import {
  GetTarefasAlunoResponse,
  getTarefasAlunos,
} from "@/services/tarefa/getTarefasAluno";
import EmptyState from "@/components/UI/EmptyState/EmptyState";
import { useUsuarioContext } from "@/context/UserContext/UserContext";

const TABS_KEYS = {
  GERAL: "GERAL",
  CONCLUIDAS: "CONCLUIDAS",
  PENDENTES: "PENDENTES",
  ATRASADAS: "ATRASADAS",
} as const;

const TABS = [
  {
    label: "Visão geral",
    key: TABS_KEYS.GERAL,
  },
  {
    label: "Concluídas",
    key: TABS_KEYS.CONCLUIDAS,
  },
  {
    label: "Pendentes",
    key: TABS_KEYS.PENDENTES,
  },
  {
    label: "Atrasadas",
    key: TABS_KEYS.ATRASADAS,
  },
];

const AcompanhamentoTarefas = () => {
  const { user } = useUsuarioContext();

  const [currentTab, setCurrentTab] = useState<keyof typeof TABS_KEYS>(
    TABS_KEYS.GERAL
  );

  const { data, loading, error } = useFetch<GetTarefasAlunoResponse>({
    fetchFn: getTarefasAlunos,
  });

  if (loading) {
    return <Loading />;
  }

  if (error && !data) {
    return <p className="text-center font-semibold">{error}</p>;
  }

  const allTarefas = loading
    ? []
    : [...data!.pendentes, ...data!.atrasadas, ...data!.concluidas];

  const tarefasPorTab: Record<keyof typeof TABS_KEYS, typeof allTarefas> = {
    GERAL: allTarefas,
    PENDENTES: data!.pendentes,
    CONCLUIDAS: data!.concluidas,
    ATRASADAS: data!.atrasadas,
  };

  return (
    <div>
      <Header title={`Olá, ${user?.nome}, acompanhe suas tarefas!`} />
      <div className="space-y-4">
        <div className="bg-white border border-gray-100 max-md:p-4 rounded-2xl space-y-4 shadow-md p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            <StatCard
              title="Progresso geral"
              value={`${(
                (allTarefas.length > 0
                  ? data!.concluidas.length / allTarefas.length
                  : 1) * 100
              ).toFixed(2)}%`}
              icon={
                <GoGoal className="max-lg:text-xl shrink-0 text-3xl text-indigo-600" />
              }
            />
            <StatCard
              title="Tarefas concluídas"
              value={`${data!.concluidas.length}`}
              icon={
                <LuBookCheck className="max-lg:text-xl shrink-0 text-3xl text-green-600" />
              }
            />
            <StatCard
              title="Tarefas pendentes"
              value={`${data!.pendentes.length}`}
              icon={
                <RiProgress2Line className="max-lg:text-xl shrink-0 text-3xl text-black" />
              }
            />
            <StatCard
              title="Tarefas atrasadas"
              value={`${data!.atrasadas.length}`}
              icon={
                <MdAssignmentLate className="max-lg:text-xl shrink-0 text-3xl text-red-600" />
              }
            />
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl space-y-4 shadow-lg p-1">
          <div className="grid max-md:grid-cols-1 grid-cols-4">
            {TABS.map(({ key, label }) => (
              <div
                onClick={() => setCurrentTab(key)}
                key={key}
                className={clsx(
                  "bg-white max-md:text-sm text-center cursor-pointer col-span-1 rounded-md text-base space-y-2 py-2 px-8",
                  {
                    "border border-gray-200 shadow-sm font-semibold":
                      currentTab === key,
                    "text-gray-600 font-medium": currentTab !== key,
                  }
                )}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl space-y-6 shadow-lg p-6">
          <span className="max-lg:text-base text-xl flex items-center gap-2">
            <LuTrendingUp className="text-muted-foreground" />
            <h3 className=" font-bold text-center leading-none tracking-tight">
              Lista de Tarefas
            </h3>
          </span>
          {tarefasPorTab[currentTab].length === 0 ? (
            <EmptyState>Sem tarefas : (</EmptyState>
          ) : (
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
              {tarefasPorTab[currentTab].map((tarefa) => (
                <TarefaCard
                  prazo={tarefa.prazo}
                  alunoId={data!.aluno.id}
                  id={tarefa.id}
                  key={tarefa.id}
                  nome={tarefa.nome}
                  status={tarefa.status}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcompanhamentoTarefas;
