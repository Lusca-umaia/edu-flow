import { Field } from "@/@types/global";
import z from "zod";

export const turmaSchema = z.object({
  nome: z
    .string()
    .refine((value) => value.trim().length > 0, "Informe o nome da turma"),
});

export type TurmaSchema = z.infer<typeof turmaSchema>;

export const fields: Field<TurmaSchema>[] = [
  {
    label: "Nome da turma",
    name: "nome",
    type: "text",
    placeholder: "1° Ano A...",
    customClass: "col-span-full md:col-span-2",
  },
] as const;

export const initialFormData = {
  nome: "",
};
