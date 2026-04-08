import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MapPin, Clock, Users, DollarSign } from 'lucide-react';
import AppLayout from '@/components/AppLayout.jsx';
import StatusBadge from '@/components/StatusBadge.jsx';
import { mockEvents } from '@/data/mockData.js';

const Eventos = () => {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState(mockEvents);
  const [showForm, setShowForm] = useState(false);

  const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newEvent = {
      id: String(events.length + 1),
      title: form.get('title'),
      description: form.get('description'),
      date: form.get('date'),
      time: form.get('time'),
      location: form.get('location'),
      capacity: Number(form.get('capacity')),
      enrolled: 0,
      status: 'aberto',
      organizer: 'Rebeca Alves',
      price: Number(form.get('price')),
    };
    setEvents([newEvent, ...events]);
    setShowForm(false);
  };

  return (
    <AppLayout title="Eventos" subtitle="Gerencie todos os eventos da plataforma">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Buscar eventos..." className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm"
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Novo Evento
        </button>
      </div>

      {showForm && (
        <div className="glass rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Criar Novo Evento</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="title" required placeholder="Título do evento" className="h-10 px-4 rounded-lg border border-input bg-background text-sm" />
              <input name="location" required placeholder="Local" className="h-10 px-4 rounded-lg border border-input bg-background text-sm" />
            </div>
            <textarea name="description" required placeholder="Descrição..." className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm min-h-[80px]" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <input name="date" type="date" required className="h-10 px-4 rounded-lg border border-input bg-background text-sm" />
              <input name="time" type="time" required className="h-10 px-4 rounded-lg border border-input bg-background text-sm" />
              <input name="capacity" type="number" required placeholder="Capacidade" className="h-10 px-4 rounded-lg border border-input bg-background text-sm" />
              <input name="price" type="number" step="0.01" required placeholder="Preço (R$)" className="h-10 px-4 rounded-lg border border-input bg-background text-sm" />
            </div>
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">Criar Evento</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((event, i) => (
          <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
              <span className="text-4xl">🎪</span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-bold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{event.title}</h3>
                <StatusBadge status={event.status} />
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{event.date} às {event.time}</div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{event.location}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" />{event.enrolled}/{event.capacity} vagas</div>
                  <div className="flex items-center gap-1 font-semibold text-foreground">
                    <DollarSign className="w-3.5 h-3.5" />
                    {event.price === 0 ? 'Gratuito' : 'R$ ' + event.price.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mt-4 w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: (event.enrolled / event.capacity * 100) + '%' }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Eventos;
