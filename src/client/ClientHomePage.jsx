import React from "react";
import { Link } from "react-router-dom";

const ClientHomePage = () => {
  const userName = "John"; 

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-300 min-h-screen flex flex-col items-center justify-center py-12 px-6 relative">
      <Link
        to="/logout"
        className="absolute top-4 right-4 text-red-500 font-medium hover:underline"
      >
        Logout
      </Link>

      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-lg">
        <header>
          <h1 className="text-4xl font-semibold text-center text-blue-700 mb-6">
            Welcome, {userName}!
          </h1>
        </header>

        <p className="text-lg text-center text-gray-600 mb-8">
          Manage your appointments, view session notes, and make payments all in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/appointments"
            aria-label="View your appointments"
            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out hover:shadow-xl"
          >
            <span className="text-lg">View Appointments</span>
          </Link>

          <Link
            to="/schedule-appointment"
            aria-label="Schedule a new appointment"
            className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out hover:shadow-xl"
          >
            <span className="text-lg">Schedule Appointment</span>
          </Link>

          <Link
            to="/client-session-notes"
            aria-label="View your session notes"
            className="flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out hover:shadow-xl"
          >
            <span className="text-lg">Session Notes</span>
          </Link>

          <Link
            to="/payment"
            aria-label="Make a payment"
            className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out hover:shadow-xl"
          >
            <span className="text-lg">Payment</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientHomePage;
