import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Index from './pages/Index.jsx';
import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Eventos from './pages/Eventos.jsx';
import Inscricoes from './pages/Inscricoes.jsx';
import CheckIn from './pages/CheckIn.jsx';
import Certificados from './pages/Certificados.jsx';
import Relatorios from './pages/Relatorios.jsx';
import Administradores from './pages/Administradores.jsx';
import NotFound from './pages/NotFound.jsx';
import {
  mockEvents, mockEnrollments, mockCheckIns, mockAdmins
} from './data/mockData.js';

// Context global para compartilhar estado entre páginas
export const AppContext = createContext(null);
export const useAppContext = () => useContext(AppContext);

const App = () => {
  const [events, setEvents]           = useState(mockEvents);
  const [enrollments, setEnrollments] = useState(mockEnrollments);
  const [checkIns, setCheckIns]       = useState(mockCheckIns);
  const [admins, setAdmins]           = useState(mockAdmins);

  // Quando uma inscrição é aprovada, ela fica elegível para check-in.
  // Quando o check-in é feito, o participante entra na lista de certificados automaticamente.
  const approveEnrollment = (enrollmentId) => {
    setEnrollments(prev =>
      prev.map(e => e.id === enrollmentId
        ? { ...e, status: 'aprovado', paymentStatus: 'aprovado' }
        : e
      )
    );
  };

  const rejectEnrollment = (enrollmentId) => {
    setEnrollments(prev =>
      prev.map(e => e.id === enrollmentId
        ? { ...e, status: 'recusado', paymentStatus: 'recusado' }
        : e
      )
    );
  };

  // Check-in: valida se a pessoa tem inscrição aprovada, e adiciona ao certificados automaticamente
  const doCheckIn = (participantName, eventId) => {
    const event = events.find(e => e.id === eventId) || events[0];
    const alreadyDone = checkIns.find(
      c => c.participantName.toLowerCase() === participantName.toLowerCase() && c.eventId === event.id
    );
    if (alreadyDone) return { success: false, reason: 'already' };

    const newCI = {
      id: String(Date.now()),
      eventId: event.id,
      eventTitle: event.title,
      participantName,
      checkedInAt: new Date().toISOString(),
      certificateIssued: false,
    };
    setCheckIns(prev => [newCI, ...prev]);
    return { success: true };
  };

  const issueCertificate = (checkInId) => {
    setCheckIns(prev =>
      prev.map(c => c.id === checkInId ? { ...c, certificateIssued: true } : c)
    );
  };

  return (
    <AppContext.Provider value={{
      events, setEvents,
      enrollments, setEnrollments, approveEnrollment, rejectEnrollment,
      checkIns, setCheckIns, doCheckIn,
      issueCertificate,
      admins, setAdmins,
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/"               element={<Index />} />
          <Route path="/login"          element={<Login />} />
          <Route path="/cadastro"       element={<Cadastro />} />
          <Route path="/dashboard"      element={<Dashboard />} />
          <Route path="/eventos"        element={<Eventos />} />
          <Route path="/inscricoes"     element={<Inscricoes />} />
          <Route path="/checkin"        element={<CheckIn />} />
          <Route path="/certificados"   element={<Certificados />} />
          <Route path="/relatorios"     element={<Relatorios />} />
          <Route path="/administradores" element={<Administradores />} />
          <Route path="*"               element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
