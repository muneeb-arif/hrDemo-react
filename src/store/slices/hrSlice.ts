import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CVEvaluationResponse, PolicyQuestionResponse, TechnicalQuestionResponse, TechnicalAnswerEvaluateResponse } from '../../types';

interface HRState {
  cvEvaluation: {
    results: CVEvaluationResponse | null;
    loading: boolean;
    error: string | null;
  };
  policy: {
    question: string | null;
    answer: string | null;
    loading: boolean;
    error: string | null;
  };
  technical: {
    questions: string[];
    evaluation: TechnicalAnswerEvaluateResponse | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: HRState = {
  cvEvaluation: {
    results: null,
    loading: false,
    error: null,
  },
  policy: {
    question: null,
    answer: null,
    loading: false,
    error: null,
  },
  technical: {
    questions: [],
    evaluation: null,
    loading: false,
    error: null,
  },
};

const hrSlice = createSlice({
  name: 'hr',
  initialState,
  reducers: {
    setCVEvaluationLoading: (state, action: PayloadAction<boolean>) => {
      state.cvEvaluation.loading = action.payload;
    },
    setCVEvaluationResults: (state, action: PayloadAction<CVEvaluationResponse>) => {
      state.cvEvaluation.results = action.payload;
      state.cvEvaluation.loading = false;
      state.cvEvaluation.error = null;
    },
    setCVEvaluationError: (state, action: PayloadAction<string>) => {
      state.cvEvaluation.error = action.payload;
      state.cvEvaluation.loading = false;
    },
    setPolicyQuestion: (state, action: PayloadAction<string>) => {
      state.policy.question = action.payload;
    },
    setPolicyAnswer: (state, action: PayloadAction<string>) => {
      state.policy.answer = action.payload;
      state.policy.loading = false;
      state.policy.error = null;
    },
    setPolicyLoading: (state, action: PayloadAction<boolean>) => {
      state.policy.loading = action.payload;
    },
    setPolicyError: (state, action: PayloadAction<string>) => {
      state.policy.error = action.payload;
      state.policy.loading = false;
    },
    setTechnicalQuestions: (state, action: PayloadAction<string[]>) => {
      state.technical.questions = action.payload;
      state.technical.loading = false;
      state.technical.error = null;
    },
    setTechnicalEvaluation: (state, action: PayloadAction<TechnicalAnswerEvaluateResponse>) => {
      state.technical.evaluation = action.payload;
      state.technical.loading = false;
      state.technical.error = null;
    },
    setTechnicalLoading: (state, action: PayloadAction<boolean>) => {
      state.technical.loading = action.payload;
    },
    setTechnicalError: (state, action: PayloadAction<string>) => {
      state.technical.error = action.payload;
      state.technical.loading = false;
    },
    clearHRState: (state) => {
      return initialState;
    },
  },
});

export const {
  setCVEvaluationLoading,
  setCVEvaluationResults,
  setCVEvaluationError,
  setPolicyQuestion,
  setPolicyAnswer,
  setPolicyLoading,
  setPolicyError,
  setTechnicalQuestions,
  setTechnicalEvaluation,
  setTechnicalLoading,
  setTechnicalError,
  clearHRState,
} = hrSlice.actions;

export default hrSlice.reducer;
