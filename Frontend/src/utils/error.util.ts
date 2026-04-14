import { AxiosError } from "axios";

export type RejectType = {
  message?: string;
  status?: number;
};

export const handleAxiosError = (error: unknown): RejectType => {
  const err = error as AxiosError<{ message: string }>;

  return {
    message:
      err.response?.data?.message || err.message || "Something went wrong",
    status: err.response?.status,
  };
};
