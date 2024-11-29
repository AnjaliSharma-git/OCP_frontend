import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SessionNotesPage = () => {
  const { appointmentId } = useParams(); // Get the appointmentId from the URL
  const [appointment, setAppointment] = useState(null);
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');

  // Fetch the appointment details based on appointmentId
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/appointments/${appointmentId}`)
      .then((response) => {
        setAppointment(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching appointment details:', error.response || error);
        setError('Unable to load appointment details.');
        setLoading(false);
      });
  }, [appointmentId]);
  

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle save notes functionality
  const handleSaveNotes = async () => {
    setSaveMessage('');
    const formData = new FormData();
    formData.append('file', selectedFile); // Attach the file if provided
    formData.append('notes', notes); // Attach the notes text

    try {
      const response = await axios.post(
        `http://localhost:5000/api/session-notes/${appointmentId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setSaveMessage('Notes saved successfully!');
      console.log('Notes saved:', response.data);
    } catch (err) {
      console.error('Error saving notes:', err);
      setSaveMessage('Failed to save notes. Please try again.');
    }
  };

  return (
    <div className="session-notes-page max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      {loading ? (
        <p>Loading session details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold text-center text-blue-600 mb-4">
            Session Notes for {appointment.client ? appointment.client.name : 'Unknown Client'}
          </h1>
          <div className="session-notes mb-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="Write your session notes here..."
              rows="10"
            />
          </div>
          <div className="file-upload mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="file">
              Attach File (optional):
            </label>
            <input
              type="file"
              id="file"
              className="block w-full text-gray-700"
              onChange={handleFileChange}
            />
          </div>
          <button
            onClick={handleSaveNotes}
            className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4"
          >
            Save Notes
          </button>
          {saveMessage && <p className="mt-4 text-center text-green-600">{saveMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default SessionNotesPage;
