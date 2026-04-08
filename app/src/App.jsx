import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/cadastro.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Eventos from "./pages/Eventos.jsx";
import Inscricoes from "./pages/Inscricoes.jsx";
import CheckInPage from "./pages/CheckIn.jsx";
import Certificados from "./pages/Certificados.jsx";
import Relatorios from "./pages/Relatorios.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/inscricoes" element={<Inscricoes />} />
      <Route path="/checkin" element={<CheckInPage />} />
      <Route path="/certificados" element={<Certificados />} />
      <Route path="/relatorios" element={<Relatorios />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
