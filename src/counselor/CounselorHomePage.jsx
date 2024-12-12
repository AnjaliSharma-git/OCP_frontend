import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'; 

const CounselorHomePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        // Retrieve the token and user information from localStorage
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user) {
          throw new Error('No authentication found');
        }

        // Fetch appointments specifically for the logged-in counselor
        const response = await axios.get(`https://ocp-backend-oman.onrender.com/api/appointments`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError(error.response?.data?.message || 'Unable to load appointments. Please try again later.');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleActionClick = (appointment) => {
    if (appointment.sessionType === 'video_call') {
      window.open(`https://meet.jit.si/${appointment._id}`, '_blank');
    } else if (appointment.sessionType === 'chat') {
      return;
    } else if (appointment.sessionType === 'email') {
      window.location.href = `mailto:${appointment.client?.email}`;
    } else {
      alert('Invalid session type.');
    }
  };

  return (
    <div className="counselor-home-page max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Counselor Dashboard</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading ? (
        <div className="text-center">Loading appointments...</div>
      ) : (
        <div className="appointments-list">
          {appointments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map((appointment) => {
                const clientName = appointment.client?.name || 'Unknown Client';

                return (
                  <div
                    key={appointment._id}
                    className="appointment-card bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-semibold text-blue-800">{clientName}</h3>
                    <p className="text-gray-600 mb-2">
                      <strong>Session Type:</strong> {appointment.sessionType}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>Date:</strong> {format(new Date(appointment.date), 'MMMM dd, yyyy')}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <strong>Time:</strong> {appointment.time}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        to="/session-notes"
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                      >
                        Session Notes
                      </Link>
                      <button
                        onClick={() => handleActionClick(appointment)}
                        className={`${
                          appointment.sessionType === 'chat' ? 'bg-blue-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white py-2 px-4 rounded-lg`}
                      >
                        {appointment.sessionType === 'chat' ? 'Start Chat' : appointment.sessionType === 'video_call' ? 'Join Video Call' : 'Send Mail'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">No appointments scheduled yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CounselorHomePage;
