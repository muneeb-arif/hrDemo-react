import api from '../../services/api';
import { ApiResponse, CVEvaluationResponse, PolicyQuestionRequest, PolicyQuestionResponse, PolicyUploadResponse, TechnicalAnswerEvaluateRequest, TechnicalAnswerEvaluateResponse } from '../../types';

export const hrApi = {
  evaluateCVs: async (formData: FormData): Promise<ApiResponse<CVEvaluationResponse>> => {
    const response = await api.post<ApiResponse<CVEvaluationResponse>>(
      '/api/hr/cv/evaluate',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  uploadPolicies: async (formData: FormData): Promise<ApiResponse<PolicyUploadResponse>> => {
    const response = await api.post<ApiResponse<PolicyUploadResponse>>(
      '/api/hr/policy/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  askPolicyQuestion: async (question: PolicyQuestionRequest): Promise<ApiResponse<PolicyQuestionResponse>> => {
    const response = await api.post<ApiResponse<PolicyQuestionResponse>>(
      '/api/hr/policy/ask',
      question
    );
    return response.data;
  },

  generateTechnicalQuestions: async (formData: FormData): Promise<ApiResponse<{ questions: string[] }>> => {
    const response = await api.post<ApiResponse<{ questions: string[] }>>(
      '/api/hr/technical/generate-questions',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  evaluateTechnicalAnswers: async (data: TechnicalAnswerEvaluateRequest): Promise<ApiResponse<TechnicalAnswerEvaluateResponse>> => {
    const response = await api.post<ApiResponse<TechnicalAnswerEvaluateResponse>>(
      '/api/hr/technical/evaluate-answers',
      data
    );
    return response.data;
  },
};
