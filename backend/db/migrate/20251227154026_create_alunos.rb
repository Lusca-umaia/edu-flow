class CreateAlunos < ActiveRecord::Migration[8.1]
  def change
    create_table :alunos do |t|
      t.references :user, null: false, foreign_key: true
      t.references :turma, null: false, foreign_key: true
      t.string :matricula

      t.timestamps
    end
  end
end
