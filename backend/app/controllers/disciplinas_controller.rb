class DisciplinasController < ApplicationController
  before_action :set_disciplina, only: %i[show update destroy]

  # Exige autenticação para create, update e destroy
  before_action :authorize_request, except: %i[index show]
  # Exige que o usuário seja administrador para create, update e destroy
  before_action -> { authorize_role!(:administrador) }, except: %i[index show]

  # Lista todas as disciplinas com turma e professor
  def index
    disciplinas = Disciplina.includes(
      :turma,
      professor: :user
    )
    render json: disciplinas.map(&:as_flat_json)
  end

  # Mostra uma disciplina específica
  def show
    render json: @disciplina.as_flat_json
  end

  # Cria uma nova disciplina
  def create
    disciplina = Disciplina.create!(disciplina_params)
    render json: disciplina.as_flat_json, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  # Atualiza uma disciplina existente
  def update
    @disciplina.update!(disciplina_params)
    render json: @disciplina.as_flat_json
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  # Exclui uma disciplina
  def destroy
    @disciplina.destroy!
    head :no_content
  rescue ActiveRecord::RecordNotDestroyed
    render json: {
      error: "Não foi possível excluir a disciplina",
      details: @disciplina.errors.full_messages
    }, status: :unprocessable_entity
  end

  private

  # Busca a disciplina pelo ID ou retorna 404 se não encontrada
  def set_disciplina
    @disciplina = Disciplina.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Disciplina não encontrada" }, status: :not_found
  end

  # Define os parâmetros permitidos para create e update
  def disciplina_params
    params.permit(
      :nome,
      :turma_id,
      :professor_id
    )
  end
end
