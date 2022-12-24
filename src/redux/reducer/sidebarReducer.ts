import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SliceState {
  open: boolean;
}

const initialState: SliceState = {
  open: false,
};


const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebar: (state: SliceState, action: PayloadAction<any>) => {
      state.open = action.payload;
    }
  },
});

export const { setSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;