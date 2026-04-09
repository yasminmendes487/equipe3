import { motion } from 'framer-motion';
import { Calendar, Users, ClipboardCheck, Award, TrendingUp, Clock } from 'lucide-react';
import AppLayout from '@/components/AppLayout.jsx';
import StatCard from '@/components/StatCard.jsx';
import StatusBadge from '@/components/StatusBadge.jsx';
import { useAppContext } from '@/App.jsx';

const Dashboard = () => {
  const { events, enrollments, checkIns } = useAppContext();
  const recentEnrollments = enrollments.slice(0, 5);

  return (
    <AppLayout title="Dashboard" subtitle="Visão geral da plataforma">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard icon={Calendar}      title="Eventos Ativos"  value={events.filter(e => e.status === 'aberto').length} subtitle="eventos abertos" trend={{ value: 12, positive: true }} />
        <StatCard icon={Users}         title="Total Inscrições" value={enrollments.length} subtitle="todas as inscrições" trend={{ value: 8, positive: true }} />
        <StatCard icon={ClipboardCheck} title="Check-ins"      value={checkIns.length} subtitle="realizados" />
        <StatCard icon={Award}         title="Certificados"    value={checkIns.filter(c => c.certificateIssued).length} subtitle="emitidos" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Inscrições Recentes</h3>
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {recentEnrollments.map((enr) => (
              <div key={enr.id} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{enr.participantName.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-medium">{enr.participantName}</p>
                    <p className="text-xs text-muted-foreground">{enr.eventTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={enr.paymentStatus} />
                  <span className="text-xs text-muted-foreground">{enr.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Próximos Eventos</h3>
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {events.filter(e => e.status === 'aberto').map((event) => (
              <div key={event.id} className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors">
                <h4 className="text-sm font-semibold mb-1">{event.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{event.date} às {event.time}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground"><Users className="w-3 h-3" />{event.enrolled}/{event.capacity}</div>
                  <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: (event.enrolled / event.capacity * 100) + '%' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
