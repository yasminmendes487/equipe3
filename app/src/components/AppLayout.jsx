import AppSidebar from './AppSidebar.jsx';

const AppLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="ml-64">
        <header className="sticky top-0 z-30 glass px-8 py-5 border-b border-border/50">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
