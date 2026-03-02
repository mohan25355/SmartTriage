import { useState } from 'react';
import { QueueView } from '@/components/QueueView';
import { mockPatients, mockDoctors } from '@/lib/mockData';
import { PriorityBadge } from '@/components/PriorityBadge';
import { Users, Stethoscope, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DoctorDashboard() {
  const [filterDoctor, setFilterDoctor] = useState('all');

  const filtered = filterDoctor === 'all'
    ? mockPatients
    : mockPatients.filter(p => p.doctor === filterDoctor);

  const criticalCount = mockPatients.filter(p => p.triageResult.priority === 'critical' && p.status !== 'completed').length;

  return (
    <div className="container py-8 max-w-5xl">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Doctor Queue</h1>
          <p className="text-muted-foreground">Real-time patient queue sorted by priority score</p>
        </div>
        {criticalCount > 0 && (
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-critical/10 border border-critical/30 text-critical text-sm font-medium"
          >
            <AlertTriangle className="h-4 w-4" />
            {criticalCount} Critical {criticalCount === 1 ? 'Patient' : 'Patients'}
          </motion.div>
        )}
      </div>

      {/* Doctor stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {mockDoctors.filter(d => d.available).map(d => (
          <button
            key={d.id}
            onClick={() => setFilterDoctor(filterDoctor === d.name ? 'all' : d.name)}
            className={`rounded-xl border p-4 text-left transition-all ${
              filterDoctor === d.name
                ? 'border-primary bg-primary/5 shadow-glow-primary'
                : 'border-border bg-card hover:border-primary/40'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">{d.specialty}</span>
            </div>
            <p className="font-medium text-foreground text-sm truncate">{d.name}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" /> {d.queueCount} in queue
            </div>
          </button>
        ))}
      </div>

      {/* Priority legend */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-3 rounded-lg bg-muted/50">
        <span className="text-xs text-muted-foreground font-medium">Priority Levels:</span>
        <PriorityBadge priority="critical" size="sm" />
        <PriorityBadge priority="high" size="sm" />
        <PriorityBadge priority="medium" size="sm" />
        <PriorityBadge priority="low" size="sm" />
      </div>

      <QueueView patients={filtered} title={filterDoctor === 'all' ? 'All Patients' : `Queue — ${filterDoctor}`} />
    </div>
  );
}
