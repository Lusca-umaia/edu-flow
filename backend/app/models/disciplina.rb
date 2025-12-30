class Disciplina < ApplicationRecord
  belongs_to :professor
  belongs_to :turma

  has_many :tarefas, dependent: :restrict_with_error

  validates :nome,
            presence: { message: "é obrigatório" },
            length: { minimum: 2, message: "deve ter no mínimo 2 caracteres" }

  validates :professor_id,
            presence: { message: "é obrigatório" }

  validates :turma_id,
            presence: { message: "é obrigatório" }

  validates :nome,
            uniqueness: {
              scope: %i[turma_id professor_id],
              message: "já existe para este professor nesta turma"
            }

  def as_flat_json
    {
      id: id,
      nome: nome,
      turma: {
        id: turma.id,
        nome: turma.nome
      },
      professor: {
        id: professor.id,
        nome: professor.user.nome,
        email: professor.user.email
      },
      created_at: created_at,
      updated_at: updated_at
    }
  end
end
