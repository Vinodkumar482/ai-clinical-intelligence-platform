import { useState } from 'react';
import { 
  User, 
  Bell, 
  Activity, 
  Database, 
  Settings as SettingsIcon,
  Save,
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  Globe,
  Palette,
  Key,
  Wifi,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export function Settings() {
  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Dr. Ananya Kapoor',
    email: 'ananya.kapoor@hospital.com',
    phone: '+91 98765 43210',
    role: 'Cardiologist',
    department: 'Cardiology',
    location: 'Mumbai, Maharashtra',
  });

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    warningAlerts: true,
    normalAlerts: false,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    dailyReport: true,
    weeklyReport: false,
  });

  // Alert Threshold Configuration State
  const [thresholds, setThresholds] = useState({
    heartRateMin: 60,
    heartRateMax: 100,
    oxygenLevelMin: 95,
    bloodPressureSystolicMax: 140,
    bloodPressureDiastolicMax: 90,
    temperatureMax: 37.8,
  });

  // Data Integration Settings State
  const [integrations, setIntegrations] = useState({
    ehrIntegration: true,
    labSystemIntegration: true,
    pharmacyIntegration: false,
    imagingIntegration: true,
  });

  // System Preferences State
  const [systemPrefs, setSystemPrefs] = useState({
    language: 'English',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    theme: 'light',
    autoRefresh: true,
    refreshInterval: 30,
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSave = () => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Manage your account and system preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saveStatus === 'saving' ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : saveStatus === 'saved' ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile & Notifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Profile Section */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">User Profile</h2>
                  <p className="text-sm text-slate-500">Your personal information and credentials</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={userProfile.role}
                    onChange={(e) => setUserProfile({ ...userProfile, role: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Department
                  </label>
                  <select
                    value={userProfile.department}
                    onChange={(e) => setUserProfile({ ...userProfile, department: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Pediatrics</option>
                    <option>Emergency Medicine</option>
                    <option>Internal Medicine</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={userProfile.location}
                    onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  <Key className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Notification Preferences</h2>
                  <p className="text-sm text-slate-500">Choose how you want to be notified</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Alert Types</h3>
                <div className="space-y-3">
                  <ToggleRow
                    label="Critical Alerts"
                    description="Immediate notifications for critical patient conditions"
                    checked={notifications.criticalAlerts}
                    onChange={(checked) => setNotifications({ ...notifications, criticalAlerts: checked })}
                    icon={<AlertTriangle className="w-4 h-4 text-red-600" />}
                  />
                  <ToggleRow
                    label="Warning Alerts"
                    description="Notifications for patients requiring monitoring"
                    checked={notifications.warningAlerts}
                    onChange={(checked) => setNotifications({ ...notifications, warningAlerts: checked })}
                    icon={<AlertTriangle className="w-4 h-4 text-amber-600" />}
                  />
                  <ToggleRow
                    label="Normal Alerts"
                    description="General notifications and routine updates"
                    checked={notifications.normalAlerts}
                    onChange={(checked) => setNotifications({ ...notifications, normalAlerts: checked })}
                    icon={<Bell className="w-4 h-4 text-slate-600" />}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Notification Channels</h3>
                <div className="space-y-3">
                  <ToggleRow
                    label="Email Notifications"
                    checked={notifications.emailNotifications}
                    onChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                    icon={<Mail className="w-4 h-4 text-slate-600" />}
                  />
                  <ToggleRow
                    label="SMS Notifications"
                    checked={notifications.smsNotifications}
                    onChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                    icon={<Phone className="w-4 h-4 text-slate-600" />}
                  />
                  <ToggleRow
                    label="Push Notifications"
                    checked={notifications.pushNotifications}
                    onChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                    icon={<Bell className="w-4 h-4 text-slate-600" />}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Reports</h3>
                <div className="space-y-3">
                  <ToggleRow
                    label="Daily Report"
                    description="Receive daily patient summary at 9:00 AM"
                    checked={notifications.dailyReport}
                    onChange={(checked) => setNotifications({ ...notifications, dailyReport: checked })}
                  />
                  <ToggleRow
                    label="Weekly Report"
                    description="Receive weekly analytics every Monday"
                    checked={notifications.weeklyReport}
                    onChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Alert Threshold Configuration */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Alert Threshold Configuration</h2>
                  <p className="text-sm text-slate-500">Set vital signs thresholds for automated alerts</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Heart Rate Min (bpm)
                  </label>
                  <input
                    type="number"
                    value={thresholds.heartRateMin}
                    onChange={(e) => setThresholds({ ...thresholds, heartRateMin: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Heart Rate Max (bpm)
                  </label>
                  <input
                    type="number"
                    value={thresholds.heartRateMax}
                    onChange={(e) => setThresholds({ ...thresholds, heartRateMax: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Oxygen Level Min (%)
                  </label>
                  <input
                    type="number"
                    value={thresholds.oxygenLevelMin}
                    onChange={(e) => setThresholds({ ...thresholds, oxygenLevelMin: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Temperature Max (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={thresholds.temperatureMax}
                    onChange={(e) => setThresholds({ ...thresholds, temperatureMax: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Blood Pressure Systolic Max (mmHg)
                  </label>
                  <input
                    type="number"
                    value={thresholds.bloodPressureSystolicMax}
                    onChange={(e) => setThresholds({ ...thresholds, bloodPressureSystolicMax: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Blood Pressure Diastolic Max (mmHg)
                  </label>
                  <input
                    type="number"
                    value={thresholds.bloodPressureDiastolicMax}
                    onChange={(e) => setThresholds({ ...thresholds, bloodPressureDiastolicMax: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    Changes to alert thresholds will affect automated alert generation. Please ensure values are clinically appropriate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Integrations & System */}
        <div className="space-y-6">
          {/* Data Integration Settings */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Database className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Data Integration</h2>
                  <p className="text-sm text-slate-500">External system connections</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <ToggleRow
                label="EHR Integration"
                description="Electronic Health Records"
                checked={integrations.ehrIntegration}
                onChange={(checked) => setIntegrations({ ...integrations, ehrIntegration: checked })}
                icon={<Wifi className="w-4 h-4 text-green-600" />}
              />
              <ToggleRow
                label="Lab System"
                description="Laboratory information system"
                checked={integrations.labSystemIntegration}
                onChange={(checked) => setIntegrations({ ...integrations, labSystemIntegration: checked })}
                icon={<Wifi className="w-4 h-4 text-green-600" />}
              />
              <ToggleRow
                label="Pharmacy System"
                description="Medication management"
                checked={integrations.pharmacyIntegration}
                onChange={(checked) => setIntegrations({ ...integrations, pharmacyIntegration: checked })}
                icon={<Wifi className="w-4 h-4 text-slate-400" />}
              />
              <ToggleRow
                label="Imaging System"
                description="Radiology and imaging"
                checked={integrations.imagingIntegration}
                onChange={(checked) => setIntegrations({ ...integrations, imagingIntegration: checked })}
                icon={<Wifi className="w-4 h-4 text-green-600" />}
              />

              <div className="pt-4 border-t border-slate-200">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                  <Key className="w-4 h-4" />
                  Manage API Keys
                </button>
              </div>
            </div>
          </div>

          {/* System Preferences */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <SettingsIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">System Preferences</h2>
                  <p className="text-sm text-slate-500">Display and regional settings</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Language
                </label>
                <select
                  value={systemPrefs.language}
                  onChange={(e) => setSystemPrefs({ ...systemPrefs, language: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Timezone
                </label>
                <select
                  value={systemPrefs.timezone}
                  onChange={(e) => setSystemPrefs({ ...systemPrefs, timezone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">America/New York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date Format
                </label>
                <select
                  value={systemPrefs.dateFormat}
                  onChange={(e) => setSystemPrefs({ ...systemPrefs, dateFormat: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Theme
                </label>
                <select
                  value={systemPrefs.theme}
                  onChange={(e) => setSystemPrefs({ ...systemPrefs, theme: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <ToggleRow
                  label="Auto Refresh"
                  description="Automatically refresh data"
                  checked={systemPrefs.autoRefresh}
                  onChange={(checked) => setSystemPrefs({ ...systemPrefs, autoRefresh: checked })}
                />
              </div>

              {systemPrefs.autoRefresh && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Refresh Interval (seconds)
                  </label>
                  <input
                    type="number"
                    value={systemPrefs.refreshInterval}
                    onChange={(e) => setSystemPrefs({ ...systemPrefs, refreshInterval: parseInt(e.target.value) })}
                    min="10"
                    max="300"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Security</h2>
                  <p className="text-sm text-slate-500">Account protection settings</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                <span className="font-medium">Two-Factor Authentication</span>
                <span className="text-xs text-green-600 font-medium">Enabled</span>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                <span className="font-medium">Session Management</span>
                <span className="text-xs text-slate-500">2 active sessions</span>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                <span className="font-medium">Login History</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Toggle Row Component
interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ReactNode;
}

function ToggleRow({ label, description, checked, onChange, icon }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-start gap-3 flex-1">
        {icon && <div className="mt-0.5">{icon}</div>}
        <div>
          <p className="text-sm font-medium text-slate-900">{label}</p>
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-slate-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
