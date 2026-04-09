import { motion } from 'framer-motion';
import { PieChart, TrendingUp, Download } from 'lucide-react';
import AppLayout from '@/components/AppLayout.jsx';
import { mockEvents, mockEnrollments } from '@/data/mockData.js';

const Relatorios = () => {
  const totalRevenue = mockEvents.reduce((sum, e) => sum + (e.price * e.enrolled), 0);
  const approvedCount = mockEnrollments.filter(e => e.status === 'aprovado').length;
  const pendingCount = mockEnrollments.filter(e => e.status === 'pendente').length;
  const refusedCount = mockEnrollments.filter(e => e.status === 'recusado').length;

  return (
    <AppLayout title="Relatórios" subtitle="Métricas e análises da plataforma">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Receita Estimada</h3>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <p className="text-4xl font-bold text-primary mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-muted-foreground">Total baseado em inscrições aprovadas</p>
          <div className="mt-6 space-y-3">
            {mockEvents.map(e => (
              <div key={e.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground truncate mr-4">{e.title}</span>
                <span className="font-medium whitespace-nowrap">R$ {(e.price * e.enrolled).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Inscrições por Status</h3>
            <PieChart className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-4">
            {[
              { label: 'Aprovadas', count: approvedCount, color: 'bg-accent', pct: (approvedCount / mockEnrollments.length * 100) },
              { label: 'Pendentes', count: pendingCount, color: 'bg-yellow-500', pct: (pendingCount / mockEnrollments.length * 100) },
              { label: 'Recusadas', count: refusedCount, color: 'bg-destructive', pct: (refusedCount / mockEnrollments.length * 100) },
            ].map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{item.count} ({item.pct.toFixed(0)}%)</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className={'h-full rounded-full ' + item.color} style={{ width: item.pct + '%' }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Eventos por Ocupação</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-input hover:bg-muted"><Download className="w-3.5 h-3.5" /> Exportar</button>
        </div>
        <div className="space-y-3">
          {mockEvents.map(event => {
            const pct = (event.enrolled / event.capacity) * 100;
            return (
              <div key={event.id} className="flex items-center gap-4">
                <span className="text-sm w-48 truncate">{event.title}</span>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className={'h-full rounded-full ' + (pct >= 90 ? 'bg-accent' : pct >= 50 ? 'bg-primary' : 'bg-yellow-500')} style={{ width: pct + '%' }} />
                </div>
                <span className="text-sm font-medium w-20 text-right">{event.enrolled}/{event.capacity}</span>
                <span className="text-xs text-muted-foreground w-12 text-right">{pct.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Relatorios;
