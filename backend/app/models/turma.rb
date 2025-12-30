class Turma < ApplicationRecord
  has_many :alunos, dependent: :restrict_with_error
  has_many :disciplinas, dependent: :restrict_with_error
  has_many :tarefas, dependent: :restrict_with_error

  has_many :professors, through: :disciplinas

  validates :nome,
            uniqueness: { message: "já cadastrado" },
            presence: { message: "é obrigatório" },
            length: { minimum: 2, message: "deve ter no mínimo 2 caracteres" }

  def as_flat_json
    {
      id: id,
      nome: nome,
      created_at: created_at,
      updated_at: updated_at
    }
  end
end
