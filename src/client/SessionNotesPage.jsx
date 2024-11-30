import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientSessionNotesPage = () => {
  const [sessionNotes, setSessionNotes] = useState([]); // Holds the session notes data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Stores error messages

  // Fetch session notes from the backend API
  useEffect(() => {
    const fetchSessionNotes = async () => {
      try {
        setLoading(true); // Start loading

        const token = localStorage.getItem('token'); // Retrieve token from local storage
        if (!token) {
          throw new Error('You must be logged in to view session notes.');
        }

        const response = await axios.get('http://localhost:5000/api/session-notes', {
          headers: { Authorization: `Bearer ${token}` }, // Include token in the Authorization header
        });

        setSessionNotes(response.data); // Update state with fetched data
        setError(null); // Clear any existing errors
      } catch (err) {
        console.error('Error fetching session notes:', err.response || err);
        const errorMessage =
          err.response?.data?.message ||
          'Unable to load session notes. Please try again later.';
        setError(errorMessage); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchSessionNotes(); // Fetch session notes on component mount
  }, []);

  return (
    <div className="client-session-notes-page max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-blue-600 mb-4">
        Your Session Notes
      </h1>

      {/* Render content based on state */}
      {loading ? (
        <p className="text-center text-gray-500">Loading session notes...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : sessionNotes.length > 0 ? (
        <ul className="space-y-4">
          {sessionNotes.map((note) => (
            <li
              key={note._id}
              className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-800 mb-2">
                <strong>Notes:</strong> {note.text || 'No text notes available.'}
              </p>
              {/* Render file attachment if available */}
              {note.file && (
                <a
                  href={`http://localhost:5000/uploads/${note.file}`} // Adjust this path if necessary
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
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
