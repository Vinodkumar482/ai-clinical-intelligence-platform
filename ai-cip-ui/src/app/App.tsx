import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PatientList } from './components/PatientList';
import { PatientDetailsPanel } from './components/PatientDetailsPanel';
import { MedicalReportUpload } from './components/MedicalReportUpload';
import { ClinicalSummary } from './components/ClinicalSummary';
import { AlertsMonitoring } from './components/AlertsMonitoring';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { mockPatients, Patient } from './data/patients';
import { Bell, Search, LogOut, User } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [viewingClinicalSummary, setViewingClinicalSummary] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const selectedPatient = mockPatients.find(p => p.id === selectedPatientId) || null;

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveNav('dashboard');
    setSelectedPatientId(null);
    setViewingClinicalSummary(false);
    setShowUserMenu(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
    setViewingClinicalSummary(true);
  };

  const handleBackToList = () => {
    setViewingClinicalSummary(false);
  };

  const handleNavigateToAlerts = () => {
    setActiveNav('alerts');
  };

  const handleNavigateToPatients = () => {
    setActiveNav('patients');
  };

  // Render different views based on active navigation
  const renderContent = () => {
    if (activeNav === 'dashboard') {
      return (
        <div className="flex-1 p-6 overflow-y-auto">
          <Dashboard 
            onNavigateToAlerts={handleNavigateToAlerts}
            onNavigateToPatients={handleNavigateToPatients}
          />
        </div>
      );
    }

    if (activeNav === 'alerts') {
      return (
        <div className="flex-1 p-6 overflow-hidden">
          <AlertsMonitoring />
        </div>
      );
    }

    if (activeNav === 'reports') {
      return (
        <div className="flex-1 p-6 overflow-y-auto">
          <MedicalReportUpload />
        </div>
      );
    }

    if (activeNav === 'settings') {
      return (
        <div className="flex-1 p-6 overflow-y-auto">
          <Settings />
        </div>
      );
    }

    if (activeNav === 'patients' && viewingClinicalSummary && selectedPatient) {
      return (
        <div className="flex-1 p-6 overflow-y-auto">
          <ClinicalSummary patient={selectedPatient} onBack={handleBackToList} />
        </div>
      );
    }

    return (
      <div className="flex-1 flex overflow-hidden">
        {/* Patient List */}
        <div className="flex-1 p-6 overflow-y-auto">
          <PatientList 
            patients={mockPatients}
            selectedPatientId={selectedPatientId}
            onPatientSelect={handlePatientSelect}
          />
        </div>

        {/* Patient Details Panel */}
        <PatientDetailsPanel patient={selectedPatient} />
      </div>
    );
  };

  const getHeaderTitle = () => {
    if (activeNav === 'dashboard') return 'Clinical Overview';
    if (activeNav === 'alerts') return 'Alerts & Monitoring';
    if (activeNav === 'reports') return 'Medical Reports';
    if (activeNav === 'settings') return 'Settings';
    if (viewingClinicalSummary) return 'Clinical Summary';
    return 'Patient Dashboard';
  };

  const getHeaderSubtitle = () => {
    if (activeNav === 'dashboard') return 'Hospital-wide clinical intelligence and performance metrics';
    if (activeNav === 'alerts') return 'Real-time patient alerts and vital signs monitoring';
    if (activeNav === 'reports') return 'Upload and manage patient medical documentation';
    if (activeNav === 'settings') return 'Configure system preferences and user settings';
    if (viewingClinicalSummary) return 'Comprehensive AI-powered clinical analysis';
    return 'Real-time patient monitoring and clinical intelligence';
  };

  return (
    <div className="h-screen w-full flex bg-slate-100">
      {/* Sidebar */}
      <Sidebar 
        activeItem={activeNav} 
        onItemClick={setActiveNav}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                {getHeaderTitle()}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {getHeaderSubtitle()}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              {/* Alerts */}
              <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Bell className="w-6 h-6 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{currentUser}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-200">
                      <p className="text-sm font-medium text-slate-900">{currentUser}</p>
                      <p className="text-xs text-slate-500">Healthcare Provider</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        {renderContent()}
      </div>
    </div>
  );
}