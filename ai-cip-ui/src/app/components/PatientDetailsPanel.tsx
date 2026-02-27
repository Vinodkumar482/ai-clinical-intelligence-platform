import { Heart, Activity, Droplet, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { Patient } from '../data/patients';

interface PatientDetailsPanelProps {
  patient: Patient | null;
}

const statusConfig = {
  stable: { label: 'Stable', className: 'bg-green-100 text-green-700 border-green-200' },
  monitoring: { label: 'Monitoring', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  critical: { label: 'Critical', className: 'bg-red-100 text-red-700 border-red-200' },
};

const riskConfig = {
  low: { 
    label: 'Low Risk', 
    className: 'bg-green-50 text-green-700 border-green-200',
    icon: TrendingDown,
  },
  medium: { 
    label: 'Medium Risk', 
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Activity,
  },
  high: { 
    label: 'High Risk', 
    className: 'bg-red-50 text-red-700 border-red-200',
    icon: TrendingUp,
  },
};

export function PatientDetailsPanel({ patient }: PatientDetailsPanelProps) {
  if (!patient) {
    return (
      <div className="w-96 bg-white border-l border-slate-200 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center mb-4">
            <Activity className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500">Select a patient to view details</p>
        </div>
      </div>
    );
  }

  const statusStyle = statusConfig[patient.status];
  const riskStyle = riskConfig[patient.riskLevel];
  const RiskIcon = riskStyle.icon;

  const getVitalStatus = (type: 'hr' | 'bp' | 'o2', value: number | string) => {
    if (type === 'hr') {
      const hr = value as number;
      if (hr < 60 || hr > 100) return 'warning';
      return 'normal';
    }
    if (type === 'o2') {
      const o2 = value as number;
      if (o2 < 95) return 'warning';
      return 'normal';
    }
    return 'normal';
  };

  const hrStatus = getVitalStatus('hr', patient.vitals.heartRate);
  const o2Status = getVitalStatus('o2', patient.vitals.oxygenLevel);

  return (
    <div className="w-96 bg-white border-l border-slate-200 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-slate-200 p-6 z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{patient.name}</h2>
            <p className="text-sm text-slate-500">{patient.patientId}</p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle.className}`}>
            {statusStyle.label}
          </span>
        </div>
        
        <div className={`flex items-center gap-2 p-3 rounded-lg border ${riskStyle.className}`}>
          <RiskIcon className="w-5 h-5" />
          <span className="font-medium">{riskStyle.label}</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Vital Signs */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Vital Signs</h3>
          <div className="space-y-4">
            {/* Heart Rate */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Heart className={`w-5 h-5 ${hrStatus === 'warning' ? 'text-amber-600' : 'text-red-500'}`} />
                  <span className="text-sm font-medium text-slate-700">Heart Rate</span>
                </div>
                {hrStatus === 'warning' && (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-slate-900">{patient.vitals.heartRate}</span>
                <span className="text-sm text-slate-500">bpm</span>
              </div>
              {hrStatus === 'warning' && (
                <p className="text-xs text-amber-600 mt-2">Outside normal range (60-100 bpm)</p>
              )}
            </div>

            {/* Blood Pressure */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-slate-700">Blood Pressure</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-slate-900">{patient.vitals.bloodPressure}</span>
                <span className="text-sm text-slate-500">mmHg</span>
              </div>
            </div>

            {/* Oxygen Level */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Droplet className={`w-5 h-5 ${o2Status === 'warning' ? 'text-amber-600' : 'text-cyan-500'}`} />
                  <span className="text-sm font-medium text-slate-700">Oxygen Level</span>
                </div>
                {o2Status === 'warning' && (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-slate-900">{patient.vitals.oxygenLevel}</span>
                <span className="text-sm text-slate-500">%</span>
              </div>
              {o2Status === 'warning' && (
                <p className="text-xs text-amber-600 mt-2">Below normal range (&gt;95%)</p>
              )}
            </div>
          </div>
        </div>

        {/* AI Clinical Summary */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">AI</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Clinical Summary</h3>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-700 leading-relaxed">{patient.summary}</p>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Last updated: {patient.lastUpdated}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Update Vitals
            </button>
            <button className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
              View Full History
            </button>
            <button className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
