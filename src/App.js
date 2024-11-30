import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SignupPage from "./components/SignupPage";

// Client-related pages
import ClientHomePage from "./client/ClientHomePage";
import AppointmentListPage from './client/AppointmentListPage';
import ScheduleAppointmentPage from './client/ScheduleAppointmentPage';
import ClientSessionNotesPage from './client/SessionNotesPage';
import PaymentPage from './client/PaymentPage';
import AppointmentDetails from './client/AppointmentDetails';

// Counselor-related pages
import CounselorHomePage from "./counselor/CounselorHomePage";
import SessionNotesPage from './counselor/SessionNotesPage';

// Video and Chat related pages
import VideoCallPage from './components/VideoCallPage';
import ChatPage from './components/ChatPage';

// Payment success and cancel pages
import PaymentSuccessPage from './components/PaymentSuccessPage'; 
import PaymentCancelPage from './components/PaymentCancelPage'; 

const App = () => {
  return (
    <Router>
      {/* Navbar component */}
      <Navbar />

      <div>
        {/* Define all Routes */}
        <Routes>
          {/* Home Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Client Routes */}
          <Route path="/client-home" element={<ClientHomePage />} />
          <Route path="/appointments" element={<AppointmentListPage />} />
          <Route path="/schedule-appointment" element={<ScheduleAppointmentPage />} />
          <Route path="/client-session-notes" element={<ClientSessionNotesPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/appointments/:appointmentId" element={<AppointmentDetails />} />

          {/* Video and Chat Routes */}
          <Route path="/video-call/:roomId" element={<VideoCallPage />} />
          <Route path="/chat/:appointmentId" element={<ChatPage />} />

          {/* Counselor Routes */}
          <Route path="/counselor-home" element={<CounselorHomePage />} />
          <Route path="/session-notes" element={<SessionNotesPage />} />

          {/* Payment Success and Cancel Routes */}
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-cancel" element={<PaymentCancelPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
