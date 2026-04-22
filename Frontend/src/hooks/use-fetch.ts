import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

interface UseFetchProps<T> {
  queryKey: QueryKey;
  queryFn: () => Promise<T>;
  enabled?: boolean;
  options?: UseQueryOptions<T>;
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
    ...options,
  });
};
