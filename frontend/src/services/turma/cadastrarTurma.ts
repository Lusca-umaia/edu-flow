import api from "../api";
import { TurmaSchema } from "@/app/(private)/(turmas)/utils";

export async function cadastrarTurma(formData: TurmaSchema) {
  const { nome } = formData;

  try {
    await api.post(`/turmas`, {
      nome,
    });

    return {
      success: true,
      data: null,
      message: "Turma cadastrada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao cadastrar turma!",
    };
  }
}
