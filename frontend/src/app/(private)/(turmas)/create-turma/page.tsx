"use client";
import Button from "@/components/UI/Button/Button";
import { fields, TurmaSchema, initialFormData, turmaSchema } from "../utils";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import Header from "@/components/UI/Header/Header";
import FormInput from "@/components/FormInput/FormInput";
import { cadastrarTurma } from "@/services/turma/cadastrarTurma";

export default function CadastrarTurma() {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useFormSubmit<TurmaSchema>({
      schema: turmaSchema,
      initialData: initialFormData as TurmaSchema,
      onSubmit: cadastrarTurma,
      redirectUrl: "/list-turmas",
    });

  return (
    <div>
      <Header
        backPath="/list-turmas"
        title="Cadastrar turma"
        description='Ao finalizar o preenchimento do formulário, vá até a parte inferior e clique em "Salvar"'
      />
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="bg-white shadow-lg w-full col-span-2 p-4 rounded-lg grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {fields.map((field) => (
              <div key={field.name} className={field.customClass}>
                <FormInput
                  name={field.name}
                  label={field.label}
                  handleChange={(value) => handleChange(field.name, value)}
                  required
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  error={errors[field.name]}
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
