import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true); 

      try {
        const token = localStorage.getItem('token'); 

        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const url = 'https://ocp-backend-oman.onrender.com/api/appointments';

       
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.data && response.data.length > 0) {
          setAppointments(response.data); 
        } else {
          setError('No appointments found.'); 
        }
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Unable to load appointments. Please try again later.');
        setLoading(false);
      }
    };

    fetchAppointments(); 
  }, []); 

  const handleNavigation = (sessionType, appointmentId) => {
    if (!appointmentId) {
      alert('Invalid appointment ID.');
      return;
    }

    const appointment = appointments.find(appt => appt._id === appointmentId); 

    if (!appointment) {
      alert('Appointment not found.');
      return;
    }

    switch (sessionType) {
      case 'video_call':
        window.open(`https://meet.jit.si/${appointmentId}`, '_blank'); 
        break;
      case 'chat':
        window.location.href = `/chat/${appointmentId}`; 
        break;
      case 'email':
        window.location.href = `mailto:${appointment.counselor.email}`;
        break;
      default:
        alert('Invalid session type.');
    }
  };

  return (
    <div className="appointments-page max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Scheduled Appointments</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading && <p className="text-center text-gray-500">Loading appointments...</p>}

      <div className="appointments-list">
        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="appointment-card bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-blue-800">
                  {appointment.counselor ? appointment.counselor.name : 'No Counselor Assigned'}
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Specialization:</strong> {appointment.counselor ? appointment.counselor.specialization : 'N/A'}
                </p>
                <p className="text-gray-600 mb-2"><strong>Session Type:</strong> {appointment.sessionType}</p>
                <p className="text-gray-600 mb-2"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-4"><strong>Time:</strong> {appointment.time}</p>

                <div className="flex justify-between">
                  <button
                    onClick={() => handleNavigation(appointment.sessionType, appointment._id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    {appointment.sessionType === 'video_call' && 'Join Video Call'}
                    {appointment.sessionType === 'chat' && 'Start Chat'}
                    {appointment.sessionType === 'email' && 'Send Email'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-center text-gray-500">No appointments scheduled yet.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
