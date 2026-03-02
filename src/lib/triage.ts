export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';

export interface TriageInput {
  symptoms: string[];
  age: number;
  chronicConditions: string[];
  painLevel: number; // 1-10
  temperature?: number;
  duration: string; // 'hours' | 'days' | 'weeks'
}

export interface TriageResult {
  score: number; // 0-100
  priority: PriorityLevel;
  label: string;
  recommendation: string;
  factors: string[];
}

const CRITICAL_SYMPTOMS = ['chest pain', 'difficulty breathing', 'severe bleeding', 'loss of consciousness', 'stroke symptoms', 'seizure'];
const HIGH_SYMPTOMS = ['high fever', 'severe headache', 'abdominal pain', 'fracture', 'burns', 'allergic reaction'];
const MEDIUM_SYMPTOMS = ['moderate pain', 'persistent cough', 'dizziness', 'nausea', 'minor injury', 'infection signs'];

const CHRONIC_WEIGHT: Record<string, number> = {
  'diabetes': 8, 'heart disease': 12, 'asthma': 6, 'hypertension': 7,
  'cancer': 10, 'kidney disease': 9, 'liver disease': 8, 'immunocompromised': 11,
};

export function calculateTriageScore(input: TriageInput): TriageResult {
  let score = 0;
  const factors: string[] = [];

  // Symptom scoring
  input.symptoms.forEach(s => {
    const sl = s.toLowerCase();
    if (CRITICAL_SYMPTOMS.some(c => sl.includes(c))) { score += 25; factors.push(`Critical symptom: ${s}`); }
    else if (HIGH_SYMPTOMS.some(c => sl.includes(c))) { score += 15; factors.push(`Severe symptom: ${s}`); }
    else if (MEDIUM_SYMPTOMS.some(c => sl.includes(c))) { score += 8; factors.push(`Moderate symptom: ${s}`); }
    else { score += 4; }
  });

  // Age factor
  if (input.age >= 70) { score += 15; factors.push('Age ≥ 70 (high risk)'); }
  else if (input.age >= 55) { score += 8; factors.push('Age 55-69 (elevated risk)'); }
  else if (input.age <= 5) { score += 12; factors.push('Age ≤ 5 (pediatric risk)'); }

  // Chronic conditions
  input.chronicConditions.forEach(c => {
    const w = CHRONIC_WEIGHT[c.toLowerCase()] || 5;
    score += w;
    factors.push(`Chronic condition: ${c}`);
  });

  // Pain level
  if (input.painLevel >= 8) { score += 12; factors.push('Severe pain (8-10)'); }
  else if (input.painLevel >= 5) { score += 6; factors.push('Moderate pain (5-7)'); }

  // Temperature
  if (input.temperature && input.temperature >= 39.5) { score += 10; factors.push('High fever (≥39.5°C)'); }
  else if (input.temperature && input.temperature >= 38) { score += 5; factors.push('Fever (≥38°C)'); }

  // Duration
  if (input.duration === 'hours') { score += 5; }
  else if (input.duration === 'weeks') { score -= 3; }

  score = Math.min(100, Math.max(0, score));

  let priority: PriorityLevel, label: string, recommendation: string;
  if (score >= 75) {
    priority = 'critical'; label = 'CRITICAL'; recommendation = 'Immediate emergency attention required. Proceed to ER.';
  } else if (score >= 50) {
    priority = 'high'; label = 'HIGH'; recommendation = 'Urgent care needed. Priority appointment within 1 hour.';
  } else if (score >= 25) {
    priority = 'medium'; label = 'MEDIUM'; recommendation = 'Standard appointment. Schedule within 4 hours.';
  } else {
    priority = 'low'; label = 'LOW'; recommendation = 'Non-urgent. Schedule at next available slot.';
  }

  return { score, priority, label, recommendation, factors };
}

export const SYMPTOM_OPTIONS = [
  'Chest pain', 'Difficulty breathing', 'Severe bleeding', 'Loss of consciousness',
  'High fever', 'Severe headache', 'Abdominal pain', 'Fracture',
  'Moderate pain', 'Persistent cough', 'Dizziness', 'Nausea',
  'Minor injury', 'Sore throat', 'Back pain', 'Skin rash',
  'Allergic reaction', 'Burns', 'Seizure', 'Stroke symptoms',
];

export const CHRONIC_CONDITIONS = [
  'Diabetes', 'Heart disease', 'Asthma', 'Hypertension',
  'Cancer', 'Kidney disease', 'Liver disease', 'Immunocompromised',
];

export interface Patient {
  id: string;
  name: string;
  age: number;
  triageResult: TriageResult;
  appointmentTime: string;
  doctor: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'redirected';
  checkInTime: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  available: boolean;
  currentPatient?: string;
  queueCount: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  doctor: string;
}
