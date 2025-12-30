import api from "../api";
import { TarefaSchema } from "@/app/(private)/(tarefas)/utils";

export async function cadastrarTarefa(formData: TarefaSchema) {
  const { descricao, disciplinaId, nome, prazo } = formData;

  try {
    await api.post(`/tarefas`, {
      descricao,
      disciplina_id: disciplinaId,
      nome,
      prazo,
    });

    return {
      success: true,
      data: null,
      message: "Tarefa cadastrada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao cadastrar tarefa!",
    };
  }
}
