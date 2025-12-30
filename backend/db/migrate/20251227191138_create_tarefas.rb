class CreateTarefas < ActiveRecord::Migration[8.1]
  def change
    create_table :tarefas do |t|
      t.string :nome
      t.datetime :prazo
      t.text :descricao
      t.references :turma, null: false, foreign_key: true
      t.references :disciplina, null: false, foreign_key: true

      t.timestamps
    end
  end
end
