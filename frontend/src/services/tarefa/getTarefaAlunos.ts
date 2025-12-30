/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";
import { TarefaAlunos } from "@/@types/tarefa";
import { STATUS_KEYS } from "@/components/home/TarefaCard/TarefaCard";

interface GetTarefaAlunosProps {
  tarefaId: string | number;
}

export async function getTarefaAlunos({
  tarefaId,
}: GetTarefaAlunosProps): Promise<ApiResponse<TarefaAlunos>> {
  try {
    const response = await api.get(`/tarefa-alunos/${tarefaId}`);

    return {
      success: true,
      data: {
        ...response.data,
        alunos: response.data.alunos.map((aluno: any) => ({
          ...aluno,
          status: aluno.atrasada ? STATUS_KEYS.ATRASADA : aluno.status,
        })),
      },
      message: "Listagem obtida com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao buscar listagem!",
    };
  }
}
