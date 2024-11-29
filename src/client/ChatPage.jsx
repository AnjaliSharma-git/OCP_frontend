import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatPage = ({ appointmentId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/chat/${appointmentId}`)
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((error) => {
        console.error('Error fetching chat messages:', error.message);
        setError('Unable to load chat messages.');
      });
  }, [appointmentId]);
  

  const handleSendMessage = () => {
    axios
      .post('http://localhost:5000/api/chat', {
        appointmentId,
        sender: 'client', // Replace with dynamic sender info
        message: newMessage,
      })
      .then((response) => {
        setMessages((prev) => [...prev, response.data]);
        setNewMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <div className="chat-page">
      <h1 className="text-2xl font-bold">Chat</h1>
      <div className="chat-messages">
        {messages.map((msg) => (
          <p key={msg._id}>
            <strong>{msg.sender}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
