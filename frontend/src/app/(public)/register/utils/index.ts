import { Field } from "@/@types/global";
import { z } from "zod";

export const alunoSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),

  email: z.email("Email inválido"),

  matricula: z
    .string()
    .regex(/^\d{5}$/, "A matrícula deve conter exatamente 5 números"),

  turmaId: z
    .number()
    .nullable()
    .refine((val) => val !== null, {
      message: "Turma é obrigatória",
    }),

  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type AlunoSchema = z.infer<typeof alunoSchema>;

export const fields: Field<AlunoSchema>[] = [
  {
    label: "Nome",
    name: "nome",
    type: "text",
    placeholder: "Lucas Maia...",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Turma",
    name: "turmaId",
    type: "select",
    placeholder: "Selecione a turma Lucas Maia...",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    placeholder: "example@email.com",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Senha",
    name: "senha",
    type: "password",
    placeholder: "******",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Matrícula",
    name: "matricula",
    mask: "00000",
    type: "text",
    customClass: "col-span-full md:col-span-2",
  },
] as const;

export const initialFormData: AlunoSchema = {
  nome: "",
  turmaId: null,
  matricula: "",
  email: "",
  senha: "",
};
