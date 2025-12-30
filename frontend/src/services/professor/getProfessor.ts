import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";
import { Professor } from "@/@types/professor";

interface GetProfessorProps {
  professorId: string | number;
}

export async function getProfessor({
  professorId,
}: GetProfessorProps): Promise<ApiResponse<Professor>> {
  try {
    const response = await api.get(`/professors/${professorId}`);

    return {
      success: true,
      data: response.data,
      message: "Professor obtido com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao buscar professor!",
    };
  }
}
