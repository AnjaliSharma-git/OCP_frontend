import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AppointmentDetails = () => {
  const { appointmentId } = useParams(); // Fetch appointmentId from the URL
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/appointments/${appointmentId}`)
      .then((response) => {
        setAppointment(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching appointment:', error);
        setError('Unable to fetch appointment details. Please try again.');
        setLoading(false);
      });
  }, [appointmentId]);

  if (loading) {
    return <p>Loading appointment details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="appointment-details max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-blue-600 mb-4">Appointment Details</h1>
      {appointment ? (
        <div>
          <p><strong>Counselor:</strong> {appointment.counselor.name}</p>
          <p><strong>Email:</strong> {appointment.counselor.email}</p>
          <p><strong>Session Type:</strong> {appointment.sessionType}</p>
          <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
        </div>
      ) : (
        <p>No appointment details available.</p>
      )}
    </div>
  );
};

export default AppointmentDetails;
