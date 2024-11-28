import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentListPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch client appointments
    axios.get('/api/client/appointments')
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Your Appointments</h1>
        <ul className="space-y-4">
          {appointments.length > 0 ? appointments.map((appointment) => (
            <li key={appointment._id} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p><strong>Session Type:</strong> {appointment.sessionType}</p>
              <p><strong>Counselor:</strong> {appointment.counselorId}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
            </li>
          )) : (
            <p className="text-center text-gray-600">No appointments scheduled.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AppointmentListPage;
