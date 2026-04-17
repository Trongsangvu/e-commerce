import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError, RejectType } from "./error.util";

export function createAppThunk<Returned, Payload = void>(
  type: string,
  asyncFunc: (payload: Payload) => Promise<Returned>,
) {
  return createAsyncThunk<Returned, Payload, { rejectValue: RejectType }>(
    type,
    async (payload, { rejectWithValue }) => {
      try {
        return await asyncFunc(payload);
      } catch (error) {
        return rejectWithValue(handleAxiosError(error));
      }
    },
  );
}
