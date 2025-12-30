import { Field } from "@/@types/global";
import { isValidCPF } from "@/utils/auxiliars";
import { z } from "zod";

const professorBaseSchema = {
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  cpf: z.string().refine(isValidCPF, "CPF inválido"),
  email: z.string().email("Email inválido"),
};

export const professorCreateSchema = z.object({
  ...professorBaseSchema,
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const professorEditSchema = z.object({
  ...professorBaseSchema,
});

export type ProfessorCreateSchema = z.infer<typeof professorCreateSchema>;
export type ProfessorEditSchema = z.infer<typeof professorEditSchema>;

const baseFields = [
  {
    label: "Nome do professor",
    name: "nome",
    type: "text",
    placeholder: "Lucas Maia...",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "CPF",
    name: "cpf",
    mask: "000.000.000-00",
    type: "text",
    placeholder: "000.000.000-00",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    placeholder: "example@email.com",
    customClass: "col-span-full md:col-span-2",
  },
] as const;

export const professorCreateFields: Field<ProfessorCreateSchema>[] = [
  ...baseFields,
  {
    label: "Senha",
    name: "password",
    type: "password",
    placeholder: "******",
    customClass: "col-span-full md:col-span-2",
  },
];

export const professorEditFields: Field<ProfessorEditSchema>[] = [
  ...baseFields,
];

export const initialCreateFormData: ProfessorCreateSchema = {
  nome: "",
  cpf: "",
  email: "",
  password: "",
};

export const initialEditFormData: ProfessorEditSchema = {
  nome: "",
  cpf: "",
  email: "",
};
