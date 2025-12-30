class TurmasController < ApplicationController
  before_action :set_turma, only: %i[show update destroy]
  # Exige autenticação para create, update e destroy
  before_action :authorize_request, except: %i[index show]
  # Exige que o usuário seja administrador para create, update e destroy
  before_action -> { authorize_role!(:administrador) }, except: %i[index show]

  # Lista todas as turmas
  def index
    turmas = Turma.all
    render json: turmas.map(&:as_flat_json)
  end

  # Mostra uma turma específica
  def show
    render json: @turma.as_flat_json
  end

  # Cria uma nova turma
  def create
    turma = Turma.create!(turma_params)
    render json: turma.as_flat_json, status: :created
  end

  # Atualiza uma turma existente
  def update
    @turma.update!(turma_params)
    render json: @turma.as_flat_json
  end

  # Exclui uma turma
  def destroy
    if @turma.destroy
      head :no_content
    else
      render json: {
        error: "Não foi possível excluir a turma",
        details: @turma.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  # Busca a turma pelo ID ou retorna 404 se não encontrada
  def set_turma
    @turma = Turma.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Turma não encontrada" }, status: :not_found
  end

  # Define parâmetros permitidos para create e update
  def turma_params
    params.permit(:nome)
  end
end
