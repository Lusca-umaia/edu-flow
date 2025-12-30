import { ApiResponse } from "@/@types/serviceTypes";
import api from "../api";

interface GetTarefaAlunoProps {
  tarefaId: number | string;
  alunoId: number | string;
  feedback: string;
}

export async function enviarFeedback({
  tarefaId,
  alunoId,
  feedback,
}: GetTarefaAlunoProps): Promise<ApiResponse<null>> {
  try {
    await api.put(`/tarefa-alunos/${alunoId}/${tarefaId}`, { feedback });

    return {
      success: true,
      data: null,
      message: "Feedback enviado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao enviar feedback tarefa!",
    };
  }
}
