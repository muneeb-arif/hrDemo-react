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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Tabs,
  Tab,
  Chip,
  Alert,
  Divider,
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setBookings,
  setBookingsLoading,
  setBookingsError,
  addBooking,
  setSelectedBooking,
} from '../../store/slices/autosphereSlice';
import { autosphereApi } from '../../store/api/autosphereApi';
import { BookingCreate } from '../../types';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';
import { format } from 'date-fns';

const Bookings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector((state) => state.autosphere);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<BookingCreate>({
    booking_type: 'Service',
    name: '',
    phone: '',
    vehicle_model: '',
    preferred_date: undefined,
    natural_language: '',
  });
  const [searchParams, setSearchParams] = useState({
    booking_id: '',
    phone: '',
    booking_type: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormChange = (field: keyof BookingCreate, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateBooking = async () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.vehicle_model.trim()) {
      dispatch(setBookingsError('Name, phone, and vehicle model are required'));
      return;
    }

    dispatch(setBookingsLoading(true));
    setSuccessMessage('');

    try {
      const bookingData: BookingCreate = {
        booking_type: formData.booking_type,
        name: formData.name,
        phone: formData.phone,
        vehicle_model: formData.vehicle_model,
        preferred_date: formData.preferred_date,
        natural_language: formData.natural_language || undefined,
      };

      const response = await autosphereApi.createBooking(bookingData);

      if (response.success && response.data) {
        dispatch(addBooking(response.data));
        setSuccessMessage(response.message || 'Booking created successfully!');
        setFormData({
          booking_type: 'Service',
          name: '',
          phone: '',
          vehicle_model: '',
          preferred_date: undefined,
          natural_language: '',
        });
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        dispatch(setBookingsError(response.message || 'Failed to create booking'));
      }
    } catch (error: any) {
      dispatch(
        setBookingsError(
          error.response?.data?.message || error.message || 'Failed to create booking'
        )
      );
    } finally {
      dispatch(setBookingsLoading(false));
    }
  };

  const handleSearch = async () => {
    dispatch(setBookingsLoading(true));

    try {
      const params: any = {};
      if (searchParams.booking_id) params.booking_id = searchParams.booking_id;
      if (searchParams.phone) params.phone = searchParams.phone;
      if (searchParams.booking_type) params.booking_type = searchParams.booking_type;

      const response = await autosphereApi.searchBookings(params);

      if (response.success && response.data) {
        dispatch(setBookings(response.data));
      } else {
        dispatch(setBookingsError(response.message || 'Search failed'));
      }
    } catch (error: any) {
      dispatch(
        setBookingsError(
          error.response?.data?.message || error.message || 'Search failed'
        )
      );
    } finally {
      dispatch(setBookingsLoading(false));
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Bookings Management
      </Typography>

      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Create Booking" />
        <Tab label="Search Bookings" />
      </Tabs>

      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Create New Booking
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Booking Type"
                  value={formData.booking_type}
                  onChange={(e) => handleFormChange('booking_type', e.target.value)}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="Service">Service</MenuItem>
                  <MenuItem value="Test Drive">Test Drive</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  sx={{ mb: 2 }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  sx={{ mb: 2 }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Vehicle Model"
                  value={formData.vehicle_model}
                  onChange={(e) => handleFormChange('vehicle_model', e.target.value)}
                  sx={{ mb: 2 }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Preferred Date"
                  value={formData.preferred_date || ''}
                  onChange={(e) => handleFormChange('preferred_date', e.target.value || undefined)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Natural Language (Optional)"
                  value={formData.natural_language}
                  onChange={(e) => handleFormChange('natural_language', e.target.value)}
                  placeholder="e.g., I want to book a service for my Toyota Camry on December 25th"
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateBooking}
              disabled={bookings.loading}
            >
              {bookings.loading ? 'Creating...' : 'Create Booking'}
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 1 && (
        <Box>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Search Bookings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Booking ID"
                    value={searchParams.booking_id}
                    onChange={(e) =>
                      setSearchParams((prev) => ({ ...prev, booking_id: e.target.value }))
                    }
                    placeholder="e.g., AS-20241225-1234"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={searchParams.phone}
                    onChange={(e) =>
                      setSearchParams((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    select
                    label="Booking Type"
                    value={searchParams.booking_type}
                    onChange={(e) =>
                      setSearchParams((prev) => ({ ...prev, booking_type: e.target.value }))
                    }
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="Service">Service</MenuItem>
                    <MenuItem value="Test Drive">Test Drive</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                disabled={bookings.loading}
                sx={{ mt: 2 }}
              >
                {bookings.loading ? 'Searching...' : 'Search'}
              </Button>
            </CardContent>
          </Card>

          {bookings.loading && <LoadingSpinner />}

          {bookings.error && (
            <ErrorAlert
              message={bookings.error}
              onClose={() => dispatch(setBookingsError(null))}
            />
          )}

          {bookings.list.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Booking ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Vehicle Model</TableCell>
                    <TableCell>Preferred Date</TableCell>
                    <TableCell>Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.list.map((booking) => (
                    <TableRow key={booking.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {booking.booking_id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={booking.booking_type}
                          color={booking.booking_type === 'Service' ? 'primary' : 'secondary'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{booking.name}</TableCell>
                      <TableCell>{booking.phone}</TableCell>
                      <TableCell>{booking.vehicle_model}</TableCell>
                      <TableCell>
                        {booking.preferred_date
                          ? format(new Date(booking.preferred_date), 'MMM dd, yyyy')
                          : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {format(new Date(booking.created_at), 'MMM dd, yyyy HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {bookings.list.length === 0 && !bookings.loading && (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No bookings found. Use the search form above to find bookings.
              </Typography>
            </Paper>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Bookings;
