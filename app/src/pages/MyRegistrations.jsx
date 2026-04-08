import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, CreditCard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { registrations as defaultRegistrations } from "../data/mock";
import StatusBadge from "../components/StatusBadge";

export default function MyRegistrations() {
  const { user } = useAuth();

  const [regs] = useState(() => {
    const saved = localStorage.getItem("ef-registrations");
    if (saved) {
      const all = JSON.parse(saved);
      return all.filter((r) => r.userId === user?.id);
    }
    // First load: seed localStorage with default data
    localStorage.setItem("ef-registrations", JSON.stringify(defaultRegistrations));
    return defaultRegistrations.filter((r) => r.userId === user?.id);
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link to="/login" className="text-blue-600 hover:underline">
          Faça login para ver suas inscrições
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">📋 Minhas Inscrições</h1>

      {regs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-400 text-lg mb-4">Você ainda não tem inscrições.</p>
          <Link
            to="/events"
            className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Explorar Eventos
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {regs.map((reg) => (
            <div
              key={reg.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 mb-1.5">
                    🎪 {reg.eventTitle}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {reg.eventDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" />
                      {reg.paymentMethod}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <StatusBadge status={reg.status} />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <span className="text-xs text-slate-500">Pagamento:</span>
                <StatusBadge status={reg.paymentStatus} />
                {reg.checkedIn && (
                  <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                    ✅ Check-in realizado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/events" className="text-sm text-blue-600 hover:underline">
          ← Ver mais eventos
        </Link>
      </div>
    </div>
  );
}
