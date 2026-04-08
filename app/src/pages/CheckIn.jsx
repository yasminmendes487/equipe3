import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { participants as defaultParticipants } from "../data/mock";
import { events } from "../data/events";
import StatusBadge from "../components/StatusBadge";

export default function CheckIn() {
  const { eventId } = useParams();
  const { user } = useAuth();

  const orgEventIds = user?.eventIds || [];
  const parsedId = eventId ? Number(eventId) : orgEventIds[0] ?? null;

  const [selectedEventId, setSelectedEventId] = useState(parsedId);
  const [search, setSearch] = useState("");

  const [participants, setParticipants] = useState(() => {
    const saved = localStorage.getItem("ef-participants");
    return saved ? JSON.parse(saved) : defaultParticipants;
  });

  function toggleCheckin(participantId) {
    const updated = participants.map((p) =>
      p.id === participantId ? { ...p, checkedIn: !p.checkedIn } : p
    );
    setParticipants(updated);
    localStorage.setItem("ef-participants", JSON.stringify(updated));
  }

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  const listed = participants
    .filter((p) => p.eventId === selectedEventId)
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase())
    );

  const checkedCount = participants.filter(
    (p) => p.eventId === selectedEventId && p.checkedIn
  ).length;
  const totalCount = participants.filter(
    (p) => p.eventId === selectedEventId
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-800">✅ Check-in</h1>
        <Link
          to="/my-events"
          className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          ← Meus Eventos
        </Link>
      </div>

      {/* Event selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-slate-600">Evento:</span>
        {orgEventIds.map((eid) => {
          const ev = events.find((e) => e.id === eid);
          if (!ev) return null;
          return (
            <button
              key={eid}
              onClick={() => setSelectedEventId(eid)}
              className={`text-sm px-4 py-1.5 rounded-full transition-colors ${
                selectedEventId === eid
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {ev.title}
            </button>
          );
        })}
      </div>

      {selectedEvent && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
              <p className="text-3xl font-bold text-slate-800">{totalCount}</p>
              <p className="text-xs text-slate-500 mt-1">Inscritos</p>
            </div>
            <div className="bg-white rounded-2xl border border-green-100 p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{checkedCount}</p>
              <p className="text-xs text-slate-500 mt-1">Presentes</p>
            </div>
            <div className="bg-white rounded-2xl border border-orange-100 p-4 text-center">
              <p className="text-3xl font-bold text-orange-500">{totalCount - checkedCount}</p>
              <p className="text-xs text-slate-500 mt-1">Aguardando</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 text-slate-600 font-semibold">Participante</th>
                  <th className="text-left p-4 text-slate-600 font-semibold hidden md:table-cell">E-mail</th>
                  <th className="text-left p-4 text-slate-600 font-semibold">Pagamento</th>
                  <th className="text-left p-4 text-slate-600 font-semibold">Presença</th>
                  <th className="text-center p-4 text-slate-600 font-semibold">Ação</th>
                </tr>
              </thead>
              <tbody>
                {listed.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-10 text-slate-400">
                      Nenhum participante encontrado.
                    </td>
                  </tr>
                ) : (
                  listed.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-4 font-medium text-slate-800">{p.name}</td>
                      <td className="p-4 text-slate-500 hidden md:table-cell">{p.email}</td>
                      <td className="p-4">
                        <StatusBadge status={p.paymentStatus} />
                      </td>
                      <td className="p-4">
                        {p.checkedIn ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                            ✅ Presente
                          </span>
                        ) : (
                          <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
                            Ausente
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          disabled={p.paymentStatus !== "Aprovado"}
                          onClick={() => toggleCheckin(p.id)}
                          className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                            p.paymentStatus !== "Aprovado"
                              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                              : p.checkedIn
                              ? "bg-red-100 text-red-600 hover:bg-red-200"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          {p.checkedIn ? "Desfazer" : "Registrar"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
