import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SessionNotesPage = () => {
  const { appointmentId } = useParams(); 
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSaveNotes = async () => {
    if (!notes.trim()) {
      setSaveMessage('Please enter some notes before saving.');
      return;
    }

    setSaveMessage('');
    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile); 
    formData.append('notes', notes); 

    try {
      const response = await axios.post(
        `https://ocp-backend-oman.onrender.com/api/session-notes/${appointmentId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setSaveMessage('Notes saved successfully!');
      console.log('Notes saved:', response.data);

      setNotes('');
      setSelectedFile(null);
    } catch (err) {
      console.error('Error saving notes:', err);
      setSaveMessage('Failed to save notes. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="session-notes-page max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-blue-600 mb-4">Session Notes</h1>

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
        className={`bg-green-500 text-white py-2 px-4 rounded-lg mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading} 
      >
        {loading ? 'Saving...' : 'Save Notes'}
      </button>

      {saveMessage && <p className="mt-4 text-center text-green-600">{saveMessage}</p>}
    </div>
  );
};

export default SessionNotesPage;
