class RemoveTurmaFromProfessors < ActiveRecord::Migration[8.1]
  def change
    remove_reference :professors, :turma, foreign_key: true
  end
end
