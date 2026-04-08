import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Contact from "./pages/Contact";
import MyRegistrations from "./pages/MyRegistrations";
import Certificates from "./pages/Certificates";
import MyEvents from "./pages/MyEvents";
import CheckIn from "./pages/CheckIn";
import CreateEvent from "./pages/CreateEvent";
import AdminPanel from "./pages/AdminPanel";

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/contact" element={<Contact />} />

        {/* Participante */}
        <Route path="/my-registrations" element={
          <ProtectedRoute roles={["participante"]}><MyRegistrations /></ProtectedRoute>
        } />
        <Route path="/certificates" element={
          <ProtectedRoute roles={["participante"]}><Certificates /></ProtectedRoute>
        } />

        {/* Organizador */}
        <Route path="/my-events" element={
          <ProtectedRoute roles={["organizador"]}><MyEvents /></ProtectedRoute>
        } />
        <Route path="/create-event" element={
          <ProtectedRoute roles={["organizador"]}><CreateEvent /></ProtectedRoute>
        } />
        <Route path="/checkin/:eventId" element={
          <ProtectedRoute roles={["organizador"]}><CheckIn /></ProtectedRoute>
        } />

        {/* Admin */}
        <Route path="/admin" element={
          <ProtectedRoute roles={["admin"]}><AdminPanel /></ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;