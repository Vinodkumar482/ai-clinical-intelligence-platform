import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  Heart, 
  Droplet, 
  Activity,
  Clock,
  Filter,
  Bell
} from 'lucide-react';

interface Alert {
  id: string;
  patientName: string;
  patientId: string;
  alertType: string;
  severity: 'critical' | 'warning' | 'normal';
  message: string;
  timestamp: string;
  vitals?: {
    heartRate: number;
    oxygenLevel: number;
    bloodPressure: string;
  };
}

interface MonitoringPatient {
  id: string;
  name: string;
  patientId: string;
  heartRate: number;
  oxygenLevel: number;
  bloodPressure: string;
  status: 'critical' | 'warning' | 'stable';
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    patientName: 'Anika Patel',
    patientId: 'PT-10236',
    alertType: 'Critical Vital Signs',
    severity: 'critical',
    message: 'Oxygen saturation dropped below 90%. Immediate attention required.',
    timestamp: '2 mins ago',
    vitals: { heartRate: 112, oxygenLevel: 89, bloodPressure: '160/105' },
  },
  {
    id: '2',
    patientName: 'Rajesh Kumar',
    patientId: 'PT-10235',
    alertType: 'Elevated Blood Pressure',
    severity: 'warning',
    message: 'Blood pressure elevated above normal range. Monitoring required.',
    timestamp: '15 mins ago',
    vitals: { heartRate: 88, oxygenLevel: 94, bloodPressure: '138/92' },
  },
  {
    id: '3',
    patientName: 'Arjun Mehta',
    patientId: 'PT-10237',
    alertType: 'Medication Due',
    severity: 'normal',
    message: 'Scheduled medication administration due in 15 minutes.',
    timestamp: '20 mins ago',
  },
  {
    id: '4',
    patientName: 'Kavya Reddy',
    patientId: 'PT-10238',
    alertType: 'Heart Rate Abnormal',
    severity: 'warning',
    message: 'Heart rate above normal range. Continue monitoring.',
    timestamp: '35 mins ago',
    vitals: { heartRate: 92, oxygenLevel: 95, bloodPressure: '142/88' },
  },
  {
    id: '5',
    patientName: 'Priya Sharma',
    patientId: 'PT-10234',
    alertType: 'Lab Results Available',
    severity: 'normal',
    message: 'New lab results ready for review.',
    timestamp: '1 hour ago',
  },
  {
    id: '6',
    patientName: 'Vikram Singh',
    patientId: 'PT-10239',
    alertType: 'Vitals Check',
    severity: 'normal',
    message: 'Routine vitals check completed successfully.',
    timestamp: '1 hour ago',
  },
];

const monitoringPatients: MonitoringPatient[] = [
  {
    id: '1',
    name: 'Anika Patel',
    patientId: 'PT-10236',
    heartRate: 112,
    oxygenLevel: 89,
    bloodPressure: '160/105',
    status: 'critical',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    patientId: 'PT-10235',
    heartRate: 88,
    oxygenLevel: 94,
    bloodPressure: '138/92',
    status: 'warning',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    patientId: 'PT-10234',
    heartRate: 72,
    oxygenLevel: 98,
    bloodPressure: '120/80',
    status: 'stable',
  },
  {
    id: '4',
    name: 'Kavya Reddy',
    patientId: 'PT-10238',
    heartRate: 92,
    oxygenLevel: 95,
    bloodPressure: '142/88',
    status: 'warning',
  },
];

const severityConfig = {
  critical: {
    icon: AlertTriangle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    iconColor: 'text-red-600',
    badgeColor: 'bg-red-100 text-red-700',
    pulseColor: 'bg-red-500',
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    iconColor: 'text-amber-600',
    badgeColor: 'bg-amber-100 text-amber-700',
    pulseColor: 'bg-amber-500',
  },
  normal: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    iconColor: 'text-green-600',
    badgeColor: 'bg-green-100 text-green-700',
    pulseColor: 'bg-green-500',
  },
};

export function AlertsMonitoring() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'warning' | 'normal'>('all');
  const [alerts, setAlerts] = useState(mockAlerts);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update timestamps or add new alerts
      setAlerts(prev => prev.map(alert => ({ ...alert })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = selectedFilter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.severity === selectedFilter);

  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const warningCount = alerts.filter(a => a.severity === 'warning').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'text-red-600';
      case 'warning':
        return 'text-amber-600';
      default:
        return 'text-green-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Critical Alerts</p>
              <p className="text-3xl font-semibold text-red-600 mt-1">{criticalCount}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Warning Alerts</p>
              <p className="text-3xl font-semibold text-amber-600 mt-1">{warningCount}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Patients Monitored</p>
              <p className="text-3xl font-semibold text-slate-900 mt-1">{monitoringPatients.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Alerts List - Left Side */}
        <div className="lg:col-span-2 flex flex-col overflow-hidden">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Active Alerts</h2>
                  <p className="text-sm text-slate-500 mt-1">{filteredAlerts.length} active alerts</p>
                </div>
                <Bell className="w-6 h-6 text-slate-400" />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedFilter('critical')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === 'critical'
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Critical
                </button>
                <button
                  onClick={() => setSelectedFilter('warning')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === 'warning'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Warning
                </button>
                <button
                  onClick={() => setSelectedFilter('normal')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === 'normal'
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Normal
                </button>
              </div>
            </div>

            {/* Alerts List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredAlerts.map((alert) => {
                const config = severityConfig[alert.severity];
                const Icon = config.icon;

                return (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor} hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon with pulse animation for critical */}
                      <div className="relative flex-shrink-0">
                        <Icon className={`w-6 h-6 ${config.iconColor}`} />
                        {alert.severity === 'critical' && (
                          <span className="absolute inset-0 animate-ping">
                            <Icon className={`w-6 h-6 ${config.iconColor}`} />
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-slate-900">{alert.patientName}</h3>
                            <p className="text-sm text-slate-500">{alert.patientId}</p>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${config.badgeColor}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>

                        {/* Alert Type */}
                        <p className={`text-sm font-medium ${config.textColor} mb-1`}>
                          {alert.alertType}
                        </p>

                        {/* Message */}
                        <p className="text-sm text-slate-700 mb-3">{alert.message}</p>

                        {/* Vitals if available */}
                        {alert.vitals && (
                          <div className="flex items-center gap-4 mb-3 pb-3 border-b border-slate-200">
                            <div className="flex items-center gap-1.5">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-sm text-slate-700">{alert.vitals.heartRate} bpm</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Droplet className="w-4 h-4 text-cyan-500" />
                              <span className="text-sm text-slate-700">{alert.vitals.oxygenLevel}%</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Activity className="w-4 h-4 text-blue-500" />
                              <span className="text-sm text-slate-700">{alert.vitals.bloodPressure}</span>
                            </div>
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs">{alert.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="text-xs font-medium text-blue-600 hover:text-blue-700 px-3 py-1 hover:bg-blue-50 rounded transition-colors">
                              View Details
                            </button>
                            <button className="text-xs font-medium text-slate-600 hover:text-slate-700 px-3 py-1 hover:bg-slate-100 rounded transition-colors">
                              Acknowledge
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Real-Time Monitoring Panel - Right Side */}
        <div className="flex flex-col overflow-hidden">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Real-Time Monitoring</h2>
              <p className="text-sm text-slate-500 mt-1">Live vital signs tracking</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {monitoringPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`rounded-lg border p-4 ${getStatusBg(patient.status)}`}
                >
                  {/* Patient Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{patient.name}</h3>
                      <p className="text-xs text-slate-500">{patient.patientId}</p>
                    </div>
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full ${
                        patient.status === 'critical' ? 'bg-red-500' :
                        patient.status === 'warning' ? 'bg-amber-500' :
                        'bg-green-500'
                      }`} />
                      {patient.status === 'critical' && (
                        <span className="absolute inset-0 animate-ping">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Vitals */}
                  <div className="space-y-3">
                    {/* Heart Rate */}
                    <div className="bg-white bg-opacity-60 rounded p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Heart className={`w-4 h-4 ${getStatusColor(patient.status)}`} />
                          <span className="text-xs font-medium text-slate-700">Heart Rate</span>
                        </div>
                        <span className={`text-xs font-semibold ${getStatusColor(patient.status)}`}>
                          {patient.heartRate > 100 || patient.heartRate < 60 ? 'ABNORMAL' : 'NORMAL'}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold text-slate-900">{patient.heartRate}</span>
                        <span className="text-xs text-slate-500">bpm</span>
                      </div>
                    </div>

                    {/* Oxygen Level */}
                    <div className="bg-white bg-opacity-60 rounded p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Droplet className={`w-4 h-4 ${getStatusColor(patient.status)}`} />
                          <span className="text-xs font-medium text-slate-700">Oxygen Level</span>
                        </div>
                        <span className={`text-xs font-semibold ${getStatusColor(patient.status)}`}>
                          {patient.oxygenLevel < 95 ? 'LOW' : 'NORMAL'}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold text-slate-900">{patient.oxygenLevel}</span>
                        <span className="text-xs text-slate-500">%</span>
                      </div>
                    </div>

                    {/* Blood Pressure */}
                    <div className="bg-white bg-opacity-60 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="w-4 h-4 text-slate-600" />
                        <span className="text-xs font-medium text-slate-700">Blood Pressure</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold text-slate-900">{patient.bloodPressure}</span>
                        <span className="text-xs text-slate-500">mmHg</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-3 px-3 py-2 bg-white text-slate-700 rounded hover:bg-slate-50 transition-colors text-sm font-medium border border-slate-300">
                    View Full Chart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}