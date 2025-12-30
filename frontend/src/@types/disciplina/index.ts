export interface Disciplina {
  id: number;
  nome: string
  professor: {
    id: number;
    nome: string;
  };
  turma: {
    id: number;
    nome: string;
  };
}
