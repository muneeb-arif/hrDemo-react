import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage, Booking } from '../../types';

interface AutosphereState {
  chat: {
    messages: ChatMessage[];
    loading: boolean;
    error: string | null;
    bookingFlow: boolean;
  };
  bookings: {
    list: Booking[];
    selected: Booking | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: AutosphereState = {
  chat: {
    messages: [],
    loading: false,
    error: null,
    bookingFlow: false,
  },
  bookings: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
};

const autosphereSlice = createSlice({
  name: 'autosphere',
  initialState,
  reducers: {
    addChatMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.chat.messages.push(action.payload);
    },
    setChatLoading: (state, action: PayloadAction<boolean>) => {
      state.chat.loading = action.payload;
    },
    setChatError: (state, action: PayloadAction<string | null>) => {
      state.chat.error = action.payload;
      state.chat.loading = false;
    },
    setBookingFlow: (state, action: PayloadAction<boolean>) => {
      state.chat.bookingFlow = action.payload;
    },
    clearChat: (state) => {
      state.chat.messages = [];
      state.chat.bookingFlow = false;
      state.chat.error = null;
    },
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings.list = action.payload;
      state.bookings.loading = false;
      state.bookings.error = null;
    },
    setSelectedBooking: (state, action: PayloadAction<Booking | null>) => {
      state.bookings.selected = action.payload;
    },
    setBookingsLoading: (state, action: PayloadAction<boolean>) => {
      state.bookings.loading = action.payload;
    },
    setBookingsError: (state, action: PayloadAction<string | null>) => {
      state.bookings.error = action.payload;
      state.bookings.loading = false;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.list.unshift(action.payload);
    },
  },
});

export const {
  addChatMessage,
  setChatLoading,
  setChatError,
  setBookingFlow,
  clearChat,
  setBookings,
  setSelectedBooking,
  setBookingsLoading,
  setBookingsError,
  addBooking,
} = autosphereSlice.actions;

export default autosphereSlice.reducer;
