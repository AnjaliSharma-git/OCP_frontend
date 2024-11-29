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

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/client-home" element={<ClientHomePage />} />
          <Route path="/appointments" element={<AppointmentListPage />} />
          <Route path="/schedule-appointment" element={<ScheduleAppointmentPage />} />
          <Route path="/session-notes/:appointmentId" element={<SessionNotesPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/video-call/:roomId" element={<VideoCallPage />} />          <Route path="/chat/:appointmentId" element={<ChatPage />} />
          <Route path="/appointments/:appointmentId" element={<AppointmentDetails />} />
          <Route path="/counselor-home" element={<CounselorHomePage />} />
          <Route path="/client-session-notes" element={<ClientSessionNotesPage />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
