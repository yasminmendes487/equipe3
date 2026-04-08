import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Eye, Zap } from 'lucide-react';
import AppLayout from '@/components/AppLayout.jsx';
import { mockCheckIns } from '@/data/mockData.js';

const Certificados = () => {
  const [issued, setIssued] = useState(mockCheckIns.map(c => ({ ...c })));

  const handleIssue = (id) => {
    setIssued(prev => prev.map(c => c.id === id ? { ...c, certificateIssued: true } : c));
  };

  return (
    <AppLayout title="Certificados" subtitle="Emissão e gestão de certificados">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>{issued.filter(c => c.certificateIssued).length}</p>
          <p className="text-sm text-muted-foreground mt-1">Emitidos</p>
        </div>
        <div className="glass rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-accent" style={{ fontFamily: 'var(--font-display)' }}>{issued.filter(c => !c.certificateIssued).length}</p>
          <p className="text-sm text-muted-foreground mt-1">Pendentes</p>
        </div>
        <div className="glass rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{issued.length}</p>
          <p className="text-sm text-muted-foreground mt-1">Total Check-ins</p>
        </div>
      </div>
      <div className="space-y-4">
        {issued.map((ci, i) => (
          <motion.div key={ci.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={'w-14 h-14 rounded-xl flex items-center justify-center ' + (ci.certificateIssued ? 'bg-accent/10' : 'bg-muted')}>
                <Award className={'w-7 h-7 ' + (ci.certificateIssued ? 'text-accent' : 'text-muted-foreground')} />
              </div>
              <div>
                <h4 className="font-semibold">{ci.participantName}</h4>
                <p className="text-sm text-muted-foreground">{ci.eventTitle}</p>
                <p className="text-xs text-muted-foreground mt-1">Check-in: {new Date(ci.checkedInAt).toLocaleString('pt-BR')}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {ci.certificateIssued ? (
                <>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-input hover:bg-muted"><Eye className="w-3.5 h-3.5" /> Visualizar</button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-input hover:bg-muted"><Download className="w-3.5 h-3.5" /> Baixar</button>
                </>
              ) : (
                <button onClick={() => handleIssue(ci.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-primary text-primary-foreground hover:bg-primary/90">
                  <Zap className="w-3.5 h-3.5" /> Emitir Certificado
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Certificados;
