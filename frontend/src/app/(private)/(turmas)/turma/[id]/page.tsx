"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import InformationBox from "@/components/UI/InformationBox/InformationBox";
import { TurmaSchema, fields, initialFormData, turmaSchema } from "../../utils";
import Actions from "@/components/UI/Actions/Actions";
import Loading from "@/components/UI/Loading/Loading";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import FormInput from "@/components/FormInput/FormInput";
import { useFetch } from "@/hooks/useFetch";
import { Turma as TurmaType } from "@/@types/turma";
import { getTurma } from "@/services/turma/getTurma";
import { useDelete } from "@/hooks/useDelete";
import { editarTurma } from "@/services/turma/editarTurma";
import { deletarTurma } from "@/services/turma/deletarTurma";
import Header from "@/components/UI/Header/Header";

export default function Turma() {
  const [isEditMode, setIsEditMode] = useState(false);
  const params = useParams();
  const { id: turmaId } = params;

  const {
    formData,
    errors,
    isLoading: loadingEdition,
    handleChange,
    handleSubmit,
    setFormData,
    populateFormData,
  } = useFormSubmit<TurmaSchema>({
    schema: turmaSchema,
    initialData: initialFormData,
    onSubmit: async (data) =>
      await editarTurma({ formData: data, turmaId: turmaId as string }),
    redirectUrl: "/list-turmas",
  });

  const {
    data: turma,
    loading: loadingTurma,
    error,
  } = useFetch<TurmaType>({
    fetchFn: async () => await getTurma({ turmaId: turmaId as string }),
  });

  useEffect(() => {
    if (turma) {
      populateFormData({ nome: turma.nome });
    }
  }, [turma]);

  const { handleDelete, loading: loadingDeletion } = useDelete({
    redirectUrl: "/list-turmas",
    deleteFn: async () => await deletarTurma({ turmaId: turmaId as string }),
  });

  const handleResetData = () => {
    setFormData({ nome: turma!.nome });
  };

  const handleChangeMode = () => {
    setIsEditMode((isEditMode) => !isEditMode);
  };

  const isLoading = loadingDeletion || loadingEdition;

  if (loadingTurma) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}</p>;
  }

  return (
    <div>
      <Header
        backPath="/list-turmas"
        title="Informações da turma"
        description="Edite e/ou delete a turma clicando nos botões localizados na parte inferior."
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
                      <FormInput
                        name={field.name}
                        handleChange={(value) =>
                          handleChange(field.name, value)
                        }
                        required
                        value={formData[
                          field.name as keyof typeof formData
                        ].toString()}
                        type={field.type}
                        key={field.name}
                        error={errors[field.name as keyof typeof errors]}
                      />
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
