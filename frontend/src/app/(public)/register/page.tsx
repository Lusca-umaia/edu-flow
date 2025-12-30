"use client";
import Header from "@/components/UI/Header/Header";
import Button from "@/components/UI/Button/Button";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { AlunoSchema, alunoSchema, fields, initialFormData } from "./utils";
import { useFetch } from "@/hooks/useFetch";
import { getTurmas } from "@/services/turma/getTurmas";
import Loading from "@/components/UI/Loading/Loading";
import { useMemo } from "react";
import { register } from "@/services/authService";
import { GenericInput } from "@/components/UI/GenericInput/GenericInput";

const Register = () => {
  const { errors, formData, handleChange, handleSubmit, isLoading } =
    useFormSubmit<AlunoSchema>({
      schema: alunoSchema,
      initialData: initialFormData as AlunoSchema,
      onSubmit: register,
      redirectUrl: "/home",
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

  if (turmasIsLoading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  if (errorInTurmas) {
    return <p className="text-center font-semibold">{errorInTurmas}</p>;
  }

  return (
    <div className="px-4 max-w-7xl space-y-4 mx-auto mt-4 mb-8">
      <Header
        backPath="/"
        title="Criar conta"
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
                  options={turmasOptions}
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
                {isLoading ? "Casdastrando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
