import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";
import { Tarefa, TarefaAluno } from "@/@types/tarefa";
import { STATUS_KEYS } from "@/components/home/TarefaCard/TarefaCard";

export interface GetTarefasAlunoResponse extends Tarefa {
  pendentes: TarefaAluno[];
  concluidas: TarefaAluno[];
  atrasadas: TarefaAluno[];
  aluno: {
    id: number;
    nome: string;
  };
}

export async function getTarefasAlunos(): Promise<
  ApiResponse<GetTarefasAlunoResponse>
> {
  try {
    const response = await api.get(`/minhas-tarefas`);

    return {
      success: true,
      data: {
        ...response.data,
        atrasadas: response.data.atrasadas.map((tarefa: TarefaAluno) => ({
          ...tarefa,
          status: STATUS_KEYS.ATRASADA,
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
