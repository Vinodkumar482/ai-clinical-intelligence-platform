import { 
  Users, 
  AlertTriangle, 
  Activity, 
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  ArrowRight
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { mockPatients } from '../data/patients';

// Calculate dashboard statistics
const totalPatients = mockPatients.length;
const criticalPatients = mockPatients.filter(p => p.status === 'critical').length;
const monitoringPatients = mockPatients.filter(p => p.status === 'monitoring').length;
const stablePatients = mockPatients.filter(p => p.status === 'stable').length;

// Risk distribution data for pie chart
const riskDistributionData = [
  { name: 'Low Risk', value: mockPatients.filter(p => p.riskLevel === 'low').length, color: '#10b981' },
  { name: 'Medium Risk', value: mockPatients.filter(p => p.riskLevel === 'medium').length, color: '#f59e0b' },
  { name: 'High Risk', value: mockPatients.filter(p => p.riskLevel === 'high').length, color: '#ef4444' },
];

// Recovery trends data for line chart (mock data showing trend over past week)
const recoveryTrendsData = [
  { day: 'Mon', stable: 45, monitoring: 12, critical: 3 },
  { day: 'Tue', stable: 48, monitoring: 10, critical: 2 },
  { day: 'Wed', stable: 52, monitoring: 8, critical: 2 },
  { day: 'Thu', stable: 55, monitoring: 7, critical: 1 },
  { day: 'Fri', stable: 58, monitoring: 5, critical: 1 },
  { day: 'Sat', stable: 60, monitoring: 4, critical: 1 },
  { day: 'Today', stable: stablePatients, monitoring: monitoringPatients, critical: criticalPatients },
];

// Recent alerts (mock data)
const recentAlerts = [
  {
    id: '1',
    patient: 'Anika Patel',
    patientId: 'PT-10236',
    message: 'Oxygen saturation dropped below 90%',
    severity: 'critical',
    time: '2 mins ago',
  },
  {
    id: '2',
    patient: 'Rajesh Kumar',
    patientId: 'PT-10235',
    message: 'Blood pressure elevated above normal range',
    severity: 'warning',
    time: '15 mins ago',
  },
  {
    id: '3',
    patient: 'Kavya Reddy',
    patientId: 'PT-10238',
    message: 'Heart rate above normal range',
    severity: 'warning',
    time: '35 mins ago',
  },
  {
    id: '4',
    patient: 'Arjun Mehta',
    patientId: 'PT-10237',
    message: 'Scheduled medication administration due',
    severity: 'normal',
    time: '1 hour ago',
  },
];

interface DashboardProps {
  onNavigateToAlerts: () => void;
  onNavigateToPatients: () => void;
}

export function Dashboard({ onNavigateToAlerts, onNavigateToPatients }: DashboardProps) {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      default:
        return 'bg-green-50 border-green-200 text-green-700';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Patients */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onNavigateToPatients}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-slate-500 mb-1">Total Patients</h3>
          <p className="text-3xl font-semibold text-slate-900">{totalPatients}</p>
          <p className="text-sm text-green-600 mt-2">+3 from yesterday</p>
        </div>

        {/* Critical Patients */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onNavigateToAlerts}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-slate-500 mb-1">Critical Patients</h3>
          <p className="text-3xl font-semibold text-slate-900">{criticalPatients}</p>
          <p className="text-sm text-green-600 mt-2">-2 from yesterday</p>
        </div>

        {/* Patients Under Monitoring */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onNavigateToPatients}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <Activity className="w-6 h-6 text-amber-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-slate-500 mb-1">Under Monitoring</h3>
          <p className="text-3xl font-semibold text-slate-900">{monitoringPatients}</p>
          <p className="text-sm text-green-600 mt-2">-3 from yesterday</p>
        </div>

        {/* Stable Patients */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onNavigateToPatients}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-slate-500 mb-1">Stable Patients</h3>
          <p className="text-3xl font-semibold text-slate-900">{stablePatients}</p>
          <p className="text-sm text-green-600 mt-2">+5 from yesterday</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Risk Distribution */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Patient Risk Distribution</h2>
              <p className="text-sm text-slate-500 mt-1">Current risk level breakdown</p>
            </div>
          </div>
          <div style={{ width: '100%', height: '256px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-slate-600">Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-slate-600">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-600">High Risk</span>
            </div>
          </div>
        </div>

        {/* Recovery Trends */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Weekly Recovery Trends</h2>
              <p className="text-sm text-slate-500 mt-1">Patient status over the past week</p>
            </div>
          </div>
          <div style={{ width: '100%', height: '256px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={recoveryTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="stable" stroke="#10b981" strokeWidth={2} name="Stable" />
                <Line type="monotone" dataKey="monitoring" stroke="#f59e0b" strokeWidth={2} name="Monitoring" />
                <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} name="Critical" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Alerts Section */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Recent Alerts</h2>
              <p className="text-sm text-slate-500 mt-1">Latest patient alerts and notifications</p>
            </div>
            <button 
              onClick={onNavigateToAlerts}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getSeverityIcon(alert.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="font-semibold text-slate-900">{alert.patient}</p>
                      <p className="text-sm text-slate-500">{alert.patientId}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getSeverityStyles(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">{alert.message}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Average Recovery Time</h3>
            <Activity className="w-5 h-5 opacity-75" />
          </div>
          <p className="text-3xl font-semibold">4.2 days</p>
          <p className="text-sm opacity-75 mt-1">12% faster than last month</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Successful Treatments</h3>
            <CheckCircle className="w-5 h-5 opacity-75" />
          </div>
          <p className="text-3xl font-semibold">96.5%</p>
          <p className="text-sm opacity-75 mt-1">+2.3% from last month</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Active Alerts</h3>
            <AlertTriangle className="w-5 h-5 opacity-75" />
          </div>
          <p className="text-3xl font-semibold">{recentAlerts.length}</p>
          <p className="text-sm opacity-75 mt-1">Requiring attention</p>
        </div>
      </div>
    </div>
  );
}