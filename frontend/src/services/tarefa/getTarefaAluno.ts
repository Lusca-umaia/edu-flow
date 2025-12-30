import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";
import { TarefaAluno } from "@/@types/tarefa";
import { STATUS_KEYS } from "@/components/home/TarefaCard/TarefaCard";

interface GetTarefaAlunoProps {
  tarefaId: number | string;
  alunoId: number | string;
}

export interface TarefaAlunoResponse {
  id: number;
  aluno: { id: number; nome: string };
  tarefa: TarefaAluno;
}

export async function getTarefaAluno({
  tarefaId,
  alunoId,
}: GetTarefaAlunoProps): Promise<ApiResponse<TarefaAlunoResponse>> {
  try {
    const response = await api.get(`/tarefa-aluno/${alunoId}/${tarefaId}`);

    return {
      success: true,
      data: {
        ...response.data,
        tarefa: {
          ...response.data.tarefa,
          status: response.data.tarefa.atrasada
            ? STATUS_KEYS.ATRASADA
            : response.data.tarefa.status,
        },
      },
      message: "Tarefa obtida com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao buscar tarefa!",
    };
  }
}
