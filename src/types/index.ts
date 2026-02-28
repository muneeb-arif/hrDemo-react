// User Types
export interface User {
  id: number;
  username: string;
  role: 'HR Manager' | 'Employee';
}

// Auth Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

// CV Evaluation Types
export interface SkillStatus {
  missing: string[];
  absent: string[];
  strong: string[];
}

export interface HireRecommendation {
  recommendation: string;
  emoji: string;
  color: string;
  confidence: number;
  risk_level: string;
}

export interface CVResult {
  name: string;
  score: number;
  evaluation: string;
  skill_scores: Record<string, number>;
  skill_status: SkillStatus;
  hire_recommendation: HireRecommendation;
}

export interface CVEvaluationResponse {
  results: CVResult[];
  executive_kpis: {
    total_candidates: number;
    average_match: number;
    top_score: number;
    top_5_count: number;
  };
}

// Policy Types
export interface PolicyQuestionRequest {
  question: string;
}

export interface PolicyQuestionResponse {
  answer: string;
}

export interface PolicyUploadResponse {
  message: string;
  document_count: number;
  document_ids: number[];
}

// Technical Evaluation Types
export interface TechnicalQuestionResponse {
  questions: string[];
}

export interface QuestionEvaluation {
  question_number: number;
  question: string;
  answer: string;
  score: number;
  feedback: string;
}

export interface TechnicalAnswerEvaluateResponse {
  evaluations: QuestionEvaluation[];
  total_score: number;
  max_score: number;
  overall_feedback: string;
}

// Booking Types
export interface Booking {
  id: number;
  booking_id: string;
  booking_type: 'Service' | 'Test Drive';
  name: string;
  phone: string;
  vehicle_model: string;
  preferred_date?: string;
  created_at: string;
}

export interface BookingCreate {
  booking_type: 'Service' | 'Test Drive';
  name: string;
  phone: string;
  vehicle_model: string;
  preferred_date?: string;
  natural_language?: string;
}

// Chat Types
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  chat_history?: ChatMessage[];
}

export interface ChatResponse {
  response: string;
  intent?: string;
  booking_flow?: boolean;
}
