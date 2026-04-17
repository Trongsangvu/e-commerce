import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  current: string;
  child?: string;
}

const initialState: AppState = {
  current: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setState: (
      state,
      action: PayloadAction<{ state: string; child?: string }>,
    ) => {
      state.current = action.payload.state;
      state.child = action.payload.child;
    },
  },
});

export const { setState } = appSlice.actions;
export default appSlice.reducer;
