import { useState } from "react";

export default function EventCard({ event }) {
  const [subscribed, setSubscribed] = useState(() => {
    const saved = localStorage.getItem(`event-${event.id}`);
    return saved === "true";
  });

  return (
    <div className="border p-4 rounded-xl shadow bg-white flex flex-col justify-between h-full">
      {/* CONTEÚDO */}
      <div>
        <h2 className="text-xl font-bold mb-2">🎪 {event.title}</h2>

        <span
          className={`text-sm font-semibold ${
            event.status === "Aberto" ? "text-green-600" : "text-red-600"
          }`}
        >
          {event.status}
        </span>

        <p className="text-sm text-gray-600 mt-2">{event.description}</p>

        <div className="mt-4 text-sm space-y-1">
          <p>📅 {event.date}</p>
          <p>📍 {event.location}</p>
          <p>👥 {event.vacancies} vagas</p>
          <p>💰 {event.price}</p>
        </div>
      </div>

      {/* BOTÃO */}
      <button
        disabled={event.status === "Encerrado"}
        onClick={() => {
          const newValue = !subscribed;
          setSubscribed(newValue);
          localStorage.setItem(`event-${event.id}`, newValue);
        }}
        className={`mt-4 w-full py-3 rounded-lg text-white ${
          event.status === "Encerrado"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {event.status === "Encerrado"
          ? "Encerrado ❌"
          : subscribed
          ? "Inscrito ✅"
          : "Inscrever-se"}
      </button>
    </div>
  );
}