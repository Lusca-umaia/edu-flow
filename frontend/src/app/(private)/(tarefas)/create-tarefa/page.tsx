"use client";
import Button from "@/components/UI/Button/Button";
import { Option } from "@/components/UI/Select/Select";
import { fields, TarefaSchema, tarefaSchema, initialFormData } from "../utils";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import Loading from "@/components/UI/Loading/Loading";
import Header from "@/components/UI/Header/Header";
import { useFetch } from "@/hooks/useFetch";
import { useMemo } from "react";
import { GenericInput } from "@/components/UI/GenericInput/GenericInput";
import { getDisciplinas } from "@/services/disciplina/getDisciplinas";
import { cadastrarTarefa } from "@/services/tarefa/cadastrarTarefa";

export default function CadastrarTarefa() {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useFormSubmit<TarefaSchema>({
      schema: tarefaSchema,
      initialData: initialFormData as TarefaSchema,
      onSubmit: cadastrarTarefa,
      redirectUrl: "/list-tarefas",
    });

  const {
    data: disciplinas,
    error: errorInDisciplinas,
    loading: disciplinasIsLoading,
  } = useFetch({
    fetchFn: getDisciplinas,
  });

  const disciplinasOptions = useMemo(() => {
    if (!disciplinas) return [];
    return disciplinas.map(({ id, nome, turma }) => ({
      id,
      nome: `${nome} - ${turma.nome}`,
    }));
  }, [disciplinas]);

  const options: Record<string, Option[]> = {
    disciplinaId: disciplinasOptions,
  };

  const loading = disciplinasIsLoading;
  const errorInFecthData = errorInDisciplinas;

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
        title="Cadastrar tarefa"
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
