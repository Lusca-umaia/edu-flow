import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";
import { Turma } from "@/@types/turma";

export async function getTurmas(): Promise<ApiResponse<Turma[]>> {
  try {
    const response = await api.get(`/turmas`);

    return {
      success: true,
      data: response.data,
      message: "Listagem obtida com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Falha ao buscar listagem!",
    };
  }
}
