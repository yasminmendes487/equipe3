import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV = {
  admin: [
    { to: "/admin", label: "Painel Admin" },
    { to: "/events", label: "Eventos" },
  ],
  organizador: [
    { to: "/my-events", label: "Meus Eventos" },
    { to: "/create-event", label: "Criar Evento" },
  ],
  participante: [
    { to: "/events", label: "Eventos" },
    { to: "/my-registrations", label: "Minhas Inscrições" },
    { to: "/certificates", label: "Certificados" },
  ],
};

const ROLE_BADGE = {
  admin: "bg-red-100 text-red-700",
  organizador: "bg-purple-100 text-purple-700",
  participante: "bg-blue-100 text-blue-700",
};

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const links = user ? (NAV[user.role] ?? []) : [];

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <Link
        to={
          !user ? "/"
          : user.role === "admin" ? "/admin"
          : user.role === "organizador" ? "/my-events"
          : "/events"
        }
        className="text-base font-bold text-slate-800 hover:opacity-80 transition-opacity"
      >
        🚀 EventFlow
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ROLE_BADGE[user.role]}`}>
              {user.name.split(" ")[0]}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-red-600 transition-colors"
            >
              Sair
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
