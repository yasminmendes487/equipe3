import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function EventCard({ event }) {
  const [subscribed, setSubscribed] = useState(() => {
    const saved = localStorage.getItem(`event-${event.id}`);
    return saved === "true";
  });

  return (
    <div className="border border-gray-200 p-5 rounded-2xl shadow-sm bg-white flex flex-col justify-between h-full transition hover:shadow-lg hover:-translate-y-1">
      
      {/* CONTEÚDO */}
      <div>
        {/* TÍTULO */}
        <Link to={`/events/${event.id}`}>
          <h2 className="text-xl font-semibold mb-2 hover:underline">
            🎪 {event.title}
          </h2>
        </Link>

        {/* STATUS */}
        <StatusBadge status={event.status} />

        {/* DESCRIÇÃO */}
        <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-3">
          {event.description}
        </p>

        {/* INFOS */}
        <div className="mt-4 text-sm text-gray-700 space-y-2">
          
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{event.vacancies} vagas</span>
          </div>

          <p className="font-semibold mt-2">
            💰 {event.price}
          </p>
        </div>
      </div>

      {/* AÇÕES */}
      <div className="mt-5 space-y-2">

        {/* BOTÃO INSCRIÇÃO */}
        <button
          disabled={event.status === "Encerrado"}
          onClick={() => {
            const newValue = !subscribed;
            setSubscribed(newValue);
            localStorage.setItem(`event-${event.id}`, newValue);
          }}
          className={`w-full py-2.5 rounded-xl text-sm font-medium transition ${
            event.status === "Encerrado"
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : subscribed
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {event.status === "Encerrado"
            ? "Encerrado ❌"
            : subscribed
            ? "Inscrito ✅"
            : "Inscrever-se"}
        </button>

        

      </div>

    </div>
  );
}