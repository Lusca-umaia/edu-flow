class User < ApplicationRecord
  has_secure_password

  enum :role, { aluno: 0, professor: 1, administrador: 2 }

  has_one :aluno, dependent: :destroy
  has_one :professor, dependent: :destroy

  validates :email,
            presence: { message: "é obrigatório" },
            uniqueness: { message: "já está em uso" },
            format: {
              with: URI::MailTo::EMAIL_REGEXP,
              message: "inválido"
            }

  validates :role,
            presence: { message: "é obrigatório" }

  validates :password,
            length: {
              minimum: 6,
              message: "deve ter no mínimo 6 caracteres"
            },
            if: :password_required?

  private

  def password_required?
    new_record? || password.present?
  end
end
