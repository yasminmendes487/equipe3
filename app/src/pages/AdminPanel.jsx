import { useState } from "react";
import { Link } from "react-router-dom";
import { events } from "../data/events";
import { allRegistrations as defaultRegistrations } from "../data/mock";
import StatusBadge from "../components/StatusBadge";

const STATS = [
  {
    label: "Total de Eventos",
    value: 6,
    icon: "🎪",
    border: "border-blue-100",
    text: "text-blue-700",
    bg: "bg-blue-50",
  },
  {
    label: "Inscrições Confirmadas",
    value: 2,
    icon: "✅",
    border: "border-green-100",
    text: "text-green-700",
    bg: "bg-green-50",
  },
  {
    label: "Pagamentos Pendentes",
    value: 2,
    icon: "⏳",
    border: "border-yellow-100",
    text: "text-yellow-700",
    bg: "bg-yellow-50",
  },
  {
    label: "Receita Total",
    value: "R$ 228,60",
    icon: "💰",
    border: "border-purple-100",
    text: "text-purple-700",
    bg: "bg-purple-50",
  },
];

export default function AdminPanel() {
  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem("ef-admin-regs");
    return saved ? JSON.parse(saved) : defaultRegistrations;
  });

  function updatePayment(id, newStatus) {
    const updated = registrations.map((r) =>
      r.id === id ? { ...r, paymentStatus: newStatus } : r
    );
    setRegistrations(updated);
    localStorage.setItem("ef-admin-regs", JSON.stringify(updated));
  }

  const pending = registrations.filter((r) => r.paymentStatus === "Pendente");

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">🛡️ Painel Administrativo</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} border ${stat.border} rounded-2xl p-5`}
          >
            <p className="text-2xl mb-2">{stat.icon}</p>
            <p className={`text-2xl font-bold ${stat.text}`}>{stat.value}</p>
            <p className={`text-xs font-medium mt-1 ${stat.text} opacity-80`}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Pending Payments */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">⏳ Pagamentos em Análise</h2>

        {pending.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-400">
            Nenhum pagamento pendente no momento. ✅
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 text-slate-600 font-semibold">Evento</th>
                  <th className="text-left p-4 text-slate-600 font-semibold hidden md:table-cell">
                    Participante
                  </th>
                  <th className="text-left p-4 text-slate-600 font-semibold">Valor</th>
                  <th className="text-left p-4 text-slate-600 font-semibold">Status</th>
                  <th className="text-center p-4 text-slate-600 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((reg) => (
                  <tr
                    key={reg.id}
                    className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 font-medium text-slate-800">{reg.eventTitle}</td>
                    <td className="p-4 text-slate-500 hidden md:table-cell">{reg.userName}</td>
                    <td className="p-4 text-slate-600">{reg.amount}</td>
                    <td className="p-4">
                      <StatusBadge status={reg.paymentStatus} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => updatePayment(reg.id, "Aprovado")}
                          className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors"
                        >
                          Aprovar
                        </button>
                        <button
                          onClick={() => updatePayment(reg.id, "Recusado")}
                          className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors"
                        >
                          Recusar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* All Events */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">🎪 Todos os Eventos</h2>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 text-slate-600 font-semibold">Título</th>
                <th className="text-left p-4 text-slate-600 font-semibold hidden md:table-cell">
                  Data
                </th>
                <th className="text-left p-4 text-slate-600 font-semibold hidden md:table-cell">
                  Vagas
                </th>
                <th className="text-left p-4 text-slate-600 font-semibold">Preço</th>
                <th className="text-left p-4 text-slate-600 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4 font-medium text-slate-800">
                    <Link
                      to={`/events/${event.id}`}
                      className="hover:text-blue-600 hover:underline transition-colors"
                    >
                      {event.title}
                    </Link>
                  </td>
                  <td className="p-4 text-slate-500 hidden md:table-cell">{event.date}</td>
                  <td className="p-4 text-slate-500 hidden md:table-cell">{event.vacancies}</td>
                  <td className="p-4 text-slate-600">{event.price}</td>
                  <td className="p-4">
                    <StatusBadge status={event.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
