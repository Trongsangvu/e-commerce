import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

interface UseFetchProps<T, TError = Error> {
  queryKey: QueryKey;
  queryFn: () => Promise<T>;
  enabled?: boolean;
  options?: UseQueryOptions<T>;
  onError?: (error: TError) => void;
}

export const useFetch = <T>({
  queryKey,
  queryFn,
  enabled = true,
  options,
}: UseFetchProps<T>) => {
  return useQuery<T>({
    queryKey,
    queryFn,
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    ...options,
  });
};
