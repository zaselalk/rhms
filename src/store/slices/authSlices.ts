interface authUserState {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

interface authState {
  isAuthenticated: boolean;
  user: authUserState | null;
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
    login: (state, action: PayloadAction<authUserState>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    changeName: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.name = action.payload;
      }
    },
  },
});

// export actions
export const { login, logout, changeName } = authSlice.actions;
// export reducer
export default authSlice.reducer;
