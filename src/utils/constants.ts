export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const TOKEN_STORAGE_KEY = 'jwt_token';
export const USER_STORAGE_KEY = 'user_data';

export const ROLES = {
  HR_MANAGER: 'HR Manager',
  EMPLOYEE: 'Employee',
} as const;
