import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  session: string | undefined;
}

const initialState: IAuthState = {
  session: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<string>) => {
      state.session = action.payload;
    },
    clearSession: (state) => {
      state.session = undefined;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;

export default authSlice.reducer;
