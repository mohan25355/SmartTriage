import { Patient, Doctor, type PriorityLevel } from './triage';

export const mockDoctors: Doctor[] = [
  { id: 'd1', name: 'Dr. Sarah Chen', specialty: 'Emergency Medicine', available: true, queueCount: 4 },
  { id: 'd2', name: 'Dr. James Wilson', specialty: 'Internal Medicine', available: true, currentPatient: 'Maria Lopez', queueCount: 3 },
  { id: 'd3', name: 'Dr. Priya Patel', specialty: 'Cardiology', available: true, queueCount: 2 },
  { id: 'd4', name: 'Dr. Michael Okafor', specialty: 'Pediatrics', available: false, queueCount: 0 },
  { id: 'd5', name: 'Dr. Emily Nakamura', specialty: 'Orthopedics', available: true, queueCount: 5 },
];

const makePt = (id: string, name: string, age: number, score: number, priority: PriorityLevel, label: string, doctor: string, status: Patient['status'], time: string, checkIn: string): Patient => ({
  id, name, age,
  triageResult: { score, priority, label, recommendation: '', factors: [] },
  appointmentTime: time, doctor, status, checkInTime: checkIn,
});

export const mockPatients: Patient[] = [
  makePt('p1', 'John Reeves', 72, 82, 'critical', 'CRITICAL', 'Dr. Sarah Chen', 'waiting', '09:00', '08:42'),
  makePt('p2', 'Maria Lopez', 45, 61, 'high', 'HIGH', 'Dr. James Wilson', 'in-progress', '09:15', '08:50'),
  makePt('p3', 'Ahmed Hassan', 34, 38, 'medium', 'MEDIUM', 'Dr. Sarah Chen', 'waiting', '09:30', '09:05'),
  makePt('p4', 'Lisa Park', 8, 55, 'high', 'HIGH', 'Dr. Priya Patel', 'waiting', '09:45', '09:10'),
  makePt('p5', 'Robert Taylor', 29, 18, 'low', 'LOW', 'Dr. Emily Nakamura', 'waiting', '10:00', '09:22'),
  makePt('p6', 'Nina Petrova', 67, 70, 'high', 'HIGH', 'Dr. Sarah Chen', 'waiting', '10:15', '09:30'),
  makePt('p7', 'Carlos Mendez', 52, 90, 'critical', 'CRITICAL', 'Dr. Priya Patel', 'redirected', '10:30', '09:35'),
  makePt('p8', 'Aisha Bello', 41, 30, 'medium', 'MEDIUM', 'Dr. James Wilson', 'completed', '08:30', '08:15'),
];

export const mockAnalytics = {
  dailyPatients: [
    { day: 'Mon', patients: 42, critical: 5, high: 12, medium: 15, low: 10 },
    { day: 'Tue', patients: 38, critical: 3, high: 10, medium: 14, low: 11 },
    { day: 'Wed', patients: 51, critical: 7, high: 15, medium: 18, low: 11 },
    { day: 'Thu', patients: 45, critical: 4, high: 13, medium: 16, low: 12 },
    { day: 'Fri', patients: 55, critical: 8, high: 16, medium: 19, low: 12 },
    { day: 'Sat', patients: 33, critical: 2, high: 9, medium: 12, low: 10 },
    { day: 'Sun', patients: 28, critical: 2, high: 7, medium: 11, low: 8 },
  ],
  avgWaitTimes: [
    { priority: 'Critical', minutes: 3 },
    { priority: 'High', minutes: 12 },
    { priority: 'Medium', minutes: 28 },
    { priority: 'Low', minutes: 45 },
  ],
  departmentLoad: [
    { dept: 'Emergency', load: 87 },
    { dept: 'Internal Med', load: 65 },
    { dept: 'Cardiology', load: 72 },
    { dept: 'Pediatrics', load: 40 },
    { dept: 'Orthopedics', load: 58 },
  ],
};
