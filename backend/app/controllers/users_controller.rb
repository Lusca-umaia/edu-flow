class UsersController < ApplicationController
  # Exige autenticação para acessar - é com base no token que busco o usuário autenticado
  before_action :authorize_request, only: [ :me ]

  # Retorna dados do usuário autenticado
  def me
    render json: user_response(@current_user)
  end

  private

  # Monta resposta simplificada para o usuário
  def user_response(user)
    {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role
    }
  end
end
