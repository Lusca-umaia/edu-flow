export const ROLE = {
  ADMINISTRADOR: "administrador",
  ALUNO: "aluno",
  PROFESSOR: "professor",
} as const;

export interface User {
  nome: string;
  email: string;
  role: (typeof ROLE)[keyof typeof ROLE];
}
