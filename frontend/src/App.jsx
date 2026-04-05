import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import SubmitComplaint from './pages/SubmitComplaint';
import MyComplaints from './pages/MyComplaints';
import ComplaintMap from './pages/ComplaintMap';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AIIntelligencePage from './pages/AIIntelligencePage';
import AIChatbot from './components/AIChatbot';
import './adaptive.css';

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <div className={`min-h-screen bg-slate-50 ${user?.age > 50 ? 'adaptive-active' : ''}`}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
           <>
             <Navbar user={user} setUser={setUser} />
             <main className="w-full">
               <LandingPage />
             </main>
           </>
        } />
        <Route path="/features" element={
           <>
             <Navbar user={user} setUser={setUser} />
             <main className="w-full">
               <FeaturesPage />
             </main>
           </>
        } />
        <Route path="/how-it-works" element={
           <>
             <Navbar user={user} setUser={setUser} />
             <main className="w-full">
               <HowItWorksPage />
             </main>
           </>
        } />
        <Route path="/ai-intelligence" element={
           <>
             <Navbar user={user} setUser={setUser} />
             <main className="w-full">
               <AIIntelligencePage />
             </main>
           </>
        } />
        <Route path="/login" element={
           <>
             <Navbar user={user} setUser={setUser} />
             <main className="w-full">
               <LoginPage setUser={setUser} />
             </main>
           </>
        } />
        <Route path="/register" element={
           <>
             <Navbar user={user} setUser={setUser} />
             <main className="w-full">
               <RegisterPage setUser={setUser} />
             </main>
           </>
        } />

        {/* Role-based Dashboards */}
        <Route path="/user" element={<PrivateRoute role="USER"><DashboardLayout user={user} setUser={setUser} /></PrivateRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard user={user} />} />
          <Route path="submit-complaint" element={<SubmitComplaint user={user} />} />
          <Route path="my-complaints" element={<MyComplaints user={user} />} />
          <Route path="complaint-map" element={<ComplaintMap user={user} />} />
          <Route path="voice-assistant" element={<VoiceAssistantPage user={user} />} />
          <Route path="feedback" element={<Feedback user={user} />} />
          <Route path="profile" element={<Profile user={user} />} />
        </Route>

        <Route path="/staff/*" element={<PrivateRoute role="STAFF"><DashboardLayout user={user} setUser={setUser} /></PrivateRoute>}>
          <Route path="*" element={<StaffDashboard user={user} />} />
        </Route>

        <Route path="/admin/*" element={<PrivateRoute role="ADMIN"><DashboardLayout user={user} setUser={setUser} /></PrivateRoute>}>
          <Route path="*" element={<AdminDashboard user={user} />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AIChatbot />
    </div>
  );
};

export default App;



















