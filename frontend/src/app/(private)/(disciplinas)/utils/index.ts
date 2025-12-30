import { Field } from "@/@types/global";
import z from "zod";

export const disciplinaSchema = z.object({
  nome: z
    .string()
    .refine((value) => value.trim().length > 0, "Informe o nome da turma"),
  professorId: z
    .number()
    .nullable()
    .refine((val) => val !== null, {
      message: "Professor é obrigatório",
    }),
  turmaId: z
    .number()
    .nullable()
    .refine((val) => val !== null, {
      message: "Turma é obrigatória",
    }),
});

export type DisciplinaSchema = z.infer<typeof disciplinaSchema>;

export const fields: Field<DisciplinaSchema>[] = [
  {
    label: "Nome da disciplina",
    name: "nome",
    type: "text",
    placeholder: "Matemática...",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Professor",
    name: "professorId",
    type: "select",
    placeholder: "Selecione o professor",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Turma",
    name: "turmaId",
    type: "select",
    placeholder: "Selecione a turma",
    customClass: "col-span-full md:col-span-2",
  },
] as const;

export const initialFormData = {
  nome: "",
  turmaId: null,
  professorId: null,
};
