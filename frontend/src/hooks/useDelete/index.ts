import { ApiResponse } from "@/@types/serviceTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

type UseDeleteProps = {
  deleteFn: () => Promise<ApiResponse<null>>;
  redirectUrl: string;
  successTitle?: string;
  errorTitle?: string;
};

export function useDelete({
  deleteFn,
  redirectUrl,
  successTitle = "Registro deletado",
  errorTitle = "Erro inesperado",
}: UseDeleteProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await deleteFn();

      await Swal.fire({
        icon: response.success ? "success" : "error",
        title: response.success ? successTitle : errorTitle,
        text: response.message,
      });

      return router.push(redirectUrl);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: errorTitle,
        text: "Não foi possível realizar a operação",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDelete,
    loading,
  };
}
