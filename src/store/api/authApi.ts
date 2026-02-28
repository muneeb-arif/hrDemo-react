import api from '../../services/api';
import { ApiResponse, LoginRequest, LoginResponse } from '../../types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/api/auth/login', credentials);
    return response.data;
  },
};
