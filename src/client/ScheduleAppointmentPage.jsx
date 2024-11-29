import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import

const ScheduleAppointmentPage = () => {
  const [counselorId, setCounselorId] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [counselors, setCounselors] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch counselors from backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/counselors') // Correct endpoint
      .then((response) => {
        setCounselors(response.data);  // Set counselors data
      })
      .catch((error) => {
        console.error('Error fetching counselors:', error);
        setError('Unable to load counselors. Please try again later.');
      });
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate input fields
    if (!counselorId || !sessionType || !date || !time) {
      setError('All fields are required.');
      return;
    }
  
    // Retrieve clientId from the stored JWT token in localStorage
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);  // Decode the token to get the clientId
    const clientId = decodedToken.id;  // Ensure you're using the correct field for clientId
  
    console.log('Data being sent:', {
      counselorId,
      sessionType,
      date,
      time,
      clientId,  // Correctly sending clientId from decoded token
    });
  
    try {
      const response = await axios.post('http://localhost:5000/api/schedule-appointment', {
        counselorId,
        sessionType,
        date,  // Send date as a separate field
        time,  // Send time as a separate field
        clientId,  // Send clientId correctly
      });
  
      setSuccessMessage(response.data.message);
      setError('');
    } catch (error) {
      console.error('Error scheduling appointment:', error.response ? error.response.data : error);
      setError('Failed to schedule appointment. Please try again.');
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
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Schedule Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleAppointmentPage;
