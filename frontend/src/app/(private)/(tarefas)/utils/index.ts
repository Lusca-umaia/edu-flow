import { Field } from "@/@types/global";
import z from "zod";

export const tarefaSchema = z.object({
  nome: z
    .string()
    .refine((value) => value.trim().length > 0, "Informe o nome da tarefa"),

  disciplinaId: z
    .number()
    .nullable()
    .refine((val) => val !== null, {
      message: "Disciplina é obrigatória",
    }),

  prazo: z
    .string()
    .refine(
      (value) => /^\d{2}\/\d{2}\/\d{4}$/.test(value),
      "Informe uma data válida (DD/MM/AAAA)"
    ),

  descricao: z
    .string()
    .refine(
      (value) => value.trim().length > 0,
      "Informe a descrição da tarefa"
    ),
});

export type TarefaSchema = z.infer<typeof tarefaSchema>;

export const fields: Field<TarefaSchema>[] = [
  {
    label: "Nome da tarefa",
    name: "nome",
    type: "text",
    placeholder: "Lista de exercícios...",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Disciplina",
    name: "disciplinaId",
    type: "select",
    placeholder: "Selecione a disciplina",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Prazo",
    name: "prazo",
    type: "text",
    mask: "00/00/0000",
    placeholder: "DD/MM/AAAA",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Descrição",
    name: "descricao",
    type: "textarea",
    placeholder: "Detalhes da tarefa...",
    customClass: "col-span-full",
  },
] as const;

export const initialFormData: TarefaSchema = {
  nome: "",
  disciplinaId: null,
  prazo: "",
  descricao: "",
};
