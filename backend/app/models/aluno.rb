class Aluno < ApplicationRecord
  belongs_to :user
  belongs_to :turma

  has_many :tarefa_alunos, dependent: :destroy
  has_many :tarefas, through: :tarefa_alunos
end
