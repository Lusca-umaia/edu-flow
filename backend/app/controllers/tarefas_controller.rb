class TarefasController < ApplicationController
  before_action :set_tarefa, only: %i[show]
  # Exige autenticação para todas as ações
  before_action :authorize_request
  # Apenas professores podem criar/editar/excluir tarefas
  before_action -> { authorize_role!(:professor) }, except: %i[index show]

  # Lista tarefas do usuário atual (professor, aluno ou todos)
  def index
    tarefas = if current_user.professor?
                Tarefa.joins(:disciplina).where(disciplinas: { professor_id: current_user.professor.id })
    elsif current_user.aluno?
                Tarefa.joins(:turma).where(turmas: { id: current_user.aluno.turma.id })
    else
                Tarefa.all
    end

    render json: tarefas.map(&:as_flat_json)
  end

  # Mostra uma tarefa específica, garantindo permissão do usuário
  def show
    if current_user.professor? && @tarefa.disciplina.professor_id != current_user.professor.id
      render json: { error: "Não autorizado" }, status: :forbidden
      return
    elsif current_user.aluno? && @tarefa.turma_id != current_user.aluno.turma.id
      render json: { error: "Não autorizado" }, status: :forbidden
      return
    end

    render json: @tarefa.as_flat_json
  end

  # Cria uma nova tarefa e associa a cada aluno da turma
  def create
    ActiveRecord::Base.transaction do
      disciplina = Disciplina.find(tarefa_params[:disciplina_id])

      tarefa = Tarefa.create!(
        nome: tarefa_params[:nome],
        descricao: tarefa_params[:descricao],
        prazo: tarefa_params[:prazo],
        disciplina: disciplina,
        turma: disciplina.turma
      )

      # Cria TarefaAluno para cada aluno da turma
      disciplina.turma.alunos.find_each do |aluno|
        TarefaAluno.create!(tarefa: tarefa, aluno: aluno, status: :PENDENTE)
      end

      render json: tarefa.as_flat_json, status: :created
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Disciplina não encontrada" }, status: :not_found
  end

  private

  # Busca tarefa pelo ID ou retorna 404 se não encontrada
  def set_tarefa
    @tarefa = Tarefa.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Tarefa não encontrada" }, status: :not_found
  end

  # Define parâmetros permitidos para create
  def tarefa_params
    params.permit(:nome, :descricao, :prazo, :disciplina_id)
  end
end
