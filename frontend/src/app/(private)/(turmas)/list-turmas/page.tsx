"use client";

import Header from "@/components/UI/Header/Header";
import { useRouter } from "next/navigation";
import Loading from "@/components/UI/Loading/Loading";

import { useFetch } from "@/hooks/useFetch";
import TurmasTable from "./components/TurmasTable";
import { getTurmas } from "@/services/turma/getTurmas";
import { Turma } from "@/@types/turma";

export default function ListTurmas() {
  const router = useRouter();

  const {
    data: turmas,
    loading,
    error,
  } = useFetch<Turma[]>({
    fetchFn: getTurmas,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}</p>;
  }

  const handleCreateTurma = () => {
    router.push("/create-turma");
  };

  return (
    <div>
      <Header
        title="Lista de turmas"
        actions={{
          primaryAction: {
            title: "Criar turma",
            onClick: handleCreateTurma,
          },
        }}
        description="Cadastre, visualize e edite turmas!"
      />
      <TurmasTable turmas={turmas!} />
    </div>
  );
}
