// CounselorHomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CounselorHomePage = () => {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    // Fetch counselor profile and appointments
    axios.get('/api/counselor/profile')
      .then((response) => setProfile(response.data))
      .catch((error) => console.error(error));

    axios.get('/api/counselor/appointments')
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSetAvailability = () => {
    const slotData = { date: '2024-12-01', time: '10:00' };
    axios.post('/api/counselor/set-availability', slotData)
      .then(() => {
        alert('Availability updated');
        setAvailableSlots([...availableSlots, slotData]);
      })
      .catch((err) => {
        console.error(err);
        alert('Error setting availability');
      });
  };

  return (
    <div>
      <h1>Welcome, {profile?.name}</h1>
      <h2>Your Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            {appointment.sessionType} with Client {appointment.clientId}
          </li>
        ))}
      </ul>

      <h2>Set Your Availability</h2>
      <button onClick={handleSetAvailability}>Set Availability</button>
    </div>
  );
};

export default CounselorHomePage;
