import { DisciplinaSchema } from "@/app/(private)/(disciplinas)/utils";
import api from "../api";

export async function cadastrarDisciplina(formData: DisciplinaSchema) {
  const { nome, professorId, turmaId } = formData;

  try {
    await api.post(`/disciplinas`, {
      professor_id: professorId,
      turma_id: turmaId,
      nome,
    });

    return {
      success: true,
      data: null,
      message: "Disciplina cadastrada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao cadastrar disciplina!",
    };
  }
}
