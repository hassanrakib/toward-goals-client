import { ISessionPayload } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  session: ISessionPayload | null;
}

const initialState: IAuthState = {
  session: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<ISessionPayload>) => {
      state.session = action.payload;
    },
    clearSession: (state) => {
      state.session = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;

export default authSlice.reducer;
