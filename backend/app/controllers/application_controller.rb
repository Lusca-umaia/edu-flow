class ApplicationController < ActionController::API
  # Usuário atualmente autenticado
  attr_reader :current_user

  # Verifica se o request possui um token válido e define @current_user
  def authorize_request
    header = request.headers["Authorization"]
    token = header.split(" ").last
    decoded = JwtService.decode(token)
    @current_user = User.find(decoded[:user_id])
  rescue
    render json: { error: "Não autorizado" }, status: :unauthorized
  end

  # Verifica se o usuário possui um dos papéis permitidos
  # roles: lista de papéis permitidos
  def authorize_role!(*roles)
    roles = roles.map(&:to_s)
    unless roles.include?(@current_user.role)
      render json: { error: "Acesso negado" }, status: :forbidden
      nil
    end
  end
end
