export interface Tarefa {
  id: number;
  nome: string;
  turma: {
    id: number;
    nome: string;
  };
  disciplina: {
    id: number;
    nome: string;
  };
  prazo: string;
  atrasada?: boolean
  descricao: string;
}

export type StatusTarefa = "CONCLUIDA" | "PENDENTE" | "ATRASADA";

export interface TarefaAlunos extends Tarefa {
  alunos: { id: number; nome: string; status: StatusTarefa }[];
}

export interface TarefaAluno extends Tarefa {
  status: StatusTarefa;
  feedback?: string;
}

export interface AlunoTarefas {
  tarefas: TarefaAluno[];
  aluno: {
    id: number;
    nome: string;
  };
}
