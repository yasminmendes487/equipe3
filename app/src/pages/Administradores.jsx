import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCog, Plus, Trash2, ToggleLeft, ToggleRight, Mail, User, Shield, X } from 'lucide-react';
import AppLayout from '@/components/AppLayout.jsx';
import { useAppContext } from '@/App.jsx';

const ROLES = ['admin', 'organizador'];

const Administradores = () => {
  const { admins, setAdmins } = useAppContext();
  const [modal, setModal]   = useState(false);
  const [form, setForm]     = useState({ name: '', email: '', role: 'admin' });
  const [deleteId, setDeleteId] = useState(null);

  const handleAdd = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    const newAdmin = {
      id: String(Date.now()),
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      active: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAdmins(prev => [newAdmin, ...prev]);
    setForm({ name: '', email: '', role: 'admin' });
    setModal(false);
  };

  const toggleActive = (id) => {
    setAdmins(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const handleDelete = (id) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
    setDeleteId(null);
  };

  return (
    <AppLayout title="Administradores" subtitle="Gerencie os usuários com acesso administrativo à plataforma">

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>{admins.length}</p>
          <p className="text-sm text-muted-foreground mt-1">Total de Admins</p>
        </div>
        <div className="glass rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-accent" style={{ fontFamily: 'var(--font-display)' }}>{admins.filter(a => a.active).length}</p>
          <p className="text-sm text-muted-foreground mt-1">Ativos</p>
        </div>
        <div className="glass rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-muted-foreground" style={{ fontFamily: 'var(--font-display)' }}>{admins.filter(a => !a.active).length}</p>
          <p className="text-sm text-muted-foreground mt-1">Inativos</p>
        </div>
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg" style={{ fontFamily: 'var(--font-display)' }}>Usuários Administrativos</h2>
        <button onClick={() => setModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Adicionar Admin
        </button>
      </div>

      {/* Admin list */}
      <div className="space-y-3">
        {admins.map((admin, i) => (
          <motion.div key={admin.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`glass rounded-2xl p-5 flex items-center justify-between gap-4 transition-opacity ${!admin.active ? 'opacity-60' : ''}`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0
                ${admin.active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                {admin.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm">{admin.name}</h4>
                  {!admin.active && (
                    <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">Inativo</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3" /> {admin.email}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize
                    ${admin.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                    <Shield className="w-2.5 h-2.5 inline mr-0.5" />
                    {admin.role}
                  </span>
                  <span className="text-[10px] text-muted-foreground">Desde {admin.createdAt}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Toggle ativo/inativo */}
              <button onClick={() => toggleActive(admin.id)}
                title={admin.active ? 'Desativar' : 'Ativar'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
                  ${admin.active
                    ? 'border-accent/30 text-accent hover:bg-accent/10'
                    : 'border-input text-muted-foreground hover:bg-muted'}`}>
                {admin.active
                  ? <><ToggleRight className="w-4 h-4" /> Ativo</>
                  : <><ToggleLeft  className="w-4 h-4" /> Inativo</>}
              </button>
              {/* Mudar cargo */}
              <select
                value={admin.role}
                onChange={e => setAdmins(prev => prev.map(a => a.id === admin.id ? { ...a, role: e.target.value } : a))}
                className="h-8 rounded-lg border border-input bg-background px-2 text-xs">
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {/* Remover */}
              <button onClick={() => setDeleteId(admin.id)}
                className="p-1.5 rounded-lg text-destructive border border-destructive/20 hover:bg-destructive/10 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal: adicionar admin */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-2xl p-6 w-full max-w-md shadow-2xl border border-border">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>Novo Administrador</h3>
                <button onClick={() => setModal(false)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Nome completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" placeholder="Nome do administrador"
                      className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background text-sm"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="email" placeholder="email@eventnow.com"
                      className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background text-sm"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Cargo / Permissão</label>
                  <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                    value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                    {ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setModal(false)}
                  className="flex-1 h-10 rounded-lg border border-input text-sm font-medium hover:bg-muted transition-colors">
                  Cancelar
                </button>
                <button onClick={handleAdd}
                  className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                  Adicionar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm delete modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setDeleteId(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-background rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-border">
              <h3 className="font-bold text-base mb-2">Remover administrador?</h3>
              <p className="text-sm text-muted-foreground mb-5">
                Esta ação não pode ser desfeita. O usuário perderá acesso à plataforma.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 h-10 rounded-lg border border-input text-sm hover:bg-muted transition-colors">Cancelar</button>
                <button onClick={() => handleDelete(deleteId)}
                  className="flex-1 h-10 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors">Remover</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

export default Administradores;
