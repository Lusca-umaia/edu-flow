import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";

interface DeletarDisciplinaProps {
  disciplinaId: number | string;
}

export async function deletarDisciplina({
  disciplinaId,
}: DeletarDisciplinaProps): Promise<ApiResponse<null>> {
  try {
    const response = await api.delete(`/disciplinas/${disciplinaId}`);

    return {
      success: true,
      data: response.data,
      message: "Disciplina deletada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao deletar disciplina!",
    };
  }
}
