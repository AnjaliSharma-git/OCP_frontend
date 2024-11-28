import React, { useState, useEffect } from "react";
import axios from "axios";

const ScheduleAppointmentPage = () => {
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState(null);

  // Fetch counselors when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/counselor")  // Make a GET request to fetch counselors
      .then((response) => {
        setCounselors(response.data);  // Set counselors state with the response data
      })
      .catch((error) => {
        console.error("Error fetching counselors:", error);
        setError("Unable to fetch counselors. Please try again later.");
      });
  }, []);

  const handleSubmit = () => {
    const appointmentData = {
      counselorId: selectedCounselor,
      sessionType,
      date,
      time,
      clientId: "12345", // Replace with actual clientId logic
    };

    axios
      .post("http://localhost:5000/api/schedule-appointment", appointmentData)
      .then(() => {
        alert("Appointment scheduled successfully!");
      })
      .catch((error) => {
        console.error("Error scheduling appointment:", error);
        alert("Failed to schedule the appointment. Try again.");
      });
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Schedule Appointment
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <div className="mb-4">
          <label className="block font-semibold mb-2">Select Counselor</label>
          <select
            value={selectedCounselor}
            onChange={(e) => setSelectedCounselor(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Choose a Counselor</option>
            {counselors.map((counselor) => (
              <option key={counselor._id} value={counselor._id}>
                {counselor.name} - {counselor.specialization} ({counselor.experience} years experience)
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Session Type</label>
          <select
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Choose Interaction Mode</option>
            <option value="chat">Chat</option>
            <option value="video_call">Video Call</option>
            <option value="email">Email</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
        >
          Schedule Appointment
        </button>
      </div>
    </div>
  );
};

export default ScheduleAppointmentPage;
