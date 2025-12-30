"use client";

import FormInput from "@/components/FormInput/FormInput";
import Link from "next/link";
import { z } from "zod";
import Image from "next/image";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { login } from "@/services/authService";

const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  senha: z.string().min(4, "Senha deve ter no mínimo 4 caracteres"),
});

const initialFormData = {
  email: "",
  senha: "",
};

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
  const { errors, formData, handleChange, handleSubmit, isLoading } =
    useFormSubmit<LoginSchema>({
      schema: loginSchema,
      initialData: initialFormData as LoginSchema,
      onSubmit: login,
      redirectUrl: "/home",
    });

  return (
    <div className="flex bg-white min-h-screen flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Image
              alt="Logo"
              src="/logo.png"
              width={128}
              height={128}
              quality={100}
              className="mx-auto h-32 w-auto"
            />
            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
              Entre na sua conta
            </h2>
            <p className="mt-2 text-sm/6 text-gray-500">
              Você é aluno e não possui conta?{" "}
              <Link
                href={`/register`}
                className="font-semibold text-black hover:text-black"
              >
                Realizar cadastro
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                value={formData.email}
                label="Email"
                type="text"
                placeholder="example@email.com"
                name="email"
                error={errors.email}
                handleChange={(value) => handleChange("email", value)}
              />

              <FormInput
                value={formData.senha}
                label="Senha"
                placeholder="******"
                type="password"
                name="senha"
                error={errors.senha}
                handleChange={(value) => handleChange("senha", value)}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="flex cursor-pointer disabled:opacity-80 bg-gray-900 hover:bg-gray-800 focus-visible:outline-gray-900 w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline-offset-2"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          alt="Imagem lateral do Login"
          width={1536}
          quality={100}
          height={1024}
          className="absolute inset-0 size-full object-cover"
          src={"/login_image.png"}
        />
      </div>
    </div>
  );
}
