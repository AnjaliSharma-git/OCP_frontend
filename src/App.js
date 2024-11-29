import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SignupPage from "./components/SignupPage";
import ClientHomePage from "./client/ClientHomePage";
import AppointmentListPage from './client/AppointmentListPage';
import ScheduleAppointmentPage from './client/ScheduleAppointmentPage';
import SessionNotesPage from './counselor/SessionNotesPage';
import PaymentPage from './client/PaymentPage';
import VideoCallPage from './components/VideoCallPage';
import ChatPage from './components/ChatPage';
import AppointmentDetails from './client/AppointmentDetails';
import CounselorHomePage from "./counselor/CounselorHomePage";
import ClientSessionNotesPage from './client/SessionNotesPage';
import PaymentSuccessPage from './components/PaymentSuccessPage'; // The payment success page
import PaymentCancelPage from './components/PaymentCancelPage'; 
const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Client Routes */}
          <Route path="/client-home" element={<ClientHomePage />} />
          <Route path="/appointments" element={<AppointmentListPage />} />
          <Route path="/schedule-appointment" element={<ScheduleAppointmentPage />} />
          <Route path="/client-session-notes" element={<ClientSessionNotesPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/appointments/:appointmentId" element={<AppointmentDetails />} />
          
          {/* Video Call and Chat Routes */}
          <Route path="/video-call/:roomId" element={<VideoCallPage />} />
          <Route path="/chat/:appointmentId" element={<ChatPage />} />
          
          {/* Counselor Routes */}
          <Route path="/counselor-home" element={<CounselorHomePage />} />
          <Route path="/session-notes" element={<SessionNotesPage />} />
          <Route path="/payment-success" component={PaymentSuccessPage} />
        <Route path="/payment-cancel" component={PaymentCancelPage} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
