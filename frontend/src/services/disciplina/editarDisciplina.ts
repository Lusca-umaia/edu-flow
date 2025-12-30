import { DisciplinaSchema } from "@/app/(private)/(disciplinas)/utils";
import api from "../api";

interface EditarDisciplinaProps {
  disciplinaId: number | string;
  formData: DisciplinaSchema;
}

export async function editarDisciplina({
  formData,
  disciplinaId,
}: EditarDisciplinaProps) {
  const { nome, professorId, turmaId } = formData;

  try {
    await api.put(`/disciplinas/${disciplinaId}`, {
      nome,
      professor_id: professorId,
      turma_id: turmaId,
    });

    return {
      success: true,
      data: null,
      message: "Disciplina editada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao editar disciplina!",
    };
  }
}
