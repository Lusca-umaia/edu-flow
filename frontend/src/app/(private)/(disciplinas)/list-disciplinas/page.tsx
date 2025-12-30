"use client";

import Header from "@/components/UI/Header/Header";
import { useRouter } from "next/navigation";
import Loading from "@/components/UI/Loading/Loading";
import { getDisciplinas } from "@/services/disciplina/getDisciplinas";
import { Disciplina } from "@/@types/disciplina";
import DisciplinasTable from "./components/DisciplinasTable";
import { useFetch } from "@/hooks/useFetch";

export default function ListDisciplinas() {
  const router = useRouter();

  const {
    data: disciplinas,
    loading,
    error,
  } = useFetch<Disciplina[]>({
    fetchFn: getDisciplinas,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}</p>;
  }

  const handleCreateDisciplina = () => {
    router.push("/create-disciplina");
  };

  return (
    <div>
      <Header
        title="Lista de disciplinas"
        actions={{
          primaryAction: {
            title: "Criar disciplina",
            onClick: handleCreateDisciplina,
          },
        }}
        description="Cadastre, visualize e edite disciplinas!"
      />
      <DisciplinasTable disciplinas={disciplinas!} />
    </div>
  );
}
