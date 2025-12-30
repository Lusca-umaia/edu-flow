class Tarefa < ApplicationRecord
  belongs_to :turma
  belongs_to :disciplina

  has_many :tarefa_alunos, dependent: :destroy
  has_many :alunos, through: :tarefa_alunos

  validates :nome, :prazo, presence: { message: "é obrigatório" }

  def as_flat_json
    {
      id: id,
      nome: nome,
      descricao: descricao,
      prazo: prazo,
      disciplina: {
        id: disciplina.id,
        nome: disciplina.nome
      },
      turma: {
        id: turma.id,
        nome: turma.nome
      },
      created_at: created_at,
      updated_at: updated_at
    }
  end
end
