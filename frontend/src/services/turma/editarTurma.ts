import api from "../api";
import { TurmaSchema } from "@/app/(private)/(turmas)/utils";

interface EditarTurmaProps {
  turmaId: number | string;
  formData: TurmaSchema;
}

export async function editarTurma({ formData, turmaId }: EditarTurmaProps) {
  const { nome } = formData;

  try {
    await api.put(`/turmas/${turmaId}`, {
      nome,
    });

    return {
      success: true,
      data: null,
      message: "Turma editada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao editar turma!",
    };
  }
}
