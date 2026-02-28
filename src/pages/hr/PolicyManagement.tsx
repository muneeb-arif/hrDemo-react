import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Paper,
  Alert,
  Divider,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Send as SendIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setPolicyLoading,
  setPolicyAnswer,
  setPolicyError,
  setPolicyQuestion,
} from '../../store/slices/hrSlice';
import { hrApi } from '../../store/api/hrApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';

const PolicyManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { policy } = useAppSelector((state) => state.hr);
  const { user } = useAppSelector((state) => state.auth);
  const [question, setQuestion] = useState('');
  const [policyFiles, setPolicyFiles] = useState<File[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const isHRManager = user?.role === 'HR Manager';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPolicyFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (policyFiles.length === 0) {
      dispatch(setPolicyError('At least one policy file is required'));
      return;
    }

    dispatch(setPolicyLoading(true));
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      policyFiles.forEach((file) => {
        formData.append('policy_files', file);
      });

      const response = await hrApi.uploadPolicies(formData);

      if (response.success) {
        setUploadSuccess(true);
        setPolicyFiles([]);
        setTimeout(() => setUploadSuccess(false), 5000);
      } else {
        dispatch(setPolicyError(response.message || 'Upload failed'));
      }
    } catch (error: any) {
      dispatch(
        setPolicyError(
          error.response?.data?.message || error.message || 'Upload failed'
        )
      );
    } finally {
      dispatch(setPolicyLoading(false));
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      dispatch(setPolicyError('Please enter a question'));
      return;
    }

    dispatch(setPolicyLoading(true));
    dispatch(setPolicyQuestion(question));

    try {
      const response = await hrApi.askPolicyQuestion({ question });

      if (response.success && response.data) {
        dispatch(setPolicyAnswer(response.data.answer));
      } else {
        dispatch(setPolicyError(response.message || 'Failed to get answer'));
      }
    } catch (error: any) {
      dispatch(
        setPolicyError(
          error.response?.data?.message || error.message || 'Failed to get answer'
        )
      );
    } finally {
      dispatch(setPolicyLoading(false));
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Policy Management
      </Typography>

      {isHRManager && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Upload Policy Documents
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Upload PDF policy documents to make them available for AI-powered question answering.
            </Typography>
            <Box>
              <input
                accept=".pdf"
                style={{ display: 'none' }}
                id="policy-upload"
                multiple
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="policy-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mb: 2 }}
                >
                  Upload Policy Files (PDF)
                </Button>
              </label>
              {policyFiles.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {policyFiles.length} file(s) selected
                  </Typography>
                </Box>
              )}
            </Box>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={policy.loading || policyFiles.length === 0}
              sx={{ mt: 2 }}
            >
              {policy.loading ? 'Uploading...' : 'Upload Policies'}
            </Button>
            {uploadSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Policies uploaded successfully!
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      <Divider sx={{ my: 4 }} />

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ask Policy Question
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Ask questions about HR policies. The AI will search through uploaded policy documents to provide answers.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Your Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., What is the leave policy for employees?"
            sx={{ mb: 2 }}
            disabled={policy.loading}
          />
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleAskQuestion}
            disabled={policy.loading || !question.trim()}
          >
            {policy.loading ? 'Asking...' : 'Ask Question'}
          </Button>
        </CardContent>
      </Card>

      {policy.loading && <LoadingSpinner />}

      {policy.error && (
        <ErrorAlert message={policy.error} onClose={() => dispatch(setPolicyError(''))} />
      )}

      {policy.answer && (
        <Paper sx={{ p: 3, mt: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom>
            Answer
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {policy.answer}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default PolicyManagement;
