import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Policy as PolicyIcon,
  Quiz as QuizIcon,
  Chat as ChatIcon,
  BookOnline as BookOnlineIcon,
} from '@mui/icons-material';
import { useAppSelector } from '../store/hooks';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const navigationCards = [
    {
      title: 'HR AI Platform',
      description: 'CV Evaluation, Policy Management, and Technical Assessments',
      icon: <DescriptionIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      items: [
        { label: 'CV Evaluation', path: '/hr/cv-evaluation', icon: <DescriptionIcon /> },
        { label: 'Policy Management', path: '/hr/policy', icon: <PolicyIcon />, roles: ['HR Manager'] },
        { label: 'Technical Evaluation', path: '/hr/technical', icon: <QuizIcon />, roles: ['HR Manager'] },
      ],
    },
    {
      title: 'AutoSphere Motors',
      description: 'AI Assistant and Booking Management',
      icon: <ChatIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
      items: [
        { label: 'AI Chat', path: '/autosphere/chat', icon: <ChatIcon /> },
        { label: 'Bookings', path: '/autosphere/bookings', icon: <BookOnlineIcon /> },
      ],
    },
  ];

  const filteredCards = navigationCards.map((card) => ({
    ...card,
    items: card.items.filter(
      (item) => !item.roles || (user && item.roles.includes(user.role))
    ),
  }));

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back, {user?.username}! Choose a section to get started.
      </Typography>

      <Grid container spacing={3}>
        {filteredCards.map((card, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {card.icon}
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    {card.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {card.description}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {card.items.map((item) => (
                    <Button
                      key={item.path}
                      variant="outlined"
                      startIcon={item.icon}
                      onClick={() => navigate(item.path)}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
