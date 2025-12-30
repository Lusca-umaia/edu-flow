class TarefaAluno < ApplicationRecord
  belongs_to :aluno
  belongs_to :tarefa

  enum :status, {
    CONCLUIDA: 0,
    PENDENTE: 1,
    ATRASADA: 2
  }

  def as_flat_json
    {
      id: id,
      aluno_id: aluno_id,
      tarefa_id: tarefa_id,
      status: status,
      feedback: feedback,
      entregue_em: entregue_em,
      created_at: created_at,
      updated_at: updated_at
    }
  end
end
