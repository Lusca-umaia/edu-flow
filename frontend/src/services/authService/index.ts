import { AlunoSchema } from "@/app/(public)/register/utils";
import api from "../api";
import Cookies from "js-cookie";
import { User } from "@/@types/user";
import { ApiResponse } from "@/@types/serviceTypes";

interface Login {
  email: string;
  senha: string;
}

export async function login(formData: Login) {
  const { email, senha } = formData;
  try {
    const response = await api.post(`/auth/login`, {
      email,
      password: senha,
    });

    const token = response.data?.token;

    if (token) {
      Cookies.set("token", token, {
        expires: 7,
        secure: true,
        sameSite: "lax",
      });
    }

    return {
      success: true,
      data: null,
      message: "Usuário autenticado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Credenciais inválidas!",
    };
  }
}

export async function register(formData: AlunoSchema) {
  const { email, matricula, nome, senha, turmaId } = formData;
  try {
    const response = await api.post(`/auth/register`, {
      email,
      matricula,
      nome,
      password: senha,
      turma_id: turmaId,
    });

    const token = response.data?.token;

    if (token) {
      Cookies.set("token", token, {
        expires: 7,
        secure: true,
        sameSite: "lax",
      });
    }

    return {
      success: true,
      data: null,
      message: "Aluno cadastrado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Erro ao cadastrar aluno!",
    };
  }
}

export async function logout() {
  Cookies.remove("token");
}

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  try {
    const response = await api.get(`/me`);

    return {
      success: true,
      data: response.data,
      message: "Usuário obitido com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao buscar usuário!",
    };
  }
}
