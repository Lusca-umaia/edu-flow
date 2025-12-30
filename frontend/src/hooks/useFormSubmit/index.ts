"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Option } from "@/components/UI/Select/Select";
import Swal from "sweetalert2";
import { z } from "zod";

type UseFormSubmitProps<T> = {
  schema: z.ZodSchema<T>;
  initialData: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  redirectUrl?: string;
};

export function useFormSubmit<T extends Record<string, unknown>>({
  schema,
  initialData,
  onSubmit,
  redirectUrl,
}: UseFormSubmitProps<T>) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = <K extends keyof T>(name: K, value: T[K]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("passa aqui");

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof T, string>> = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as keyof T;
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    setIsLoading(true);
    const response = await onSubmit(formData);

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Operação realizada com sucesso!",
      });

      if (redirectUrl) router.push(redirectUrl);
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Algo deu errado, tente novamente.",
      });
    }
    setIsLoading(false);
  };

  const populateFormData = (formData: T) => {
    setFormData(formData);
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    setFormData,
    populateFormData,
  };
}
