import { cn } from '@/lib/utils.js';

const statusConfig = {
  aberto: { label: 'Aberto', classes: 'bg-accent/10 text-accent border-accent/20' },
  encerrado: { label: 'Encerrado', classes: 'bg-muted text-muted-foreground border-border' },
  em_andamento: { label: 'Em andamento', classes: 'bg-primary/10 text-primary border-primary/20' },
  pendente: { label: 'Pendente', classes: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
  aprovado: { label: 'Aprovado', classes: 'bg-accent/10 text-accent border-accent/20' },
  recusado: { label: 'Recusado', classes: 'bg-destructive/10 text-destructive border-destructive/20' },
};

const StatusBadge = ({ status, className }) => {
  const config = statusConfig[status] || { label: status, classes: 'bg-muted text-muted-foreground border-border' };
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', config.classes, className)}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
