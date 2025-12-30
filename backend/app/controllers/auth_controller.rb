class AuthController < ApplicationController
  # Cadastra um novo aluno
  def register
    ActiveRecord::Base.transaction do
      # Cria o usuário com role de aluno
      user = User.create!(
        email: params[:email],
        nome: params[:nome],
        password: params[:password],
        role: :aluno
      )

      # Cria o registro do aluno associado ao usuário
      aluno = Aluno.create!(
        user: user,
        turma_id: params[:turma_id],
        matricula: params[:matricula]
      )

      # Gera token JWT para o usuário
      token = JwtService.encode(user_id: user.id)

      # Retorna dados do aluno e token
      render json: { aluno: aluno_response(user, aluno), token: token }, status: :created
    end
  end

  # Autentica um usuário existente
  def login
    user = User.find_by(email: params[:email])

    # Verifica senha e retorna token se válido
    if user&.authenticate(params[:password])
      token = JwtService.encode(user_id: user.id)

      render json: {
        token: token,
        role: user.role
      }
    else
      render json: { error: "Credenciais inválidas" }, status: :unprocessable_entity
    end
  end

  private

  # Monta resposta simplificada para um aluno
  def aluno_response(user, aluno)
    {
      id: user.id,
      email: user.email,
      nome: user.nome,
      matricula: aluno.matricula
    }
  end
end
