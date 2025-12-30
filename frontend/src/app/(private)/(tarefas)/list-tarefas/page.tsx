"use client";

import Header from "@/components/UI/Header/Header";
import { useRouter } from "next/navigation";
import Loading from "@/components/UI/Loading/Loading";

import { useFetch } from "@/hooks/useFetch";
import ProfessoresTable from "./components/TarefasTable";
import { getTarefas } from "@/services/tarefa/getTarefas";
import { Tarefa } from "@/@types/tarefa";

export default function ListTarefas() {
  const router = useRouter();

  const {
    data: tarefas,
    loading,
    error,
  } = useFetch<Tarefa[]>({
    fetchFn: getTarefas,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}</p>;
  }

  const handleCreateTarefae = () => {
    router.push("/create-tarefa");
  };

  return (
    <div>
      <Header
        title="Lista de tarefas"
        actions={{
          primaryAction: {
            title: "Criar tarefa",
            onClick: handleCreateTarefae,
          },
        }}
        description="Cadastre, visualize e edite tarefas!"
      />
      <ProfessoresTable tarefas={tarefas!} />
    </div>
  );
}
