import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Calendar, Users, ClipboardCheck, Award, Shield, ArrowRight } from 'lucide-react';

const features = [
  { icon: Calendar, title: 'Gestão de Eventos', desc: 'Crie e gerencie eventos com controle total de vagas, datas e valores.' },
  { icon: Users, title: 'Inscrições', desc: 'Fluxo completo de inscrição com aprovação/recusa de pagamento.' },
  { icon: ClipboardCheck, title: 'Check-in', desc: 'Registro de presença em tempo real com validação de horário.' },
  { icon: Award, title: 'Certificados', desc: 'Emissão automática de certificados para participantes.' },
  { icon: Shield, title: 'Segurança', desc: 'Autenticação robusta, controle de acesso e proteção de dados.' },
];

const profiles = [
  { emoji: '👑', name: 'Admin', desc: 'Acesso total à plataforma. Gerencia usuários, relatórios e configurações.' },
  { emoji: '🎯', name: 'Organizador', desc: 'Cria eventos, aprova inscrições, realiza check-in e emite certificados.' },
  { emoji: '🙋', name: 'Participante', desc: 'Se inscreve em eventos, faz check-in e recebe certificados.' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>EventNow</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</Link>
            <Link to="/cadastro" className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              Criar conta <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" /> EventNow· Labs Talents 2026
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Plataforma de Eventos <span className="text-gradient">com Check-in</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Gerencie inscrições, pagamentos, presença e certificados em um único lugar.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/dashboard" className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                Acessar Plataforma <ArrowRight className="w-4 h-4" />
              </Link>
        
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'var(--font-display)' }}>Funcionalidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6 hover:shadow-lg transition-shadow group">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'var(--font-display)' }}>Perfis de Usuário</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {profiles.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center">
                <span className="text-4xl mb-4 block">{p.emoji}</span>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)' }}>Equipe EventFlow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { name: 'Isabella Andrade', github: '@raory1' },
              { name: 'Yasmin Mendes', github: '@yasminmendes487' },
              { name: 'Yuré Santana', github: '@SantanaYure' },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-xl font-bold text-primary">{m.name.charAt(0)}</div>
                <h4 className="font-semibold text-sm">{m.name}</h4>
                <a href={'https://github.com/' + m.github.slice(1)} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline">{m.github}</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border text-center text-sm text-muted-foreground">
        <p>EventNow · Plataforma de Eventos com Check-in · Desafio 4 · Semana 2 · Labs Talents 2026</p>
      </footer>
    </div>
  );
};

export default Index;
