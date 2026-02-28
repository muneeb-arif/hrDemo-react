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
import FormattedText from '../../components/common/FormattedText';

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

      {cvEvaluation.results && (() => {
        const results = cvEvaluation.results;
        return (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Evaluation Results
          </Typography>

          {/* Executive KPIs */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {results.executive_kpis.total_candidates}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Candidates
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {results.executive_kpis.average_match.toFixed(1)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Match
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {results.executive_kpis.top_score.toFixed(1)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Top Score
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {results.executive_kpis.top_5_count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Top 5 Candidates
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Top 5 Candidates List */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Top 5 Candidates:
              </Typography>
              <Box component="ol" sx={{ pl: 3, m: 0 }}>
                {results.results.slice(0, 5).map((result, index) => (
                  <Box component="li" key={index} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {result.name}
                      </Typography>
                      <Chip
                        label={`${result.score.toFixed(1)}%`}
                        color={getScoreColor(result.score)}
                        sx={{ fontWeight: 600, ml: 2 }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Horizontal Bar Chart */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Candidate Scores
              </Typography>
              <Box sx={{ position: 'relative', width: '100%' }}>
                {/* Y-axis label */}
                <Box sx={{ position: 'absolute', left: 0, top: '50%', transform: 'rotate(-90deg)', transformOrigin: 'center', whiteSpace: 'nowrap' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    
                  </Typography>
                </Box>
                {/* Chart Container */}
                <Box sx={{ width: '100%', height: `${Math.max(400, results.results.length * 40)}px`, pl: 4 }}>
                  {/* Y-axis labels and bars - showing highest to lowest */}
                  {results.results.map((result, index) => {
                    const maxScore = Math.max(...results.results.map(r => r.score));
                    const barWidth = (result.score / maxScore) * 100;
                    // Color gradient: light blue (10) to dark blue (30+)
                    const colorIntensity = Math.min(1, result.score / 30);
                    const blueShade = `rgba(33, 150, 243, ${0.3 + colorIntensity * 0.7})`;
                    
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                          height: '35px',
                        }}
                      >
                        {/* Candidate name (Y-axis label) */}
                        <Box
                          sx={{
                            width: '250px',
                            minWidth: '250px',
                            pr: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: '0.875rem',
                              fontWeight: 500,
                            }}
                          >
                            {result.name}
                          </Typography>
                        </Box>
                        
                        {/* Bar */}
                        <Box
                          sx={{
                            flex: 1,
                            position: 'relative',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              width: `${barWidth}%`,
                              height: '25px',
                              backgroundColor: blueShade,
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              pr: 1,
                              transition: 'width 0.3s ease',
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                              }}
                            >
                              {result.score.toFixed(1)}%
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
                
                {/* X-axis */}
                <Box sx={{ pl: '250px', mt: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      pt: 1,
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      0
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {Math.max(...results.results.map(r => r.score)).toFixed(0)}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block', fontWeight: 500 }}>
                    Score
                  </Typography>
                </Box>
                
                {/* Legend */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, gap: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Score:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: '40px',
                        height: '12px',
                        backgroundColor: 'rgba(33, 150, 243, 0.3)',
                        borderRadius: '2px',
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      10
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: '40px',
                        height: '12px',
                        backgroundColor: 'rgba(33, 150, 243, 1)',
                        borderRadius: '2px',
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      30+
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Results List */}
          <Grid container spacing={3}>
            {results.results.map((result, index) => (
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

                    <FormattedText text={result.evaluation} />

                    
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        );
      })()}
    </Box>
  );
};

export default CVEvaluation;
