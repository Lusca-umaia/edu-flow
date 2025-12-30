# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_12_29_204259) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "alunos", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "matricula"
    t.bigint "turma_id", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["turma_id"], name: "index_alunos_on_turma_id"
    t.index ["user_id"], name: "index_alunos_on_user_id"
  end

  create_table "disciplinas", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "nome"
    t.bigint "professor_id", null: false
    t.bigint "turma_id", null: false
    t.datetime "updated_at", null: false
    t.index ["professor_id"], name: "index_disciplinas_on_professor_id"
    t.index ["turma_id"], name: "index_disciplinas_on_turma_id"
  end

  create_table "professors", force: :cascade do |t|
    t.string "cpf"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_professors_on_user_id"
  end

  create_table "tarefa_alunos", force: :cascade do |t|
    t.bigint "aluno_id", null: false
    t.datetime "created_at", null: false
    t.datetime "entregue_em"
    t.text "feedback"
    t.integer "status", default: 0, null: false
    t.bigint "tarefa_id", null: false
    t.datetime "updated_at", null: false
    t.index ["aluno_id", "tarefa_id"], name: "index_tarefa_alunos_on_aluno_id_and_tarefa_id", unique: true
    t.index ["aluno_id"], name: "index_tarefa_alunos_on_aluno_id"
    t.index ["tarefa_id"], name: "index_tarefa_alunos_on_tarefa_id"
  end

  create_table "tarefas", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "descricao"
    t.bigint "disciplina_id", null: false
    t.string "nome"
    t.datetime "prazo"
    t.bigint "turma_id", null: false
    t.datetime "updated_at", null: false
    t.index ["disciplina_id"], name: "index_tarefas_on_disciplina_id"
    t.index ["turma_id"], name: "index_tarefas_on_turma_id"
  end

  create_table "turmas", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "nome"
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "nome"
    t.string "password_digest"
    t.integer "role"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "alunos", "turmas"
  add_foreign_key "alunos", "users"
  add_foreign_key "disciplinas", "professors"
  add_foreign_key "disciplinas", "turmas"
  add_foreign_key "professors", "users"
  add_foreign_key "tarefa_alunos", "alunos"
  add_foreign_key "tarefa_alunos", "tarefas"
  add_foreign_key "tarefas", "disciplinas"
  add_foreign_key "tarefas", "turmas"
end
