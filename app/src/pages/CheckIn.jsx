import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, UserCheck, Clock } from 'lucide-react';
import AppLayout from '@/components/AppLayout.jsx';
import { mockCheckIns, mockEvents } from '@/data/mockData.js';

const CheckInPage = () => {
  const [checkIns, setCheckIns] = useState(mockCheckIns);
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [manualName, setManualName] = useState('');

  const activeEvents = mockEvents.filter(e => e.status !== 'encerrado');

  const handleManualCheckIn = () => {
    if (!manualName.trim()) return;
    const newCheckIn = {
      id: String(checkIns.length + 1),
      eventId: selectedEvent === 'all' ? '1' : selectedEvent,
      eventTitle: selectedEvent === 'all' ? mockEvents[0].title : (mockEvents.find(e => e.id === selectedEvent)?.title || ''),
      participantName: manualName,
      checkedInAt: new Date().toISOString(),
      certificateIssued: false,
    };
    setCheckIns([newCheckIn, ...checkIns]);
    setManualName('');
  };

  const filtered = selectedEvent === 'all' ? checkIns : checkIns.filter(c => c.eventId === selectedEvent);

  return (
    <AppLayout title="Check-in" subtitle="Registro de presença nos eventos">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><QrCode className="w-5 h-5 text-primary" /></div>
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Check-in Rápido</h3>
            <p className="text-sm text-muted-foreground">Digite o nome do participante para registrar presença</p>
          </div>
        </div>
        <div className="flex gap-3">
          <select className="h-10 rounded-lg border border-input bg-background px-3 text-sm" value={selectedEvent} onChange={e => setSelectedEvent(e.target.value)}>
            <option value="all">Todos os eventos</option>
            {activeEvents.map(ev => (<option key={ev.id} value={ev.id}>{ev.title}</option>))}
          </select>
          <input placeholder="Nome do participante..." className="h-10 px-4 rounded-lg border border-input bg-background text-sm max-w-xs"
            value={manualName} onChange={e => setManualName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleManualCheckIn()} />
          <button onClick={handleManualCheckIn} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-primary/90">
            <UserCheck className="w-4 h-4" /> Registrar
          </button>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Registros de Check-in ({filtered.length})</h3>
        <div className="space-y-3">
          {filtered.map((ci, i) => (
            <motion.div key={ci.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"><UserCheck className="w-5 h-5 text-accent" /></div>
                <div><p className="text-sm font-medium">{ci.participantName}</p><p className="text-xs text-muted-foreground">{ci.eventTitle}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="w-3.5 h-3.5" />{new Date(ci.checkedInAt).toLocaleString('pt-BR')}</div>
                <span className={'text-xs font-medium px-2 py-0.5 rounded-full ' + (ci.certificateIssued ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground')}>
                  {ci.certificateIssued ? '🏆 Certificado' : 'Pendente'}
                </span>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">Nenhum check-in registrado.</p>}
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default CheckInPage;
