import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";
import { Turma } from "@/@types/turma";

interface GetTurmaProps {
  turmaId: number | string;
}

export async function getTurma({
  turmaId,
}: GetTurmaProps): Promise<ApiResponse<Turma>> {
  try {
    const response = await api.get(`/turmas/${turmaId}`);

    return {
      success: true,
      data: response.data,
      message: "Turma obtida com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao buscar turma!",
    };
  }
}
