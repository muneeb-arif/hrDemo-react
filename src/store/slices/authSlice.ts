import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginRequest, ApiResponse, LoginResponse } from '../../types';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../../utils/constants';
import api from '../../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Load auth state from sessionStorage on init
const loadAuthState = (): Partial<AuthState> => {
  const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
  const userStr = sessionStorage.getItem(USER_STORAGE_KEY);
  
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      return { token, user, isAuthenticated: true };
    } catch (e) {
      // Invalid user data, clear storage
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage.removeItem(USER_STORAGE_KEY);
    }
  }
  
  return {};
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse<LoginResponse>>('/api/auth/login', credentials);
      
      if (response.data.success && response.data.data) {
        const { token, user } = response.data.data;
        
        // Store in sessionStorage
        sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
        sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        
        return { token, user };
      } else {
        return rejectWithValue(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    ...loadAuthState(),
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // Clear sessionStorage
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage.removeItem(USER_STORAGE_KEY);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
