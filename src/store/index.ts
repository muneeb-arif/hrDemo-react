import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import hrReducer from './slices/hrSlice';
import autosphereReducer from './slices/autosphereSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hr: hrReducer,
    autosphere: autosphereReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
