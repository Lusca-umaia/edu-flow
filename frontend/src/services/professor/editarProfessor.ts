import { ProfessorEditSchema } from "@/app/(private)/(professores)/utils";
import api from "../api";

interface EditarProfessorProps {
  professorId: number | string;
  formData: ProfessorEditSchema;
}

export async function editarProfessor({
  formData,
  professorId,
}: EditarProfessorProps) {
  const { cpf, email, nome } = formData;

  try {
    await api.put(`/professors/${professorId}`, {
      cpf,
      email,
      nome,
    });

    return {
      success: true,
      data: null,
      message: "Professor editado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao editar professor!",
    };
  }
}
