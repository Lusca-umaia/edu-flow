import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";
import { Professor } from "@/@types/professor";

export async function getProfessores(): Promise<ApiResponse<Professor[]>> {
  try {
    const response = await api.get(`/professors`);

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
