import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateTriageScore, SYMPTOM_OPTIONS, CHRONIC_CONDITIONS, type TriageResult } from '@/lib/triage';
import { PriorityBadge } from './PriorityBadge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

export function SymptomChecker() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [age, setAge] = useState(30);
  const [chronic, setChronic] = useState<string[]>([]);
  const [pain, setPain] = useState([3]);
  const [temp, setTemp] = useState([37]);
  const [duration, setDuration] = useState<'hours' | 'days' | 'weeks'>('days');
  const [result, setResult] = useState<TriageResult | null>(null);

  const toggleItem = (item: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const handleSubmit = () => {
    const r = calculateTriageScore({
      symptoms, age, chronicConditions: chronic,
      painLevel: pain[0], temperature: temp[0], duration,
    });
    setResult(r);
  };

  return (
    <div className="space-y-8">
      {/* Symptoms */}
      <section>
        <h3 className="font-heading text-lg font-semibold mb-3">Select Symptoms</h3>
        <div className="flex flex-wrap gap-2">
          {SYMPTOM_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => toggleItem(s, symptoms, setSymptoms)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                symptoms.includes(s)
                  ? 'bg-primary text-primary-foreground border-primary shadow-glow-primary'
                  : 'bg-card text-foreground border-border hover:border-primary/40'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Age + Pain + Temp */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Age: {age}</label>
          <input
            type="number"
            value={age}
            onChange={e => setAge(Number(e.target.value))}
            min={0} max={120}
            className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Pain Level: {pain[0]}/10</label>
          <Slider value={pain} onValueChange={setPain} min={0} max={10} step={1} className="mt-3" />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Temperature: {temp[0]}°C</label>
          <Slider value={temp} onValueChange={setTemp} min={35} max={42} step={0.1} className="mt-3" />
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Symptom Duration</label>
        <div className="flex gap-2">
          {(['hours', 'days', 'weeks'] as const).map(d => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all capitalize ${
                duration === d ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border hover:border-primary/40'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Chronic Conditions */}
      <section>
        <h3 className="font-heading text-lg font-semibold mb-3">Chronic Conditions</h3>
        <div className="flex flex-wrap gap-2">
          {CHRONIC_CONDITIONS.map(c => (
            <button
              key={c}
              onClick={() => toggleItem(c, chronic, setChronic)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                chronic.includes(c)
                  ? 'bg-destructive text-destructive-foreground border-destructive'
                  : 'bg-card text-foreground border-border hover:border-destructive/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <Button size="lg" onClick={handleSubmit} className="w-full sm:w-auto bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow-primary font-heading text-base">
        <Zap className="h-5 w-5 mr-2" />
        Calculate Triage Score
      </Button>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-border bg-card p-6 shadow-elevated space-y-4"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Triage Score</p>
                <div className="flex items-center gap-3">
                  <span className="font-heading text-4xl font-bold">{result.score}</span>
                  <PriorityBadge priority={result.priority} score={result.score} size="lg" animated showScore={false} />
                </div>
              </div>
              {result.priority === 'critical' ? (
                <AlertTriangle className="h-10 w-10 text-critical animate-pulse-glow" />
              ) : result.priority === 'high' ? (
                <Clock className="h-10 w-10 text-high" />
              ) : (
                <CheckCircle className="h-10 w-10 text-low" />
              )}
            </div>
            <p className="text-foreground font-medium">{result.recommendation}</p>
            {result.factors.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Contributing Factors:</p>
                <ul className="space-y-1">
                  {result.factors.map((f, i) => (
                    <li key={i} className="text-sm text-foreground flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
