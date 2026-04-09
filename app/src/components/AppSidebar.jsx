import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, ClipboardCheck, Award, Users, FileText, Shield, LogOut, Zap } from 'lucide-react';
import { currentUser } from '@/data/mockData.js';
import { cn } from '@/lib/utils.js';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Calendar, label: 'Eventos', path: '/eventos' },
  { icon: ClipboardCheck, label: 'Inscrições', path: '/inscricoes' },
  { icon: Users, label: 'Check-in', path: '/checkin' },
  { icon: Award, label: 'Certificados', path: '/certificados' },
  { icon: FileText, label: 'Relatórios', path: '/relatorios' },

];

const AppSidebar = () => {
  const location = useLocation();
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 flex flex-col z-40"
      style={{ background: 'hsl(var(--sidebar-background))' }}>
      <div className="p-6 border-b" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: 'hsl(var(--sidebar-primary-foreground))', fontFamily: 'var(--font-display)' }}>EventFlow</h1>
            <p className="text-xs" style={{ color: 'hsl(var(--sidebar-foreground))' }}>Plataforma de Eventos</p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-[hsl(var(--sidebar-accent))]'
              )}
              style={!isActive ? { color: 'hsl(var(--sidebar-foreground))' } : undefined}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold"
            style={{ color: 'hsl(var(--sidebar-primary))' }}>{currentUser.name.charAt(0)}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: 'hsl(var(--sidebar-primary-foreground))' }}>{currentUser.name}</p>
            <p className="text-xs capitalize" style={{ color: 'hsl(var(--sidebar-foreground))' }}>{currentUser.role}</p>
          </div>
          <Link to="/" className="p-1.5 rounded-md hover:bg-[hsl(var(--sidebar-accent))] transition-colors">
            <LogOut className="w-4 h-4" style={{ color: 'hsl(var(--sidebar-foreground))' }} />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
