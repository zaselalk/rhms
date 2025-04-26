interface authState {
  isAuthenticated: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
}
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: authState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ id: number; name: string; email: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// export actions
export const { login, logout } = authSlice.actions;
// export reducer
export default authSlice.reducer;
