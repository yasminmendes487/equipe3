import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📊 Dashboard</h1>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          Sair
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EventCard title="React Workshop" date="15 Jul 2026" location="São Paulo" attendees={120} />
        <EventCard title="Tech Conference" date="22 Ago 2026" location="Online" attendees={450} />
        <EventCard title="Hackathon Labs" date="10 Set 2026" location="Rio de Janeiro" attendees={80} />
      </div>
    </div>
  );
};

export default Dashboard;
