class CreateProfessors < ActiveRecord::Migration[8.1]
  def change
    create_table :professors do |t|
      t.references :user, null: false, foreign_key: true
      t.references :turma, null: false, foreign_key: true
      t.string :cpf

      t.timestamps
    end
  end
end
