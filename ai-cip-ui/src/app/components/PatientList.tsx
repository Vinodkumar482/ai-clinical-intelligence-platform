import { Patient } from '../data/patients';

interface PatientListProps {
  patients: Patient[];
  selectedPatientId: string | null;
  onPatientSelect: (patientId: string) => void;
}

const statusConfig = {
  stable: { label: 'Stable', className: 'bg-green-100 text-green-700 border-green-200' },
  monitoring: { label: 'Monitoring', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  critical: { label: 'Critical', className: 'bg-red-100 text-red-700 border-red-200' },
};

const riskConfig = {
  low: { label: 'Low Risk', className: 'bg-green-50 text-green-600' },
  medium: { label: 'Medium Risk', className: 'bg-amber-50 text-amber-600' },
  high: { label: 'High Risk', className: 'bg-red-50 text-red-600' },
};

export function PatientList({ patients, selectedPatientId, onPatientSelect }: PatientListProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="font-semibold text-slate-900">Patient List</h2>
        <p className="text-sm text-slate-500 mt-1">{patients.length} patients currently monitored</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Patient ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {patients.map((patient) => {
              const statusStyle = statusConfig[patient.status];
              const riskStyle = riskConfig[patient.riskLevel];
              const isSelected = selectedPatientId === patient.id;
              
              return (
                <tr
                  key={patient.id}
                  onClick={() => onPatientSelect(patient.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-slate-600">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{patient.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600">{patient.patientId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle.className}`}>
                      {statusStyle.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${riskStyle.className}`}>
                      {riskStyle.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {patient.lastUpdated}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
