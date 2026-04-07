import { useState } from "react";
import EventCard from "../components/EventCard";
import { events } from "../data/events";

export default function Events() {
  const [filter, setFilter] = useState("all");

  // 🔥 lógica do filtro
  const filteredEvents = events.filter((event) => {
    if (filter === "open") return event.status === "Aberto";
    if (filter === "closed") return event.status === "Encerrado";
    return true;
  });

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-6">Eventos</h1>

      {/* 🔘 BOTÕES DE FILTRO */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Todos
        </button>

        <button
          onClick={() => setFilter("open")}
          className={`px-4 py-2 rounded ${
            filter === "open" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Abertos
        </button>

        <button
          onClick={() => setFilter("closed")}
          className={`px-4 py-2 rounded ${
            filter === "closed" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Encerrados
        </button>
      </div>

      {/* 📋 LISTA FILTRADA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}