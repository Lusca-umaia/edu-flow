"use client";
import { ROLE, User } from "@/@types/user";
import Loading from "@/components/UI/Loading/Loading";
import { useFetch } from "@/hooks/useFetch";
import { getCurrentUser } from "@/services/authService";
import { ReactNode, createContext, useContext } from "react";

interface UsuarioContextResponse {
  userIsLoading: boolean;
  user: User | null;
  errorInUser: string | null;
  isAluno: boolean;
  isProfessor: boolean;
  isAdministrador: boolean;
}

interface UsuarioProviderProps {
  children: ReactNode;
}

const UsuarioContext = createContext<UsuarioContextResponse | undefined>(
  undefined
);

export const UsuarioProvider = ({ children }: UsuarioProviderProps) => {
  const {
    data: user,
    loading,
    error,
  } = useFetch({
    fetchFn: getCurrentUser,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loading />
      </div>
    );
  }

  const isAluno = user?.role === ROLE.ALUNO;
  const isProfessor = user?.role === ROLE.PROFESSOR;
  const isAdministrador = user?.role === ROLE.ADMINISTRADOR;

  return (
    <UsuarioContext.Provider
      value={{
        errorInUser: error,
        user,
        userIsLoading: loading,
        isAluno,
        isProfessor,
        isAdministrador,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuarioContext = () => {
  const context = useContext(UsuarioContext);

  if (!context) {
    throw new Error("useUsuarioContext must be used within a UsuarioProvider");
  }
  return context;
};
