"use client";

import { ApiResponse } from "@/@types/serviceTypes";
import { useCallback, useEffect, useState } from "react";

type FetchFn<T> = () => Promise<ApiResponse<T>>;

interface UseFetchProps<T> {
  fetchFn: FetchFn<T>;
  options?: {
    autoFetch?: boolean;
  };
}

type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useFetch<T>({ fetchFn }: UseFetchProps<T>): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchFn();

      if (response.success) {
        setData(response.data ?? null);
      } else {
        setError(response.message ?? "Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
