import { useNavigate } from "react-router-dom";
import { MOCK_USERS, useAuth } from "../context/AuthContext";

const ROLE_CONFIG = {
  admin: { bg: "bg-red-500", badge: "bg-red-100 text-red-700", label: "Administrador", icon: "🛡️" },
  organizador: { bg: "bg-purple-500", badge: "bg-purple-100 text-purple-700", label: "Organizador", icon: "🛠️" },
  participante: { bg: "bg-blue-500", badge: "bg-blue-100 text-blue-700", label: "Participante", icon: "👤" },
};

const REDIRECT = {
  admin: "/admin",
  organizador: "/my-events",
  participante: "/events",
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin(user) {
    login(user);
    navigate(REDIRECT[user.role]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800">🚀 EventFlow</h1>
          <p className="text-slate-500 mt-2 text-sm">Selecione um perfil para entrar no sistema</p>
          <span className="inline-block mt-3 text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium border border-yellow-200">
            🔧 Modo demonstração — escolha um perfil
          </span>
        </div>

        <div className="space-y-4">
          {MOCK_USERS.map((user) => {
            const cfg = ROLE_CONFIG[user.role];
            return (
              <button
                key={user.id}
                onClick={() => handleLogin(user)}
                className="w-full bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all text-left group"
              >
                <div className={`${cfg.bg} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm`}>
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1.5 inline-block ${cfg.badge}`}>
                    {cfg.icon} {cfg.label}
                  </span>
                </div>
                <span className="text-slate-300 group-hover:text-blue-500 transition-colors text-lg">→</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
