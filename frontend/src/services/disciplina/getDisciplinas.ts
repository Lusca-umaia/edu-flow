import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";
import { Disciplina } from "@/@types/disciplina";

export async function getDisciplinas(): Promise<ApiResponse<Disciplina[]>> {
  try {
    const response = await api.get(`/disciplinas`);

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
