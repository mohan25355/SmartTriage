import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, CalendarClock, Shield, Stethoscope, Timer, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Zap, title: 'AI Triage Scoring', desc: 'Multi-factor risk assessment using symptoms, age, and medical history' },
  { icon: Timer, title: 'Real-Time Queue', desc: 'Dynamic priority reordering ensures critical patients are seen first' },
  { icon: Shield, title: 'Emergency Redirect', desc: 'Automatic ER routing for critical-score patients' },
  { icon: TrendingUp, title: 'Analytics Dashboard', desc: 'Track patient flow, wait times, and department load' },
];

const stats = [
  { value: '< 3 min', label: 'Avg Critical Response' },
  { value: '94%', label: 'Patient Satisfaction' },
  { value: '12K+', label: 'Patients Triaged' },
  { value: '45%', label: 'Wait Time Reduction' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-[0.04]" />
        <div className="container relative py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Activity className="h-4 w-4" />
              Intelligent Emergency Prioritization
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Smarter Triage,<br />
              <span className="text-gradient-hero">Faster Care</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              SmartTriage+ uses multi-factor risk scoring to dynamically prioritize patients, reduce wait times, and ensure critical cases receive immediate attention.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow-primary font-heading">
                <Link to="/patient">
                  <CalendarClock className="h-5 w-5 mr-2" />
                  Book Appointment
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-heading">
                <Link to="/doctor">
                  <Stethoscope className="h-5 w-5 mr-2" />
                  Doctor Portal
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/50">
        <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="text-center"
            >
              <p className="font-heading text-3xl md:text-4xl font-bold text-gradient-hero">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Our intelligent triage system evaluates multiple risk factors to deliver accurate priority assessments in seconds.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5 }}
              className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-all hover:-translate-y-1"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-gradient-hero group-hover:text-primary-foreground transition-all">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="rounded-2xl bg-gradient-hero p-10 md:p-16 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Transform Patient Care?</h2>
          <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">Start using SmartTriage+ today and deliver faster, smarter healthcare.</p>
          <Button asChild size="lg" variant="secondary" className="font-heading">
            <Link to="/patient">
              Get Started <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
