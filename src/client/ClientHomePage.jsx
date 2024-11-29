import React from 'react';
import { Link } from 'react-router-dom';

const ClientHomePage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-300 min-h-screen flex flex-col items-center justify-center py-12 px-6">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-lg">
        <h1 className="text-4xl font-semibold text-center text-blue-700 mb-6">Welcome to Your Dashboard</h1>

        <p className="text-lg text-center text-gray-600 mb-8">
          Manage your appointments, view session notes, and make payments all in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* View Appointments Link */}
          <Link
            to="/appointments"
            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            <span className="text-lg">View Appointments</span>
          </Link>

          {/* Schedule Appointment Link */}
          <Link
            to="/schedule-appointment"
            className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            <span className="text-lg">Schedule Appointment</span>
          </Link>

          {/* Session Notes Link */}
          <Link
            to="/client-session-notes"
            className="flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            <span className="text-lg">Session Notes</span>
          </Link>

          {/* Payment Link */}
          <Link
            to="/payment"
            className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            <span className="text-lg">Payment</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientHomePage;
