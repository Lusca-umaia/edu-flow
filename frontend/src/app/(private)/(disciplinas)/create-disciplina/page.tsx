"use client";
import Button from "@/components/UI/Button/Button";
import { Option } from "@/components/UI/Select/Select";
import {
  fields,
  DisciplinaSchema,
  initialFormData,
  disciplinaSchema,
} from "../utils";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import Loading from "@/components/UI/Loading/Loading";
import Header from "@/components/UI/Header/Header";
import { cadastrarDisciplina } from "@/services/disciplina/cadastrarDisciplina";
import { getProfessores } from "@/services/professor/getProfessores";
import { getTurmas } from "@/services/turma/getTurmas";
import { useFetch } from "@/hooks/useFetch";
import { useMemo } from "react";
import { GenericInput } from "@/components/UI/GenericInput/GenericInput";

export default function CadastrarDisciplina() {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useFormSubmit<DisciplinaSchema>({
      schema: disciplinaSchema,
      initialData: initialFormData as DisciplinaSchema,
      onSubmit: cadastrarDisciplina,
      redirectUrl: "/list-disciplinas",
    });

  const {
    data: professores,
    error: errorInProfessores,
    loading: professoresIsLoading,
  } = useFetch({
    fetchFn: getProfessores,
  });

  const {
    data: turmas,
    error: errorInTurmas,
    loading: turmasIsLoading,
  } = useFetch({
    fetchFn: getTurmas,
  });

  const turmasOptions = useMemo(() => {
    if (!turmas) return [];
    return turmas.map(({ id, nome }) => ({ id, nome }));
  }, [turmas]);

  const professoresOptions = useMemo(() => {
    if (!professores) return [];
    return professores.map(({ id, nome }) => ({ id, nome }));
  }, [professores]);

  const options: Record<string, Option[]> = {
    professorId: professoresOptions,
    turmaId: turmasOptions,
  };

  const loading = turmasIsLoading || professoresIsLoading;
  const errorInFecthData = errorInTurmas || errorInProfessores;

  if (loading) {
    return <Loading />;
  }

  if (errorInFecthData) {
    return <p className="text-center font-semibold">{errorInFecthData}</p>;
  }

  return (
    <div>
      <Header
        backPath="/list-disciplinas"
        title="Cadastrar disciplina"
        description='Ao finalizar o preenchimento do formulário, vá até a parte inferior e clique em "Salvar"'
      />
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="bg-white shadow-lg w-full col-span-2 p-4 rounded-lg grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {fields.map((field) => (
              <div key={field.name} className={field.customClass}>
                <GenericInput
                  errors={errors}
                  field={field}
                  formData={formData}
                  options={options[field.name]}
                  handleChange={handleChange}
                />
              </div>
            ))}
            <div className=" col-span-full pt-6 flex items-center justify-end border-t border-gray-900/10">
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                type="submit"
                buttonStyle="primary"
              >
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
