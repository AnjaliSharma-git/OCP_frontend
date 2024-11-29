import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientSessionNotesPage = () => {
  const [sessionNotes, setSessionNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with the client's ID dynamically fetched from authentication or props
    const fetchSessionNotes = async () => {
      const clientId = 'client123'; // Replace with real client ID
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/session-notes/client/${clientId}`);
        setSessionNotes(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching session notes:', err.response || err);
        setError('Unable to load session notes. Please try again later.');
        setLoading(false);
      }
    };

    fetchSessionNotes();
  }, []);

  return (
    <div className="client-session-notes-page max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-blue-600 mb-4">Your Session Notes</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading session notes...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : sessionNotes.length > 0 ? (
        <ul className="space-y-4">
          {sessionNotes.map((note) => (
            <li key={note._id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
              <p className="text-gray-700 mb-2">
                <strong>Appointment ID:</strong> {note.appointmentId}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Notes:</strong> {note.text || 'No notes available.'}
              </p>
              {note.file && (
                <a
                  href={`http://localhost:5000/uploads/${note.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Attached File
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No session notes available yet.</p>
      )}
    </div>
  );
};

export default ClientSessionNotesPage;
