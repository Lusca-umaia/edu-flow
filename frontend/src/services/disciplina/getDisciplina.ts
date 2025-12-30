import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";
import { Disciplina } from "@/@types/disciplina";

interface GetDisciplinaProps {
  disciplinaId: number | string;
}

export async function getDisciplina({
  disciplinaId,
}: GetDisciplinaProps): Promise<ApiResponse<Disciplina>> {
  try {
    const response = await api.get(`/disciplinas/${disciplinaId}`);

    return {
      success: true,
      data: response.data,
      message: "Disciplina obtida com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao buscar disciplina!",
    };
  }
}
