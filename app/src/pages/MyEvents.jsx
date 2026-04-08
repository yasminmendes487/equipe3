import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { events as initialEvents } from "../data/events";
import StatusBadge from "../components/StatusBadge";

export default function MyEvents() {
  const { user } = useAuth();

  const [events] = useState(() => {
    const orgIds = user?.eventIds || [];
    const base = initialEvents.filter((e) => orgIds.includes(e.id));
    const custom = JSON.parse(localStorage.getItem("ef-custom-events") || "[]");
    const customOrg = custom.filter((e) => e.organizadorId === user?.id);
    return [...base, ...customOrg];
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-800">🛠️ Meus Eventos</h1>
        <Link
          to="/create-event"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          + Criar Evento
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-400 mb-4">Você ainda não tem eventos criados.</p>
          <Link
            to="/create-event"
            className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Criar primeiro evento
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-base font-semibold text-slate-800 line-clamp-1">
                  🎪 {event.title}
                </h2>
                <div className="flex-shrink-0">
                  <StatusBadge status={event.status} />
                </div>
              </div>

              <p className="text-slate-500 text-sm line-clamp-2 mb-4">{event.description}</p>

              <div className="text-xs text-slate-400 space-y-1.5 mb-5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {event.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {event.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> {event.vacancies} vagas · {event.price}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/checkin/${event.id}`}
                  className="flex-1 text-center bg-green-600 text-white py-2 rounded-xl text-xs font-semibold hover:bg-green-700 transition-colors"
                >
                  ✅ Check-in
                </Link>
                <Link
                  to={`/events/${event.id}`}
                  className="flex-1 text-center border border-slate-200 text-slate-700 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
