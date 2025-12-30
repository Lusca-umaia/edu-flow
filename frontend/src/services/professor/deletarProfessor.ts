import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";

interface DeletarProfessorProps {
  professorId: number | string;
}

export async function deletarProfessor({
  professorId,
}: DeletarProfessorProps): Promise<ApiResponse<null>> {
  try {
    const response = await api.delete(`/professors/${professorId}`);

    return {
      success: true,
      data: response.data,
      message: "Professor deletada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao deletar professor!",
    };
  }
}
