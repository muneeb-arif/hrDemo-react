import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Chip,
  LinearProgress,
  Alert,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setTechnicalLoading,
  setTechnicalQuestions,
  setTechnicalEvaluation,
  setTechnicalError,
} from '../../store/slices/hrSlice';
import { hrApi } from '../../store/api/hrApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';

const steps = ['Generate Questions', 'Evaluate Answers'];

const TechnicalEvaluation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { technical } = useAppSelector((state) => state.hr);
  const [activeStep, setActiveStep] = useState(0);
  const [jobDescription, setJobDescription] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!jobDescription.trim()) {
      dispatch(setTechnicalError('Job description is required'));
      return;
    }

    if (!cvFile) {
      dispatch(setTechnicalError('CV file is required'));
      return;
    }

    dispatch(setTechnicalLoading(true));

    try {
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      formData.append('cv_file', cvFile);

      const response = await hrApi.generateTechnicalQuestions(formData);

      if (response.success && response.data) {
        dispatch(setTechnicalQuestions(response.data.questions));
        setAnswers(new Array(response.data.questions.length).fill(''));
        setActiveStep(1);
      } else {
        dispatch(setTechnicalError(response.message || 'Failed to generate questions'));
      }
    } catch (error: any) {
      dispatch(
        setTechnicalError(
          error.response?.data?.message || error.message || 'Failed to generate questions'
        )
      );
    } finally {
      dispatch(setTechnicalLoading(false));
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleEvaluateAnswers = async () => {
    if (technical.questions.length === 0) {
      dispatch(setTechnicalError('No questions available'));
      return;
    }

    if (answers.some((answer) => !answer.trim())) {
      dispatch(setTechnicalError('Please provide answers for all questions'));
      return;
    }

    dispatch(setTechnicalLoading(true));

    try {
      const response = await hrApi.evaluateTechnicalAnswers({
        questions: technical.questions,
        answers: answers,
      });

      if (response.success && response.data) {
        dispatch(setTechnicalEvaluation(response.data));
      } else {
        dispatch(setTechnicalError(response.message || 'Evaluation failed'));
      }
    } catch (error: any) {
      dispatch(
        setTechnicalError(
          error.response?.data?.message || error.message || 'Evaluation failed'
        )
      );
    } finally {
      dispatch(setTechnicalLoading(false));
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 16) return 'success';
    if (score >= 10) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Technical Evaluation
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Step 1: Generate Technical Questions
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter the job description here..."
              sx={{ mb: 3 }}
            />
            <Box>
              <input
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                id="cv-upload"
                type="file"
                onChange={handleCvFileChange}
              />
              <label htmlFor="cv-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mb: 2 }}
                >
                  Upload CV File (PDF/DOCX)
                </Button>
              </label>
              {cvFile && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Selected: {cvFile.name}
                  </Typography>
                </Box>
              )}
            </Box>
            <Button
              variant="contained"
              onClick={handleGenerateQuestions}
              disabled={technical.loading || !jobDescription.trim() || !cvFile}
              sx={{ mt: 2 }}
            >
              {technical.loading ? 'Generating...' : 'Generate Questions'}
            </Button>
          </CardContent>
        </Card>
      )}

      {activeStep === 1 && technical.questions.length > 0 && (
        <Box>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Step 2: Evaluate Answers
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Provide answers to the generated questions. Each question is worth 20 points.
              </Typography>
              {technical.questions.map((question, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Question {index + 1}: {question}
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label={`Answer ${index + 1}`}
                    value={answers[index] || ''}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder="Enter your answer here..."
                  />
                </Box>
              ))}
              <Button
                variant="contained"
                onClick={handleEvaluateAnswers}
                disabled={technical.loading || answers.some((answer) => !answer.trim())}
                sx={{ mt: 2 }}
              >
                {technical.loading ? 'Evaluating...' : 'Evaluate Answers'}
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}

      {technical.loading && <LoadingSpinner />}

      {technical.error && (
        <ErrorAlert message={technical.error} onClose={() => dispatch(setTechnicalError(''))} />
      )}

      {technical.evaluation && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Evaluation Results
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Overall Score
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography variant="h4" color="primary">
                    {technical.evaluation.total_score.toFixed(1)} / {technical.evaluation.max_score}
                  </Typography>
                  <Chip
                    label={`${((technical.evaluation.total_score / technical.evaluation.max_score) * 100).toFixed(1)}%`}
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(technical.evaluation.total_score / technical.evaluation.max_score) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {technical.evaluation.overall_feedback}
                </Typography>
              </Paper>
            </CardContent>
          </Card>

          <Grid container spacing={2}>
            {technical.evaluation.evaluations.map((evalItem, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Question {evalItem.question_number}
                      </Typography>
                      <Chip
                        label={`${evalItem.score.toFixed(1)}/20`}
                        color={getScoreColor(evalItem.score)}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Question:</strong> {evalItem.question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      <strong>Answer:</strong> {evalItem.answer}
                    </Typography>
                    <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        <strong>Feedback:</strong> {evalItem.feedback}
                      </Typography>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default TechnicalEvaluation;
