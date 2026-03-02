import { motion } from 'framer-motion';
import { Patient } from '@/lib/triage';
import { PriorityBadge } from './PriorityBadge';
import { Clock, User, ArrowUpDown, AlertTriangle } from 'lucide-react';

interface QueueViewProps {
  patients: Patient[];
  title?: string;
}

export function QueueView({ patients, title = 'Patient Queue' }: QueueViewProps) {
  const sorted = [...patients]
    .filter(p => p.status === 'waiting' || p.status === 'in-progress')
    .sort((a, b) => b.triageResult.score - a.triageResult.score);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ArrowUpDown className="h-3.5 w-3.5" />
          Sorted by priority
        </div>
      </div>
      <div className="space-y-2">
        {sorted.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${
              p.status === 'in-progress'
                ? 'border-primary/30 bg-primary/5 shadow-glow-primary'
                : p.triageResult.priority === 'critical'
                ? 'border-critical/30 bg-critical/5'
                : 'border-border bg-card'
            }`}
          >
            {/* Position */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-heading text-sm font-bold text-foreground flex-shrink-0">
              {i + 1}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-foreground">{p.name}</span>
                {p.status === 'in-progress' && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">In Progress</span>
                )}
                {p.status === 'redirected' && (
                  <span className="flex items-center gap-1 text-xs bg-critical/10 text-critical px-2 py-0.5 rounded-full font-medium">
                    <AlertTriangle className="h-3 w-3" /> ER Redirect
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-3 w-3" /> Age {p.age}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.appointmentTime}</span>
                <span>Dr. {p.doctor.replace('Dr. ', '')}</span>
              </div>
            </div>

            {/* Score + Badge */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-right hidden sm:block">
                <p className="font-heading text-lg font-bold text-foreground">{p.triageResult.score}</p>
                <p className="text-xs text-muted-foreground">score</p>
              </div>
              <PriorityBadge priority={p.triageResult.priority} animated={p.triageResult.priority === 'critical'} />
            </div>
          </motion.div>
        ))}
        {sorted.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No patients in queue</p>
        )}
      </div>
    </div>
  );
}
