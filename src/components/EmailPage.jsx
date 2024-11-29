import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EmailPage = () => {
  const { counselorEmail } = useParams(); // Counselor's email address
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    window.open(
      `mailto:${counselorEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(message)}`,
      "_self"
    );
  };

  return (
    <div className="email-page bg-gradient-to-b from-yellow-100 to-yellow-300 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-yellow-600 mb-4">Send Email</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <button
          onClick={sendEmail}
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 w-full"
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default EmailPage;
