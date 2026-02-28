import api from '../../services/api';
import { ApiResponse, ChatRequest, ChatResponse, BookingCreate, Booking } from '../../types';

export const autosphereApi = {
  chat: async (request: ChatRequest): Promise<ApiResponse<ChatResponse>> => {
    const response = await api.post<ApiResponse<ChatResponse>>('/api/autosphere/chat', request);
    return response.data;
  },

  createBooking: async (booking: BookingCreate): Promise<ApiResponse<Booking>> => {
    const response = await api.post<ApiResponse<Booking>>('/api/autosphere/bookings', booking);
    return response.data;
  },

  searchBookings: async (params: {
    booking_id?: string;
    phone?: string;
    booking_type?: string;
  }): Promise<ApiResponse<Booking[]>> => {
    const response = await api.get<ApiResponse<Booking[]>>('/api/autosphere/bookings', { params });
    return response.data;
  },

  getBooking: async (bookingId: string): Promise<ApiResponse<Booking>> => {
    const response = await api.get<ApiResponse<Booking>>(`/api/autosphere/bookings/${bookingId}`);
    return response.data;
  },
};
