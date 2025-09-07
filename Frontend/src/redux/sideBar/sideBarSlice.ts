import { createSlice } from "@reduxjs/toolkit";

interface SideBarState {
  isOpen: boolean;
}

const initialState: SideBarState = {
  isOpen: false,
};

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    sideBarShow(state) {
      state.isOpen = true;
    },
    sideBarHide(state) {
      state.isOpen = false;
    },
    toggleSideBar(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { sideBarShow, sideBarHide, toggleSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;
