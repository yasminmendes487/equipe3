import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, UserCheck, Clock, Search, AlertCircle, CheckCircle2 } from 'lucide-react';
import AppLayout from '@/components/AppLayout.jsx';
import { useAppContext } from '@/App.jsx';

const CheckIn = () => {
  const { events, enrollments, checkIns, doCheckIn } = useAppContext();
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [searchName, setSearchName]       = useState('');
  const [feedback, setFeedback]           = useState(null); // { type: 'success'|'error'|'warn', msg }

  const allEvents = events;

  // Participantes aprovados para o evento selecionado
  const eligibleParticipants = enrollments.filter(e => {
    const eventMatch = selectedEvent === 'all' || e.eventId === selectedEvent;
    return e.status === 'aprovado' && eventMatch;
  });

  // Filtra por busca
  const filteredEligible = eligibleParticipants.filter(e =>
    e.participantName.toLowerCase().includes(searchName.toLowerCase())
  );

  // Já fizeram check-in no evento selecionado
  const filteredCheckIns = checkIns.filter(c =>
    selectedEvent === 'all' || c.eventId === selectedEvent
  );

  const handleCheckIn = (participantName, eventId) => {
    const targetEventId = eventId || (selectedEvent === 'all' ? events[0]?.id : selectedEvent);
    const result = doCheckIn(participantName, targetEventId);

    if (result.reason === 'already') {
      setFeedback({ type: 'warn', msg: `${participantName} já fez check-in neste evento.` });
    } else if (result.success) {
      setFeedback({ type: 'success', msg: `✅ Check-in de ${participantName} registrado! Adicionado à lista de certificados.` });
    }

    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <AppLayout title="Check-in" subtitle="Valide presença dos participantes com inscrição aprovada">

      {/* Feedback toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className={`mb-4 flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-medium shadow
              ${feedback.type === 'success' ? 'bg-accent/10 text-accent border border-accent/30' :
                feedback.type === 'warn'    ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                              'bg-destructive/10 text-destructive border border-destructive/20'}`}>
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            {feedback.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filtros */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <QrCode className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Check-in por Lista de Aprovados</h3>
            <p className="text-sm text-muted-foreground">Selecione o evento e clique em "Registrar" na linha do participante</p>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <select className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
            value={selectedEvent} onChange={e => setSelectedEvent(e.target.value)}>
            <option value="all">Todos os eventos</option>
            {allEvents.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
          </select>
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="Filtrar por nome..." className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background text-sm"
              value={searchName} onChange={e => setSearchName(e.target.value)} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Lista de aprovados (elegíveis para check-in) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-6">
          <h3 className="text-base font-semibold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            Aguardando Check-in
            <span className="ml-2 text-xs font-normal text-muted-foreground">({filteredEligible.length} participantes aprovados)</span>
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Clique em "Registrar" para confirmar a presença</p>

          <div className="space-y-2">
            {filteredEligible.map((enr, i) => {
              const alreadyCheckedIn = checkIns.some(
                c => c.participantName.toLowerCase() === enr.participantName.toLowerCase() && c.eventId === enr.eventId
              );
              return (
                <motion.div key={enr.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl transition-colors
                    ${alreadyCheckedIn ? 'bg-accent/5 border border-accent/20' : 'hover:bg-muted/50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold
                      ${alreadyCheckedIn ? 'bg-accent/20 text-accent' : 'bg-primary/10 text-primary'}`}>
                      {enr.participantName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{enr.participantName}</p>
                      <p className="text-xs text-muted-foreground">{enr.eventTitle}</p>
                    </div>
                  </div>
                  {alreadyCheckedIn ? (
                    <span className="flex items-center gap-1 text-xs text-accent font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Check-in feito
                    </span>
                  ) : (
                    <button onClick={() => handleCheckIn(enr.participantName, enr.eventId)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      <UserCheck className="w-3.5 h-3.5" /> Registrar
                    </button>
                  )}
                </motion.div>
              );
            })}
            {filteredEligible.length === 0 && (
              <div className="text-center py-10 text-muted-foreground text-sm">
                <UserCheck className="w-8 h-8 mx-auto mb-2 opacity-30" />
                Nenhum participante aprovado encontrado para este evento.
              </div>
            )}
          </div>
        </motion.div>

        {/* Histórico de check-ins já realizados */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
          <h3 className="text-base font-semibold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            Check-ins Registrados
            <span className="ml-2 text-xs font-normal text-muted-foreground">({filteredCheckIns.length})</span>
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Participantes que já tiveram presença confirmada</p>

          <div className="space-y-2">
            {filteredCheckIns.map((ci, i) => (
              <motion.div key={ci.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{ci.participantName}</p>
                    <p className="text-xs text-muted-foreground">{ci.eventTitle}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(ci.checkedInAt).toLocaleString('pt-BR')}
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full
                    ${ci.certificateIssued ? 'bg-accent/10 text-accent' : 'bg-yellow-100 text-yellow-700'}`}>
                    {ci.certificateIssued ? '🏆 Certificado emitido' : '⏳ Aguardando certificado'}
                  </span>
                </div>
              </motion.div>
            ))}
            {filteredCheckIns.length === 0 && (
              <p className="text-center text-muted-foreground py-10 text-sm">Nenhum check-in registrado ainda.</p>
            )}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default CheckIn;
