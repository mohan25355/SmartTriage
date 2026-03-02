import { mockAnalytics, mockPatients } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Activity, Users, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const PRIORITY_COLORS = {
  critical: 'hsl(0, 72%, 51%)',
  high: 'hsl(25, 95%, 53%)',
  medium: 'hsl(45, 93%, 47%)',
  low: 'hsl(142, 71%, 45%)',
};

const pieData = [
  { name: 'Critical', value: mockPatients.filter(p => p.triageResult.priority === 'critical').length, color: PRIORITY_COLORS.critical },
  { name: 'High', value: mockPatients.filter(p => p.triageResult.priority === 'high').length, color: PRIORITY_COLORS.high },
  { name: 'Medium', value: mockPatients.filter(p => p.triageResult.priority === 'medium').length, color: PRIORITY_COLORS.medium },
  { name: 'Low', value: mockPatients.filter(p => p.triageResult.priority === 'low').length, color: PRIORITY_COLORS.low },
];

const statCards = [
  { label: 'Total Patients Today', value: mockPatients.length, icon: Users, trend: '+12%' },
  { label: 'Avg Wait Time', value: '18 min', icon: Clock, trend: '-23%' },
  { label: 'Critical Cases', value: mockPatients.filter(p => p.triageResult.priority === 'critical').length, icon: AlertTriangle, trend: '' },
  { label: 'Completed', value: mockPatients.filter(p => p.status === 'completed').length, icon: Activity, trend: '' },
];

export default function AdminDashboard() {
  return (
    <div className="container py-8 max-w-6xl">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
      <p className="text-muted-foreground mb-8">Hospital operations overview</p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-5 shadow-card"
          >
            <div className="flex items-center justify-between mb-3">
              <s.icon className="h-5 w-5 text-primary" />
              {s.trend && <span className="text-xs font-medium text-low">{s.trend}</span>}
            </div>
            <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Weekly patients bar chart */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-heading text-base font-semibold mb-4">Weekly Patient Volume</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockAnalytics.dailyPatients}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(195, 20%, 88%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="critical" stackId="a" fill={PRIORITY_COLORS.critical} radius={[0, 0, 0, 0]} />
              <Bar dataKey="high" stackId="a" fill={PRIORITY_COLORS.high} />
              <Bar dataKey="medium" stackId="a" fill={PRIORITY_COLORS.medium} />
              <Bar dataKey="low" stackId="a" fill={PRIORITY_COLORS.low} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Priority distribution pie */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-heading text-base font-semibold mb-4">Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name} ({d.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Avg wait times */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-heading text-base font-semibold mb-4">Avg Wait Times by Priority</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockAnalytics.avgWaitTimes} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(195, 20%, 88%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} unit=" min" />
              <YAxis dataKey="priority" type="category" tick={{ fontSize: 12 }} width={60} />
              <Tooltip />
              <Bar dataKey="minutes" fill="hsl(174, 62%, 38%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department load */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-heading text-base font-semibold mb-4">Department Load</h3>
          <div className="space-y-4">
            {mockAnalytics.departmentLoad.map(d => (
              <div key={d.dept}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{d.dept}</span>
                  <span className="text-muted-foreground">{d.load}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.load}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`h-full rounded-full ${
                      d.load >= 80 ? 'bg-critical' : d.load >= 60 ? 'bg-high' : 'bg-primary'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
