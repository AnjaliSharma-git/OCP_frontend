import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChatPage = () => {
  const { appointmentId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');  // Get the token from sessionStorage
  
    if (!token) {
      setError('Unauthorized: No token found');
      return;
    }
  
    // Fetch chat messages for the given appointmentId with the token in the headers
    axios
      .get(`https://ocp-backend-oman.onrender.com/api/chat/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
        },
      })
      .then((response) => {
        setMessages(response.data.messages || []);
      })
      .catch((err) => {
        console.error('Error fetching chat messages:', err);
        setError('Unable to load chat messages.');
      });
  }, [appointmentId]);
  

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

    if (!token) {
      setError('Unauthorized: No token found');
      return;
    }

    axios
      .post(
        `https://ocp-backend-oman.onrender.com/api/chat/${appointmentId}`,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send the token when posting a message
          },
        }
      )
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage('');
      })
      .catch((err) => {
        console.error('Error sending message:', err);
        setError('Unable to send message.');
      });
  };

  return (
    <div className="chat-page max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Chat</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div
        ref={chatContainerRef}
        className="chat-messages h-80 overflow-y-scroll bg-gray-100 p-4 rounded-lg mb-4"
      >
        {messages.map((msg, index) => (
          <div key={index} className="message my-2">
            <p className="text-sm text-gray-600">{msg.sender}: {msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
