import EventCard from "../components/EventCard";
import { events } from "../data/events";

export default function Events() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-6">Eventos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}