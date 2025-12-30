import { ProfessorCreateSchema } from "@/app/(private)/(professores)/utils";
import api from "../api";

export async function cadastrarProfessor(formData: ProfessorCreateSchema) {
  const { cpf, email, nome, password } = formData;

  try {
    await api.post(`/professors`, {
      cpf,
      email,
      nome,
      password,
    });

    return {
      success: true,
      data: null,
      message: "Professor cadastrado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao cadastrar professor!",
    };
  }
}
