import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";

interface DeletarTurmaProps {
  turmaId: number | string;
}

export async function deletarTurma({
  turmaId,
}: DeletarTurmaProps): Promise<ApiResponse<null>> {
  try {
    const response = await api.delete(`/turmas/${turmaId}`);

    return {
      success: true,
      data: response.data,
      message: "Turma deletada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao deletar turma!",
    };
  }
}
