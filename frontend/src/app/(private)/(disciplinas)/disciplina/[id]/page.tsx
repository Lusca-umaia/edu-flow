"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import InformationBox from "@/components/UI/InformationBox/InformationBox";
import {
  DisciplinaSchema,
  fields,
  initialFormData,
  disciplinaSchema,
} from "../../utils";
import Actions from "@/components/UI/Actions/Actions";
import Loading from "@/components/UI/Loading/Loading";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { useFetch } from "@/hooks/useFetch";
import { useDelete } from "@/hooks/useDelete";
import Header from "@/components/UI/Header/Header";
import { getDisciplina } from "@/services/disciplina/getDisciplina";
import { GenericInput } from "@/components/UI/GenericInput/GenericInput";
import { getTurmas } from "@/services/turma/getTurmas";
import { getProfessores } from "@/services/professor/getProfessores";
import { Option } from "@/components/UI/Select/Select";
import { deletarDisciplina } from "@/services/disciplina/deletarDisciplina";
import { Disciplina as DisciplinaType } from "@/@types/disciplina";
import { get } from "lodash";
import { editarDisciplina } from "@/services/disciplina/editarDisciplina";

export default function Disciplina() {
  const [isEditMode, setIsEditMode] = useState(false);
  const params = useParams();
  const { id: disciplinaId } = params;

  const {
    formData,
    errors,
    isLoading: loadingEdition,
    handleChange,
    handleSubmit,
    setFormData,
    populateFormData,
  } = useFormSubmit<DisciplinaSchema>({
    schema: disciplinaSchema,
    initialData: initialFormData,
    onSubmit: async (data) =>
      await editarDisciplina({
        formData: data,
        disciplinaId: disciplinaId as string,
      }),
    redirectUrl: "/list-disciplinas",
  });

  const {
    data: disciplina,
    loading: disciplinaIsLoading,
    error: errorInDisciplina,
  } = useFetch<DisciplinaType>({
    fetchFn: async () =>
      await getDisciplina({ disciplinaId: disciplinaId as string }),
  });

  useEffect(() => {
    if (disciplina) {
      populateFormData({
        nome: disciplina.nome,
        professorId: disciplina.professor.id,
        turmaId: disciplina.turma.id,
      });
    }
  }, [disciplina]);

  const { handleDelete, loading: loadingDeletion } = useDelete({
    redirectUrl: "/list-disciplinas",
    deleteFn: async () =>
      await deletarDisciplina({ disciplinaId: disciplinaId as string }),
  });

  const handleResetData = () => {
    if (disciplina)
      setFormData({
        nome: disciplina.nome,
        professorId: disciplina.professor.id,
        turmaId: disciplina.turma.id,
      });
  };

  const handleChangeMode = () => {
    setIsEditMode((isEditMode) => !isEditMode);
  };

  const isLoading = loadingDeletion || loadingEdition;

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

  const error = errorInDisciplina || errorInProfessores || errorInTurmas;

  const loadingData =
    disciplinaIsLoading || professoresIsLoading || turmasIsLoading;

  const customPath: Record<string, string> = {
    professorId: "professor.nome",
    turmaId: "turma.nome",
  };

  if (loadingData) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}</p>;
  }

  return (
    <div>
      <Header
        backPath="/list-disciplinas"
        title="Informações da disciplina"
        description="Edite e/ou delete a disciplina clicando nos botões localizados na parte inferior."
      />
      <div className="animate-appearance space-y-12 divide-y divide-gray-900/10">
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-md p-4 rounded-lg">
            <dl className="divide-y divide-gray-200">
              {fields.map((field, index) => (
                <InformationBox
                  index={index + 1}
                  key={field.name}
                  length={fields.length}
                >
                  <dt className=" flex gap-1 items-center text-sm font-semibold leading-6 text-gray-900">
                    <span>
                      {field.label}
                      {!isEditMode && <span className="md:hidden">:</span>}
                    </span>
                  </dt>
                  <dd className="text-sm leading-6 font-medium text-gray-700 sm:col-span-1">
                    {isEditMode ? (
                      <GenericInput
                        key={field.name}
                        hiddenLabel
                        errors={errors}
                        field={field}
                        formData={formData}
                        options={options[field.name]}
                        handleChange={handleChange}
                      />
                    ) : customPath[field.name] ? (
                      get(disciplina, customPath[field.name])
                    ) : (
                      formData[field.name as keyof typeof formData]
                    )}
                  </dd>
                </InformationBox>
              ))}
              <Actions
                onDelete={handleDelete}
                isEditMode={isEditMode}
                onResetData={handleResetData}
                loading={isLoading || loadingDeletion}
                onChangeMode={handleChangeMode}
              />
            </dl>
          </div>
        </form>
      </div>
    </div>
  );
}
