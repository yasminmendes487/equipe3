import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, User, UserPlus } from 'lucide-react';

const Cadastro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (name && email && password && confirmPassword && password === confirmPassword) {
        navigate('/dashboard');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(250 65% 35%))' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative z-10 text-center px-12">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>EventNow</h1>
          <p className="text-lg text-white/80 max-w-md">Crie sua conta e comece a gerenciar seus eventos de forma simples e eficiente.</p>
          <div className="mt-12 flex gap-8 justify-center text-white/70 text-sm">
            <div><span className="text-2xl font-bold text-white block">500+</span>Eventos</div>
            <div><span className="text-2xl font-bold text-white block">12k</span>Participantes</div>
            <div><span className="text-2xl font-bold text-white block">98%</span>Satisfação</div>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>EventNow</span>
          </div>

          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Criar conta</h2>
          <p className="text-muted-foreground mb-8">Comece sua jornada com o EventNow</p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Seu nome completo"
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="seu@email.com"
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirmar senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors" 
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
              {!loading && <UserPlus className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Já tem uma conta?{' '}
            <button onClick={() => navigate('/login')} className="text-primary font-medium hover:underline">
              Faça login
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Cadastro;