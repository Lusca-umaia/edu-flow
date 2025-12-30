class AlunosController < ApplicationController
  before_action :authorize_request, only: [ :me ]

  def me
    render json: aluno_response(@current_user)
  end

  private

  def aluno_response(current_user)
    response = {
      id: current_user.id,
      email: current_user.email,
      nome: current_user.nome,
      matricula: current_user.aluno.matricula
    }
    response
  end
end
