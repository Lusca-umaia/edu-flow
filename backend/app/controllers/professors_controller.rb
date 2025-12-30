class ProfessorsController < ApplicationController
  before_action :set_professor, only: %i[show update destroy]
  # Exige autenticação para todas as ações
  before_action :authorize_request
  # Exige que o usuário seja administrador, exceto para index e show
  before_action -> { authorize_role!(:administrador) }, except: %i[index show]

  # Lista todos os professores com dados do usuário associado
  def index
    professors = Professor.includes(:user)
    render json: professors.map(&:as_flat_json)
  end

  # Mostra um professor específico
  def show
    render json: @professor.as_flat_json
  end

  # Cria um novo professor com usuário associado
  def create
    ActiveRecord::Base.transaction do
      user = User.create!(
        email: professor_params[:email],
        password: professor_params[:password],
        nome: professor_params[:nome],
        role: :professor
      )

      professor = Professor.create!(
        user: user,
        cpf: professor_params[:cpf]
      )

      render json: professor, status: :created
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  # Atualiza professor e dados do usuário associado
  def update
    ActiveRecord::Base.transaction do
      @professor.update!(cpf: professor_params[:cpf])
      @professor.user.update!(
        email: professor_params[:email],
        nome: professor_params[:nome]
      )
      render json: @professor
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  # Exclui professor e usuário associado
  def destroy
    ActiveRecord::Base.transaction do
      @professor.user.destroy!
      @professor.destroy!
    end
    head :no_content
  end

  private

  # Busca professor pelo ID ou retorna 404 se não encontrado
  def set_professor
    @professor = Professor.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Professor não encontrado" }, status: :not_found
  end

  # Define parâmetros permitidos para create e update
  def professor_params
    params.permit(:email, :password, :nome, :cpf)
  end
end
