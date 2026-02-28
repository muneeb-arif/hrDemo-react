import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Paper,
  Chip,
  LinearProgress,
  Alert,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setCVEvaluationLoading,
  setCVEvaluationResults,
  setCVEvaluationError,
} from '../../store/slices/hrSlice';
import { hrApi } from '../../store/api/hrApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';

const CVEvaluation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cvEvaluation } = useAppSelector((state) => state.hr);
  const [jobDescription, setJobDescription] = useState('');
  const [cvFiles, setCvFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCvFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      dispatch(setCVEvaluationError('Job description is required'));
      return;
    }

    if (cvFiles.length === 0) {
      dispatch(setCVEvaluationError('At least one CV file is required'));
      return;
    }

    dispatch(setCVEvaluationLoading(true));

    try {
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      cvFiles.forEach((file) => {
        formData.append('cv_files', file);
      });

      const response = await hrApi.evaluateCVs(formData);

      if (response.success && response.data) {
        dispatch(setCVEvaluationResults(response.data));
      } else {
        dispatch(setCVEvaluationError(response.message || 'Evaluation failed'));
      }
    } catch (error: any) {
      dispatch(
        setCVEvaluationError(
          error.response?.data?.message || error.message || 'Evaluation failed'
        )
      );
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation.includes('Strong Hire')) return 'success';
    if (recommendation.includes('Consider')) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        CV Evaluation
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upload CVs and Job Description
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
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="cv-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                Upload CV Files (PDF/DOCX)
              </Button>
            </label>
            {cvFiles.length > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {cvFiles.length} file(s) selected
                </Typography>
                {cvFiles.map((file, index) => (
                  <Chip
                    key={index}
                    label={file.name}
                    size="small"
                    sx={{ mr: 1, mt: 1 }}
                  />
                ))}
              </Box>
            )}
          </Box>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={cvEvaluation.loading || !jobDescription.trim() || cvFiles.length === 0}
            sx={{ mt: 2 }}
          >
            {cvEvaluation.loading ? 'Evaluating...' : 'Evaluate CVs'}
          </Button>
        </CardContent>
      </Card>

      {cvEvaluation.loading && <LoadingSpinner />}

      {cvEvaluation.error && (
        <ErrorAlert message={cvEvaluation.error} onClose={() => dispatch(setCVEvaluationError(''))} />
      )}

      {cvEvaluation.results && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Evaluation Results
          </Typography>

          {/* Executive KPIs */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {cvEvaluation.results.executive_kpis.total_candidates}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Candidates
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {cvEvaluation.results.executive_kpis.average_match.toFixed(1)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Match
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {cvEvaluation.results.executive_kpis.top_score.toFixed(1)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Top Score
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {cvEvaluation.results.executive_kpis.top_5_count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Top 5 Candidates
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Results List */}
          <Grid container spacing={3}>
            {cvEvaluation.results.results.map((result, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {result.name}
                      </Typography>
                      <Chip
                        label={`${result.score.toFixed(1)}%`}
                        color={getScoreColor(result.score)}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={result.score}
                        color={getScoreColor(result.score)}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={result.hire_recommendation.recommendation}
                        color={getRecommendationColor(result.hire_recommendation.recommendation)}
                        sx={{ fontWeight: 600 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Confidence: {result.hire_recommendation.confidence.toFixed(1)}% | Risk Level: {result.hire_recommendation.risk_level}
                      </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
                      {result.evaluation}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Skill Analysis:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {result.skill_status.strong.length > 0 && (
                          <Alert severity="success" sx={{ mb: 1, flex: 1, minWidth: '200px' }}>
                            <strong>Strong:</strong> {result.skill_status.strong.join(', ')}
                          </Alert>
                        )}
                        {result.skill_status.missing.length > 0 && (
                          <Alert severity="warning" sx={{ mb: 1, flex: 1, minWidth: '200px' }}>
                            <strong>Weak:</strong> {result.skill_status.missing.join(', ')}
                          </Alert>
                        )}
                        {result.skill_status.absent.length > 0 && (
                          <Alert severity="error" sx={{ mb: 1, flex: 1, minWidth: '200px' }}>
                            <strong>Missing:</strong> {result.skill_status.absent.join(', ')}
                          </Alert>
                        )}
                      </Box>
                    </Box>
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

export default CVEvaluation;
