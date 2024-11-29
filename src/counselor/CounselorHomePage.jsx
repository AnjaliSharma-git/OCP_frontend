import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CounselorHomePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/appointments') // Modify as per your actual route
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
        setError('Unable to load appointments. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="counselor-home-page max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Counselor Dashboard</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading && <p className="text-center text-gray-500">Loading appointments...</p>}

      <div className="appointments-list">
        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => {
              const clientName = appointment.client?.name || 'Unknown Client';

              // Dynamically render button based on session type
              let actionButton;
              switch (appointment.sessionType) {
                case 'video_call':
                  actionButton = (
                    <button
                      onClick={() => window.open(`https://meet.jit.si/${appointment._id}`, '_blank')}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                      Join Video Call
                    </button>

                  );
                  break;
                case 'chat':
                  actionButton = (
                    <Link
                      to={`/chat/${appointment._id}`}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    >
                      Start Chat
                    </Link>
                  );
                  break;
                case 'email':
                  actionButton = (
                    <a
                      href={`mailto:${appointment.counselor?.email}`}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                      Send Mail
                    </a>
                  );
                  break;
                default:
                  actionButton = (
                    <button
                      onClick={() => alert('Invalid session type.')}
                      className="bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed"
                    >
                      Invalid Session
                    </button>
                  );
              }

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
                    <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Time:</strong> {appointment.time}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={`/session-notes/${appointment._id}`}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    >
                      Session Notes
                    </Link>
                    {actionButton}
                  </div>
                </div>

              );
            })}
          </div>
        ) : (
          !loading && <p className="text-center text-gray-500">No appointments scheduled yet.</p>
        )}
      </div>
    </div>
  );
};

export default CounselorHomePage;
