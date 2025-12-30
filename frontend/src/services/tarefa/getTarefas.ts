import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";
import { Tarefa } from "@/@types/tarefa";

export async function getTarefas(): Promise<ApiResponse<Tarefa[]>> {
  try {
    const response = await api.get(`/tarefas`);

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
