import { SerializedError } from "@reduxjs/toolkit";

export interface AsyncState {
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

export const pending = <T extends AsyncState>(state: T) => {
  state.loading = true;
  state.error = null;
  state.status = "loading";
};

export const rejected = <T extends AsyncState>(
  state: T,
  action: {
    payload?: { message?: string };
    error?: SerializedError;
  },
) => {
  state.loading = false;
  state.status = "failed";
  state.error = action.payload?.message || "Something went wrong";
};
