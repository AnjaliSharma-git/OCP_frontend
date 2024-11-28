import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SignupPage from "./components/SignupPage";
import ClientHomePage from "./client/ClientHomePage";
import AppointmentListPage from './client/AppointmentListPage';
import ScheduleAppointmentPage from './client/ScheduleAppointmentPage';
import SessionNotesPage from './client/SessionNotesPage';
import PaymentPage from './client/PaymentPage';

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
        <Route path="/session-notes" element={<SessionNotesPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
