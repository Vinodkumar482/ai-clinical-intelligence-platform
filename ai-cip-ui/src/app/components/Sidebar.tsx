import { LayoutDashboard, Users, AlertTriangle, FileText, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeItem, onItemClick, isCollapsed, onToggleCollapse }: SidebarProps) {
  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 relative`}>
      {/* Collapse Toggle Button */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-6 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors z-10 shadow-sm"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-slate-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        )}
      </button>

      <div className={`p-6 border-b border-slate-200 ${isCollapsed ? 'px-4' : ''}`}>
        {isCollapsed ? (
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-lg">CI</span>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-slate-900">Clinical Intelligence</h1>
            <p className="text-sm text-slate-500 mt-1">Healthcare Dashboard</p>
          </>
        )}
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick(item.id)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className={`p-4 border-t border-slate-200 ${isCollapsed ? 'px-2' : ''}`}>
        {isCollapsed ? (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
            <span className="text-blue-600 font-semibold text-sm">DR</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold">DR</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">Dr. Ananya Kapoor</p>
              <p className="text-xs text-slate-500 truncate">Cardiologist</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}