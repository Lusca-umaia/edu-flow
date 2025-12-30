class CreateTarefaAlunos < ActiveRecord::Migration[7.1]
  def change
    create_table :tarefa_alunos do |t|
      t.references :aluno, null: false, foreign_key: true
      t.references :tarefa, null: false, foreign_key: true
      t.integer :status, null: false, default: 0
      t.text :feedback
      t.datetime :entregue_em

      t.timestamps
    end

    add_index :tarefa_alunos, [:aluno_id, :tarefa_id], unique: true
  end
end
