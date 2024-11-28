import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SessionNotesPage = () => {
  const [sessionNotes, setSessionNotes] = useState([]);

  useEffect(() => {
    // Fetch session notes
    axios.get('/api/client/session-notes')
      .then((response) => setSessionNotes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Session Notes</h1>
        <ul className="space-y-4">
          {sessionNotes.length > 0 ? sessionNotes.map((note) => (
            <li key={note._id} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p><strong>Session Date:</strong> {note.date}</p>
              <p><strong>Notes:</strong> {note.notes}</p>
            </li>
          )) : (
            <p className="text-center text-gray-600">No session notes available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SessionNotesPage;
