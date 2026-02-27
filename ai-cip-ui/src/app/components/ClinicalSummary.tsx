import { 
  Activity, 
  Heart, 
  Droplet, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  ArrowLeft,
  Thermometer,
  Brain
} from 'lucide-react';
import { Patient } from '../data/patients';

interface ClinicalSummaryProps {
  patient: Patient;
  onBack: () => void;
}

const riskConfig = {
  low: { 
    label: 'Low Risk', 
    className: 'bg-green-50 text-green-700 border-green-200',
    icon: TrendingDown,
    color: 'text-green-600',
  },
  medium: { 
    label: 'Medium Risk', 
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Activity,
    color: 'text-amber-600',
  },
  high: { 
    label: 'High Risk', 
    className: 'bg-red-50 text-red-700 border-red-200',
    icon: TrendingUp,
    color: 'text-red-600',
  },
};

export function ClinicalSummary({ patient, onBack }: ClinicalSummaryProps) {
  const riskStyle = riskConfig[patient.riskLevel];
  const RiskIcon = riskStyle.icon;

  // Mock data for additional sections
  const alerts = [
    { id: 1, type: 'warning', message: 'Blood pressure elevated during last reading', time: '15 mins ago' },
    { id: 2, type: 'info', message: 'Medication schedule updated', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Lab results received and reviewed', time: '2 hours ago' },
  ];

  const recoveryMetrics = [
    { label: 'Mobility', percentage: 75, status: 'improving' },
    { label: 'Pain Management', percentage: 85, status: 'stable' },
    { label: 'Vital Stability', percentage: patient.riskLevel === 'low' ? 90 : patient.riskLevel === 'medium' ? 70 : 45, status: patient.riskLevel === 'low' ? 'improving' : 'monitoring' },
    { label: 'Overall Recovery', percentage: 80, status: 'improving' },
  ];

  const dischargeTimeline = [
    { milestone: 'Vital signs stabilized', status: 'completed', date: 'Feb 24, 2026' },
    { milestone: 'Mobility assessment passed', status: 'completed', date: 'Feb 25, 2026' },
    { milestone: 'Final lab work review', status: 'current', date: 'Feb 26, 2026' },
    { milestone: 'Discharge planning', status: 'pending', date: 'Feb 27, 2026' },
    { milestone: 'Estimated discharge', status: 'pending', date: 'Feb 28, 2026' },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Activity className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Patient List</span>
      </button>

      {/* Patient Header Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl font-semibold text-blue-600">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">{patient.name}</h1>
              <p className="text-slate-500 mt-1">Patient ID: {patient.patientId}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-slate-600">Last Updated: {patient.lastUpdated}</span>
                <span className="text-sm text-slate-400">•</span>
                <span className="text-sm text-slate-600">Status: {patient.status}</span>
              </div>
            </div>
          </div>
          
          {/* Risk Level Badge */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${riskStyle.className}`}>
            <RiskIcon className="w-5 h-5" />
            <span className="font-semibold">{riskStyle.label}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Clinical Summary Card */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">AI-Generated Clinical Summary</h2>
                  <p className="text-sm text-slate-500">Powered by Clinical Intelligence AI</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-slate-700 leading-relaxed mb-4">{patient.summary}</p>
              
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Key Insights</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Patient responding well to current treatment protocol</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Vital signs trending in positive direction over 24-hour period</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <Activity className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Recommend continued monitoring for next 12-24 hours</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Vital Signs Summary Card */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">Vital Signs Summary</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Heart Rate */}
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-slate-700">Heart Rate</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-slate-900">{patient.vitals.heartRate}</span>
                    <span className="text-sm text-slate-500">bpm</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">Within range</span>
                  </div>
                </div>

                {/* Blood Pressure */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-slate-700">Blood Pressure</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-slate-900">{patient.vitals.bloodPressure}</span>
                    <span className="text-sm text-slate-500">mmHg</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-slate-600">Monitoring</span>
                  </div>
                </div>

                {/* Oxygen Level */}
                <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplet className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm font-medium text-slate-700">Oxygen Level</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-slate-900">{patient.vitals.oxygenLevel}</span>
                    <span className="text-sm text-slate-500">%</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">Stable</span>
                  </div>
                </div>
              </div>

              {/* Additional Vitals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium text-slate-700">Temperature</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold text-slate-900">98.6</span>
                    <span className="text-sm text-slate-500">°F</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium text-slate-700">Respiratory Rate</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold text-slate-900">16</span>
                    <span className="text-sm text-slate-500">breaths/min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recovery Prediction Card */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">Recovery Prediction</h2>
              <p className="text-sm text-slate-500 mt-1">AI-powered recovery progress analysis</p>
            </div>
            <div className="p-6 space-y-4">
              {recoveryMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{metric.percentage}%</span>
                      {metric.status === 'improving' && (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        metric.percentage >= 80
                          ? 'bg-green-500'
                          : metric.percentage >= 60
                          ? 'bg-blue-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${metric.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Alerts & Discharge */}
        <div className="space-y-6">
          {/* Alerts Card */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">Recent Alerts</h2>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                  {alerts.length} alerts
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${getAlertStyle(alert.type)}`}
                >
                  <div className="flex items-start gap-2">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900">{alert.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discharge Prediction Card */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <h2 className="font-semibold text-slate-900">Discharge Timeline</h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">Estimated: Feb 28, 2026</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dischargeTimeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          item.status === 'completed'
                            ? 'bg-green-500 border-green-500'
                            : item.status === 'current'
                            ? 'bg-blue-500 border-blue-500'
                            : 'bg-white border-slate-300'
                        }`}
                      >
                        {item.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : item.status === 'current' ? (
                          <Clock className="w-4 h-4 text-white" />
                        ) : (
                          <div className="w-2 h-2 bg-slate-300 rounded-full" />
                        )}
                      </div>
                      {index < dischargeTimeline.length - 1 && (
                        <div
                          className={`absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 ${
                            item.status === 'completed' ? 'bg-green-300' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <p
                        className={`text-sm font-medium ${
                          item.status === 'pending' ? 'text-slate-500' : 'text-slate-900'
                        }`}
                      >
                        {item.milestone}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <button className="w-full px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Initiate Discharge Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
