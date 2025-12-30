class CreateTurmas < ActiveRecord::Migration[8.1]
  def change
    create_table :turmas do |t|
      t.string :nome

      t.timestamps
    end
  end
end
