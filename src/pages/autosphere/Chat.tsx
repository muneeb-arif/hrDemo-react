import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  Avatar,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Send as SendIcon, SmartToy as BotIcon, Person as PersonIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addChatMessage,
  setChatLoading,
  setChatError,
  setBookingFlow,
} from '../../store/slices/autosphereSlice';
import { autosphereApi } from '../../store/api/autosphereApi';
import { ChatMessage } from '../../types';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const { chat } = useAppSelector((state) => state.autosphere);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages]);

  const handleSend = async () => {
    if (!message.trim() || chat.loading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
    };

    dispatch(addChatMessage(userMessage));
    setMessage('');
    dispatch(setChatLoading(true));
    dispatch(setChatError(null));

    try {
      const chatHistory = chat.messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await autosphereApi.chat({
        message: userMessage.content,
        chat_history: chatHistory,
      });

      if (response.success && response.data) {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.data.response,
        };

        dispatch(addChatMessage(assistantMessage));
        dispatch(setBookingFlow(response.data.booking_flow || false));

        // Booking flow is handled by the state, no need to show error
      } else {
        dispatch(setChatError(response.message || 'Failed to get response'));
      }
    } catch (error: any) {
      dispatch(
        setChatError(
          error.response?.data?.message || error.message || 'Failed to get response'
        )
      );
    } finally {
      dispatch(setChatLoading(false));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        AutoSphere AI Chat
      </Typography>

      <Card sx={{ height: { xs: 'calc(100vh - 200px)', md: 'calc(100vh - 300px)' }, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, overflow: 'auto', pb: 2 }}>
          {chat.messages.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
              }}
            >
              <BotIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Start a conversation with AutoSphere AI
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Ask about our services, book appointments, or get help with your vehicle
              </Typography>
            </Box>
          )}

          {chat.messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: 1,
                  maxWidth: '70%',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: msg.role === 'user' ? 'primary.main' : 'secondary.main',
                    width: 32,
                    height: 32,
                  }}
                >
                  {msg.role === 'user' ? <PersonIcon fontSize="small" /> : <BotIcon fontSize="small" />}
                </Avatar>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: msg.role === 'user' ? 'primary.main' : 'grey.100',
                    color: msg.role === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          ))}

          {chat.loading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'start', gap: 1 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                  <BotIcon fontSize="small" />
                </Avatar>
                <Paper sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
                  <CircularProgress size={20} />
                </Paper>
              </Box>
            </Box>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          {chat.error && (
            <ErrorAlert
              message={chat.error}
              onClose={() => dispatch(setChatError(null))}
            />
          )}
          {chat.bookingFlow && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Booking flow is active. You can create a booking or continue chatting.
            </Alert>
          )}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={chat.loading}
              variant="outlined"
              size="small"
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={chat.loading || !message.trim()}
              startIcon={chat.loading ? <CircularProgress size={20} /> : <SendIcon />}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Chat;
