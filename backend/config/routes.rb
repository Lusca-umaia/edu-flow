Rails.application.routes.draw do
  # Autenticação
  post "auth/login", to: "auth#login"
  post "auth/register", to: "auth#register"
  get "me", to: "users#me"

  # Recursos principais
  resources :professors
  resources :turmas
  resources :disciplinas
  resources :tarefas

  # TarefaAlunos
  # Lista todas as tarefas
  get "tarefa-alunos", to: "tarefa_alunos#index"

  # Professor -> todos os alunos da tarefa
  # Aluno -> apenas a própria tarefa
  get "tarefa-alunos/:tarefa_id", to: "tarefa_alunos#show_by_tarefa", as: "show_by_tarefa"

  # Atualiza feedback e status da tarefa de um aluno (somente professor)
  put "tarefa-alunos/:aluno_id/:tarefa_id", to: "tarefa_alunos#update", as: "update_tarefa_aluno"

  # Alunos
  get "/minhas-tarefas", to: "tarefa_alunos#minhas_tarefas"
  # Obtém uma tarefa específica de um aluno específico
  get "/tarefa-aluno/:aluno_id/:tarefa_id", to: "tarefa_alunos#show_aluno_tarefa"
end
