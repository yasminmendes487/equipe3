import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Eye, Zap, Search } from 'lucide-react';
import AppLayout from '@/components/AppLayout.jsx';
import { useAppContext } from '@/App.jsx';

const Certificados = () => {
  const { checkIns, issueCertificate } = useAppContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = checkIns.filter(ci => {
    const matchSearch = ci.participantName.toLowerCase().includes(search.toLowerCase()) ||
                        ci.eventTitle.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all'      ? true :
      filter === 'emitido'  ? ci.certificateIssued :
                              !ci.certificateIssued;
    return matchSearch && matchFilter;
  });

  const emitidos  = checkIns.filter(c => c.certificateIssued).length;
  const pendentes = checkIns.filter(c => !c.certificateIssued).length;

  return (
    <AppLayout title="Certificados" subtitle="Participantes validados no check-in aguardam emissão de certificado">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>{emitidos}</p>
          <p className="text-sm text-muted-foreground mt-1">Certificados Emitidos</p>
        </div>
        <div className="glass rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-yellow-500" style={{ fontFamily: 'var(--font-display)' }}>{pendentes}</p>
          <p className="text-sm text-muted-foreground mt-1">Aguardando Emissão</p>
        </div>
        <div className="glass rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{checkIns.length}</p>
          <p className="text-sm text-muted-foreground mt-1">Total com Check-in</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="mb-5 flex items-start gap-3 px-5 py-3 rounded-xl bg-accent/5 border border-accent/20 text-sm text-accent">
        <Award className="w-4 h-4 mt-0.5 shrink-0" />
        <span>
          Apenas participantes com <strong>inscrição aprovada</strong> e <strong>check-in registrado</strong> aparecem aqui.
          Emita o certificado após confirmar a participação.
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Buscar participante ou evento..."
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background text-sm"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {[['all', 'Todos'], ['pendente', 'Pendentes'], ['emitido', 'Emitidos']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === val ? 'bg-primary text-primary-foreground' : 'border border-input hover:bg-muted'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((ci, i) => (
          <motion.div key={ci.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="glass rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${ci.certificateIssued ? 'bg-accent/10' : 'bg-yellow-50'}`}>
                <Award className={`w-6 h-6 ${ci.certificateIssued ? 'text-accent' : 'text-yellow-500'}`} />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{ci.participantName}</h4>
                <p className="text-xs text-muted-foreground">{ci.eventTitle}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Check-in em {new Date(ci.checkedInAt).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              {ci.certificateIssued ? (
                <>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-input hover:bg-muted transition-colors">
                    <Eye className="w-3.5 h-3.5" /> Visualizar
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-input hover:bg-muted transition-colors">
                    <Download className="w-3.5 h-3.5" /> Baixar
                  </button>
                </>
              ) : (
                <button onClick={() => issueCertificate(ci.id)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Zap className="w-3.5 h-3.5" /> Emitir Certificado
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Award className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhum certificado encontrado.</p>
            <p className="text-xs mt-1">Aprove inscrições e registre check-ins para liberar certificados.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Certificados;
