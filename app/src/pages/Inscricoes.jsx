import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import AppLayout from '@/components/AppLayout.jsx';
import StatusBadge from '@/components/StatusBadge.jsx';
import { mockEnrollments } from '@/data/mockData.js';

const Inscricoes = () => {
  const [enrollments, setEnrollments] = useState(mockEnrollments);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = enrollments.filter(e => {
    const matchSearch = e.participantName.toLowerCase().includes(search.toLowerCase()) || e.eventTitle.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || e.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id, status) => {
    setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status, paymentStatus: status } : e));
  };

  return (
    <AppLayout title="Inscrições" subtitle="Gerencie inscrições e pagamentos">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Buscar por nome ou evento..." className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {['all', 'pendente', 'aprovado', 'recusado'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'border border-input hover:bg-muted'}`}>
              {f === 'all' ? 'Todos' : f}
            </button>
          ))}
        </div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">Participante</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">Evento</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">Data</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">Pagamento</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">Status</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((enr) => (
                <tr key={enr.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{enr.participantName.charAt(0)}</div>
                      <div><p className="text-sm font-medium">{enr.participantName}</p><p className="text-xs text-muted-foreground">{enr.participantEmail}</p></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{enr.eventTitle}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{enr.date}</td>
                  <td className="px-6 py-4"><StatusBadge status={enr.paymentStatus} /></td>
                  <td className="px-6 py-4"><StatusBadge status={enr.status} /></td>
                  <td className="px-6 py-4">
                    {enr.status === 'pendente' && (
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => updateStatus(enr.id, 'aprovado')}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-accent/30 text-accent hover:bg-accent/10">
                          <CheckCircle className="w-3.5 h-3.5" /> Aprovar
                        </button>
                        <button onClick={() => updateStatus(enr.id, 'recusado')}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-destructive/30 text-destructive hover:bg-destructive/10">
                          <XCircle className="w-3.5 h-3.5" /> Recusar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Inscricoes;
