"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import InformationBox from "@/components/UI/InformationBox/InformationBox";
import {
  professorEditFields as fields,
  professorEditSchema,
  initialEditFormData,
  ProfessorEditSchema,
} from "../../utils";
import Actions from "@/components/UI/Actions/Actions";
import Loading from "@/components/UI/Loading/Loading";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import FormInput from "@/components/FormInput/FormInput";
import { useFetch } from "@/hooks/useFetch";
import { useDelete } from "@/hooks/useDelete";
import Header from "@/components/UI/Header/Header";
import { getProfessor } from "@/services/professor/getProfessor";
import { Professor as ProfessorType } from "@/@types/professor";
import { editarProfessor } from "@/services/professor/editarProfessor";
import { deletarProfessor } from "@/services/professor/deletarProfessor";

export default function Professor() {
  const [isEditMode, setIsEditMode] = useState(false);
  const params = useParams();
  const { id: professorId } = params;

  const {
    formData,
    errors,
    isLoading: loadingEdition,
    handleChange,
    handleSubmit,
    populateFormData,
  } = useFormSubmit<ProfessorEditSchema>({
    schema: professorEditSchema,
    initialData: initialEditFormData,
    onSubmit: async (data) =>
      await editarProfessor({
        formData: data,
        professorId: professorId as string,
      }),
    redirectUrl: "/list-professores",
  });

  const {
    data: professor,
    loading: loadingProfessor,
    error,
  } = useFetch<ProfessorType>({
    fetchFn: async () =>
      await getProfessor({ professorId: professorId as string }),
  });

  useEffect(() => {
    if (professor) {
      const { cpf, email, nome } = professor;
      populateFormData({ cpf, email, nome });
    }
  }, [professor]);

  const { handleDelete, loading: loadingDeletion } = useDelete({
    redirectUrl: "/list-professores",
    deleteFn: async () =>
      await deletarProfessor({ professorId: professorId as string }),
  });

  const handleResetData = () => {
    if (professor) {
      const { cpf, email, nome } = professor;
      populateFormData({ cpf, email, nome });
    }
  };

  const handleChangeMode = () => {
    setIsEditMode((isEditMode) => !isEditMode);
  };

  const isLoading = loadingDeletion || loadingEdition;

  if (loadingProfessor) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}</p>;
  }

  return (
    <div>
      <Header
        backPath="/list-professores"
        title="Informações do professor"
        description="Edite e/ou delete o professor clicando nos botões localizados na parte inferior."
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
                        mask={field.mask}
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
