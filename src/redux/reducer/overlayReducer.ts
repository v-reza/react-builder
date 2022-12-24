import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SliceState {
  isActive: any;
}

const initialState: SliceState = {
  isActive: null,
};


const overlaySlice = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    setOverlay: (state: SliceState, action: PayloadAction<any>) => {
      state.isActive = action.payload;
    }
  },
});

export const { setOverlay } = overlaySlice.actions;
export default overlaySlice.reducer;