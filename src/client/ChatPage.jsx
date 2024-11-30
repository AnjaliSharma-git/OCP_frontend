import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatPage = ({ appointmentId }) => {
  const [messages, setMessages] = useState([]); // Store the chat messages
  const [newMessage, setNewMessage] = useState(''); // Store the input value for the new message
  const [error, setError] = useState(null); // Store error messages

  // Fetch chat messages for a specific appointment
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://ocp-backend-oman.onrender.com/api/chat/${appointmentId}`);
        setMessages(response.data.messages); // Update messages from the API response
      } catch (error) {
        console.error('Error fetching chat messages:', error.message);
        setError('Unable to load chat messages.');
      }
    };

    if (appointmentId) {
      fetchMessages(); // Fetch messages when the appointmentId is available
    }
  }, [appointmentId]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await axios.post('https://ocp-backend-oman.onrender.com/api/chat', {
          appointmentId,
          sender: 'client', // Replace with dynamic sender info if needed
          message: newMessage,
        });
        setMessages((prev) => [...prev, response.data]); // Add the new message to the state
        setNewMessage(''); // Reset the input field
      } catch (error) {
        console.error('Error sending message:', error.message);
        setError('Unable to send your message.');
      }
    }
  };

  return (
    <div className="chat-page max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">Chat with Counselor</h1>

      {/* Display any errors */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Display messages */}
      <div className="chat-messages mb-4 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg shadow-sm">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className={`mb-2 ${msg.sender === 'client' ? 'text-blue-600' : 'text-gray-800'}`}>
              <strong>{msg.sender === 'client' ? 'You' : msg.sender}:</strong> {msg.message}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>

      {/* Input for typing messages */}
      <div className="chat-input flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
