import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  const destination =
    !user ? "/login"
    : user.role === "admin" ? "/admin"
    : user.role === "organizador" ? "/my-events"
    : "/events";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-6">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-bold text-slate-800 mb-4">🚀 EventFlow</h1>
        <p className="text-slate-500 text-lg mb-8">
          Plataforma completa para gestão de eventos com inscrições,
          pagamentos, check-in e certificados.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={destination}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
          >
            {user ? "Ir para o painel" : "Entrar no sistema"}
          </Link>
          <Link
            to="/events"
            className="border border-slate-300 text-slate-700 px-8 py-3 rounded-xl font-semibold hover:bg-white transition-colors text-sm"
          >
            Ver eventos
          </Link>
        </div>
      </div>
    </div>
  );
}
