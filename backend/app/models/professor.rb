class Professor < ApplicationRecord
  belongs_to :user

  has_many :disciplinas, dependent: :destroy
  has_many :turmas, through: :disciplinas

  validates :cpf,
            presence: { message: "é obrigatório" },
            uniqueness: { message: "já cadastrado" }

  def as_flat_json
    {
      id: id,
      cpf: cpf,
      user_id: user.id,
      email: user.email,
      nome: user.nome,
      role: user.role
    }
  end
end
