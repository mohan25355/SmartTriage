import { useState } from 'react';
import { motion } from 'framer-motion';
import { SymptomChecker } from '@/components/SymptomChecker';
import { CalendarClock, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockDoctors } from '@/lib/mockData';

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];
const bookedSlots = ['09:00', '09:30', '10:30', '14:00']; // mock conflicts

export default function PatientDashboard() {
  const [tab, setTab] = useState<'triage' | 'book'>('triage');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [booked, setBooked] = useState(false);

  const availableDoctors = mockDoctors.filter(d => d.available);

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Patient Portal</h1>
      <p className="text-muted-foreground mb-8">Check your symptoms or book an appointment</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {([['triage', 'Symptom Checker', Clock], ['book', 'Book Appointment', CalendarClock]] as const).map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setTab(key as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === key ? 'bg-primary text-primary-foreground shadow-glow-primary' : 'bg-card text-muted-foreground border border-border hover:border-primary/40'
            }`}
          >
            <Icon className="h-4 w-4" />{label}
          </button>
        ))}
      </div>

      {tab === 'triage' && <SymptomChecker />}

      {tab === 'book' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {booked ? (
            <div className="text-center py-16 space-y-4">
              <CheckCircle className="h-16 w-16 text-low mx-auto" />
              <h2 className="font-heading text-2xl font-bold text-foreground">Appointment Confirmed!</h2>
              <p className="text-muted-foreground">
                {selectedSlot} with {selectedDoctor}
              </p>
              <Button variant="outline" onClick={() => { setBooked(false); setSelectedSlot(''); setSelectedDoctor(''); }}>
                Book Another
              </Button>
            </div>
          ) : (
            <>
              {/* Doctor selection */}
              <section>
                <h3 className="font-heading text-lg font-semibold mb-3">Select Doctor</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {availableDoctors.map(d => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDoctor(d.name)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedDoctor === d.name
                          ? 'border-primary bg-primary/5 shadow-glow-primary'
                          : 'border-border bg-card hover:border-primary/40'
                      }`}
                    >
                      <p className="font-medium text-foreground">{d.name}</p>
                      <p className="text-sm text-muted-foreground">{d.specialty}</p>
                      <p className="text-xs text-muted-foreground mt-1">{d.queueCount} in queue</p>
                    </button>
                  ))}
                </div>
              </section>

              {/* Time slots */}
              {selectedDoctor && (
                <section>
                  <h3 className="font-heading text-lg font-semibold mb-3">Select Time Slot</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map(t => {
                      const isBooked = bookedSlots.includes(t);
                      return (
                        <button
                          key={t}
                          disabled={isBooked}
                          onClick={() => setSelectedSlot(t)}
                          className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                            isBooked
                              ? 'bg-muted text-muted-foreground/40 cursor-not-allowed line-through'
                              : selectedSlot === t
                              ? 'bg-primary text-primary-foreground shadow-glow-primary'
                              : 'bg-card border border-border text-foreground hover:border-primary/40'
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  {bookedSlots.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">Strikethrough slots are already booked (conflict detection)</p>
                  )}
                </section>
              )}

              {selectedDoctor && selectedSlot && (
                <Button size="lg" onClick={() => setBooked(true)} className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow-primary font-heading">
                  <CalendarClock className="h-5 w-5 mr-2" />
                  Confirm Appointment — {selectedSlot} with {selectedDoctor}
                </Button>
              )}
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
