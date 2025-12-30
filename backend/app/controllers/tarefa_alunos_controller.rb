class TarefaAlunosController < ApplicationController
  # Antes de qualquer ação, verifica se o usuário está autenticado
  before_action :authorize_request
  # Define @tarefa_aluno para update
  before_action :set_tarefa_aluno_by_ids, only: [ :update ]
  # Define @tarefa_aluno para show individual
  before_action :set_tarefa_aluno, only: [ :show_aluno_tarefa ]

  # GET /tarefa-alunos/:tarefa_id
  # Retorna a tarefa e os alunos relacionados (professor) ou apenas a tarefa do aluno
  def show_by_tarefa
    tarefa_id = params[:tarefa_id]

    if current_user.professor?
      # Busca tarefas do professor com alunos relacionados
      professor_id = current_user.professor.id
      tarefa_alunos = TarefaAluno.includes(aluno: :user, tarefa: [ :disciplina, :turma ])
                                 .where(tarefa_id: tarefa_id)
                                 .joins(tarefa: :disciplina)
                                 .where(disciplinas: { professor_id: professor_id })

      # Se não houver tarefas, nega acesso
      return render json: { error: "Acesso negado" }, status: :forbidden if tarefa_alunos.empty?

      render json: format_tarefa_com_alunos(tarefa_alunos)

    elsif current_user.aluno?
      # Busca a tarefa específica do aluno
      tarefa_aluno = TarefaAluno.includes(aluno: :user, tarefa: [ :disciplina, :turma ])
                                .find_by(tarefa_id: tarefa_id, aluno_id: current_user.aluno.id)

      return render json: { error: "Acesso negado" }, status: :forbidden unless tarefa_aluno

      render json: format_tarefa_aluno(tarefa_aluno)
    else
      # Outros usuários não têm acesso
      render json: { error: "Acesso negado" }, status: :forbidden
    end
  end

  # GET /tarefa-aluno/:aluno_id/:tarefa_id
  # Mostra a tarefa de um aluno específico
  def show_aluno_tarefa
    # Aluno só pode ver suas próprias tarefas
    if current_user.aluno? && current_user.aluno.id != params[:aluno_id].to_i
      return render json: { error: "Acesso negado" }, status: :forbidden
    end

    render json: format_tarefa_aluno(@tarefa_aluno)
  end

  # PUT /tarefa-alunos/:tarefa_id/:aluno_id
  # Somente professor pode atualizar a tarefa do aluno
  def update
    unless current_user.professor?
      return render json: { error: "Acesso negado" }, status: :forbidden
    end

    # Atualiza feedback, status e data de entrega
    if @tarefa_aluno.update(feedback: tarefa_aluno_params[:feedback],
                            status: :CONCLUIDA,
                            entregue_em: Time.current)
      render json: format_tarefa_aluno(@tarefa_aluno)
    else
      render json: { errors: @tarefa_aluno.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /minhas-tarefas
  # Retorna todas as tarefas de um aluno, separadas por status
  def minhas_tarefas
    unless current_user.aluno?
      return render json: { error: "Acesso negado" }, status: :forbidden
    end

    aluno = current_user.aluno
    tarefa_alunos = TarefaAluno.includes(tarefa: [ :disciplina, :turma ])
                               .where(aluno_id: aluno.id)

    # Listas separadas por status
    pendentes, atrasadas, concluidas = [], [], []

    tarefa_alunos.each do |ta|
      prazo = ta.tarefa.prazo.in_time_zone("Brasilia").to_date
      hoje = Time.current.in_time_zone("Brasilia").to_date

      tarefa_json = {
        id: ta.tarefa.id,
        nome: ta.tarefa.nome,
        turma: { id: ta.tarefa.turma.id, nome: ta.tarefa.turma.nome },
        disciplina: { id: ta.tarefa.disciplina.id, nome: ta.tarefa.disciplina.nome },
        prazo: ta.tarefa.prazo,
        descricao: ta.tarefa.descricao,
        status: ta.status,
        atrasada: (ta.status == "PENDENTE" && prazo < hoje),
        feedback: ta.feedback
      }

      # Classifica a tarefa em pendentes, atrasadas ou concluidas
      if ta.status == "CONCLUIDA"
        concluidas << tarefa_json
      elsif ta.status == "PENDENTE" && prazo < hoje
        atrasadas << tarefa_json
      else
        pendentes << tarefa_json
      end
    end

    # Retorna resposta completa
    render json: {
      aluno: { id: aluno.id, nome: aluno.user.nome },
      pendentes: pendentes,
      atrasadas: atrasadas,
      concluidas: concluidas
    }
  end

  private

  # Define @tarefa_aluno para update via tarefa_id + aluno_id
  def set_tarefa_aluno_by_ids
    @tarefa_aluno = TarefaAluno.find_by(
      tarefa_id: params[:tarefa_id],
      aluno_id: params[:aluno_id]
    )
    render json: { error: "Tarefa do aluno não encontrada" }, status: :not_found unless @tarefa_aluno
  end

  # Define @tarefa_aluno para show individual
  def set_tarefa_aluno
    @tarefa_aluno = TarefaAluno.includes(tarefa: [ :disciplina, :turma ], aluno: :user)
                               .find_by(aluno_id: params[:aluno_id], tarefa_id: params[:tarefa_id])
    render json: { error: "Tarefa do aluno não encontrada" }, status: :not_found unless @tarefa_aluno
  end

  # Monta JSON agrupando alunos por tarefa
  def format_tarefa_com_alunos(tarefa_alunos)
    tarefa_alunos.group_by(&:tarefa).map do |tarefa, lista|
      hoje = Time.current.in_time_zone("Brasilia").to_date
      {
        id: tarefa.id,
        nome: tarefa.nome,
        turma: { id: tarefa.turma.id, nome: tarefa.turma.nome },
        disciplina: { id: tarefa.disciplina.id, nome: tarefa.disciplina.nome },
        prazo: tarefa.prazo,
        descricao: tarefa.descricao,
        alunos: lista.map do |ta|
          prazo = ta.tarefa.prazo.in_time_zone("Brasilia").to_date
          {
            id: ta.aluno.id,
            nome: ta.aluno.user.nome,
            status: ta.status,
            atrasada: (ta.status == "PENDENTE" && prazo < hoje)
          }
        end
      }
    end.first
  end

  # Monta JSON detalhado para uma tarefa de aluno
  def format_tarefa_aluno(tarefa_aluno)
    prazo = tarefa_aluno.tarefa.prazo.in_time_zone("Brasilia").to_date
    hoje = Time.current.in_time_zone("Brasilia").to_date

    {
      id: tarefa_aluno.id,
      aluno: { id: tarefa_aluno.aluno.id, nome: tarefa_aluno.aluno.user.nome },
      tarefa: {
        id: tarefa_aluno.tarefa.id,
        nome: tarefa_aluno.tarefa.nome,
        turma: { id: tarefa_aluno.tarefa.turma.id, nome: tarefa_aluno.tarefa.turma.nome },
        disciplina: { id: tarefa_aluno.tarefa.disciplina.id, nome: tarefa_aluno.tarefa.disciplina.nome },
        prazo: tarefa_aluno.tarefa.prazo,
        descricao: tarefa_aluno.tarefa.descricao,
        atrasada: (tarefa_aluno.status == "PENDENTE" && prazo < hoje),
        status: tarefa_aluno.status,
        feedback: tarefa_aluno.feedback,
        entregue_em: tarefa_aluno.entregue_em
      }
    }
  end

  # Parâmetros permitidos para update
  def tarefa_aluno_params
    params.require(:tarefa_aluno).permit(:feedback)
  end
end
