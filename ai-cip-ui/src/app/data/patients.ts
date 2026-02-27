export interface Patient {
  id: string;
  name: string;
  patientId: string;
  status: 'stable' | 'monitoring' | 'critical';
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    oxygenLevel: number;
  };
  summary: string;
}

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    patientId: 'PT-10234',
    status: 'stable',
    riskLevel: 'low',
    lastUpdated: '2 hours ago',
    vitals: {
      heartRate: 72,
      bloodPressure: '120/80',
      oxygenLevel: 98,
    },
    summary: 'Patient shows stable vital signs post-cardiac procedure. Blood pressure within normal range. Recommended for discharge within 24 hours with follow-up appointment scheduled.',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    patientId: 'PT-10235',
    status: 'monitoring',
    riskLevel: 'medium',
    lastUpdated: '45 mins ago',
    vitals: {
      heartRate: 88,
      bloodPressure: '138/92',
      oxygenLevel: 94,
    },
    summary: 'Patient presents with elevated blood pressure readings. Slight tachycardia observed. Continue monitoring vitals every 2 hours. Consider adjusting antihypertensive medication dosage.',
  },
  {
    id: '3',
    name: 'Anika Patel',
    patientId: 'PT-10236',
    status: 'critical',
    riskLevel: 'high',
    lastUpdated: '15 mins ago',
    vitals: {
      heartRate: 112,
      bloodPressure: '160/105',
      oxygenLevel: 89,
    },
    summary: 'URGENT: Patient showing signs of hypertensive crisis with declining oxygen saturation. Immediate intervention required. ICU consultation initiated. Continuous cardiac monitoring active.',
  },
  {
    id: '4',
    name: 'Arjun Mehta',
    patientId: 'PT-10237',
    status: 'stable',
    riskLevel: 'low',
    lastUpdated: '1 hour ago',
    vitals: {
      heartRate: 68,
      bloodPressure: '118/78',
      oxygenLevel: 99,
    },
    summary: 'Routine post-operative check showing excellent recovery. All vital signs within normal parameters. Pain management effective. Patient ambulatory and ready for step-down unit transfer.',
  },
  {
    id: '5',
    name: 'Kavya Reddy',
    patientId: 'PT-10238',
    status: 'monitoring',
    riskLevel: 'medium',
    lastUpdated: '30 mins ago',
    vitals: {
      heartRate: 92,
      bloodPressure: '142/88',
      oxygenLevel: 95,
    },
    summary: 'Patient recovering from acute episode. Vitals trending in positive direction but require continued observation. Medication adjustment showing early positive response.',
  },
  {
    id: '6',
    name: 'Vikram Singh',
    patientId: 'PT-10239',
    status: 'stable',
    riskLevel: 'low',
    lastUpdated: '3 hours ago',
    vitals: {
      heartRate: 75,
      bloodPressure: '122/82',
      oxygenLevel: 97,
    },
    summary: 'Stable condition maintained throughout observation period. Responsive to treatment protocol. Scheduled for routine follow-up examination in outpatient clinic next week.',
  },
];