import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';  // Corrected import for jwt-decode

const ScheduleAppointmentPage = () => {
  const [counselorId, setCounselorId] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [counselors, setCounselors] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch counselors from backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing!');
      setError('You must be logged in to schedule an appointment.');
      setLoading(false);
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Debug: Inspect token structure
      if (!decodedToken || !decodedToken.id) {
        console.error('Decoded token is invalid or missing client ID!');
        setError('Invalid token. Please log in again.');
        setLoading(false);
        return;
      }
  
      // Proceed to fetch counselors if token is valid
      axios
        .get('http://localhost:5000/api/counselors')
        .then((response) => {
          setCounselors(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching counselors:', error);
          setError('Unable to load counselors. Please try again later.');
          setLoading(false);
        });
    } catch (err) {
      console.error('Error decoding token:', err);
      setError('Error decoding token. Please log in again.');
      setLoading(false);
    }
  }, []);
  

  // Automatically clear messages after 5 seconds
  useEffect(() => {
    if (error || successMessage) {
      const timeout = setTimeout(() => {
        setError('');
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [error, successMessage]);

  // Validate date and time
  const validateDateTime = () => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    if (selectedDateTime <= now) {
      setError('You cannot schedule an appointment in the past.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!counselorId || !sessionType || !date || !time) {
      setError('All fields are required.');
      return;
    }
  
    if (!validateDateTime()) return;
  
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const clientId = decodedToken.id;
  
    setIsSubmitting(true);
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/schedule-appointment',
        {
          counselor: counselorId, // Corrected from counselorId to counselor
          sessionType,
          date,
          time,
          clientId
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setSuccessMessage(response.data.message);
      setError('');
    } catch (error) {
      console.error(
        'Error scheduling appointment:',
        error.response ? error.response.data : error
      );
      setError(error.response?.data?.message || 'Failed to schedule appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
   

  return (
    <div className="schedule-appointment-page max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Schedule Appointment</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Counselor Dropdown */}
        <div className="mb-4">
          <label htmlFor="counselorId" className="block text-gray-700">Select Counselor</label>
          {loading ? (
            <p className="text-center text-gray-500">Loading counselors...</p>
          ) : (
            <select
              id="counselorId"
              value={counselorId}
              onChange={(e) => setCounselorId(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            >
              <option value="">Select counselor</option>
              {counselors.map((counselor) => (
                <option key={counselor._id} value={counselor._id}>
                  {counselor.name} - {counselor.specialization}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Session Type Dropdown */}
        <div className="mb-4">
          <label htmlFor="sessionType" className="block text-gray-700">Session Type</label>
          <select
            id="sessionType"
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg"
          >
            <option value="">Select session type</option>
            <option value="video_call">Video Call</option>
            <option value="chat">Chat</option>
            <option value="email">Email</option>
          </select>
        </div>

        {/* Date Input */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg"
          />
        </div>

        {/* Time Input */}
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700">Time</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded-lg ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleAppointmentPage;
