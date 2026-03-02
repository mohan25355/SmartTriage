import { PriorityLevel } from '@/lib/triage';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PriorityBadgeProps {
  priority: PriorityLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
  animated?: boolean;
}

const config: Record<PriorityLevel, { bg: string; text: string; ring: string; label: string }> = {
  critical: { bg: 'bg-critical', text: 'text-critical-foreground', ring: 'ring-critical/30', label: 'CRITICAL' },
  high: { bg: 'bg-high', text: 'text-high-foreground', ring: 'ring-high/30', label: 'HIGH' },
  medium: { bg: 'bg-medium', text: 'text-medium-foreground', ring: 'ring-medium/30', label: 'MEDIUM' },
  low: { bg: 'bg-low', text: 'text-low-foreground', ring: 'ring-low/30', label: 'LOW' },
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base font-semibold',
};

export function PriorityBadge({ priority, score, size = 'md', showScore = false, animated = false }: PriorityBadgeProps) {
  const c = config[priority];
  const Comp = animated && priority === 'critical' ? motion.span : 'span';
  const animProps = animated && priority === 'critical' ? { animate: { scale: [1, 1.05, 1] }, transition: { duration: 1.5, repeat: Infinity } } : {};

  return (
    <Comp
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-heading font-semibold ring-2',
        c.bg, c.text, c.ring, sizes[size],
      )}
      {...animProps}
    >
      {priority === 'critical' && <span className="inline-block h-2 w-2 rounded-full bg-current animate-pulse-glow" />}
      {c.label}
      {showScore && score !== undefined && <span className="opacity-80">({score})</span>}
    </Comp>
  );
}
