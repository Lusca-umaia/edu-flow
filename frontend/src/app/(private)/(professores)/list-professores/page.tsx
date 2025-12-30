"use client";

import Header from "@/components/UI/Header/Header";
import { useRouter } from "next/navigation";
import Loading from "@/components/UI/Loading/Loading";

import { useFetch } from "@/hooks/useFetch";
import ProfessoresTable from "./components/ProfessoresTable";
import { Professor } from "@/@types/professor";
import { getProfessores } from "@/services/professor/getProfessores";

export default function ListProfessores() {
  const router = useRouter();

  const {
    data: professores,
    loading,
    error,
  } = useFetch<Professor[]>({
    fetchFn: getProfessores,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}</p>;
  }

  const handleCreateProfessor = () => {
    router.push("/create-professor");
  };

  return (
    <div>
      <Header
        title="Lista de professores"
        actions={{
          primaryAction: {
            title: "Criar professor",
            onClick: handleCreateProfessor,
          },
        }}
        description="Cadastre, visualize e edite professores!"
      />
      <ProfessoresTable professores={professores!} />
    </div>
  );
}
