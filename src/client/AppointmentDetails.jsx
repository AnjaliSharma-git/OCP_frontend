import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AppointmentDetails = () => {
  const { appointmentId } = useParams(); 
  const [appointment, setAppointment] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://ocp-backend-oman.onrender.com/api/appointments/${appointmentId}`)
      .then((response) => {
        setAppointment(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching appointment:', error);
        setError('Unable to fetch appointment details. Please try again later.'); 
        setLoading(false);
      });
  }, [appointmentId]); 
  if (loading) {
    return <p className="text-center text-gray-500">Loading appointment details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="appointment-details max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-blue-600 mb-4">Appointment Details</h1>
      {appointment ? (
        <div>
          <p className="mb-2">
            <strong className="text-gray-700">Counselor:</strong> {appointment.counselor.name}
          </p>
          <p className="mb-2">
            <strong className="text-gray-700">Email:</strong> {appointment.counselor.email}
          </p>
          <p className="mb-2">
            <strong className="text-gray-700">Session Type:</strong>{' '}
            {appointment.sessionType.replace('_', ' ')}
          </p>
          <p className="mb-2">
            <strong className="text-gray-700">Date:</strong>{' '}
            {new Date(appointment.date).toLocaleDateString()}
          </p>
          <p className="mb-2">
            <strong className="text-gray-700">Time:</strong> {appointment.time}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No appointment details available.</p>
      )}
    </div>
  );
};

export default AppointmentDetails;
