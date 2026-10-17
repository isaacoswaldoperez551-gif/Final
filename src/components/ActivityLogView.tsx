import React from 'react';
import { Activity, ShieldCheck, Clock, User } from 'lucide-react';
import { ActivityLog } from '../types';

interface ActivityLogViewProps {
  activityLogs: ActivityLog[];
}

export const ActivityLogView: React.FC<ActivityLogViewProps> = ({ activityLogs }) => {
  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full text-slate-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Auditoría de Seguridad & Cumplimiento
          </div>
          <h2 className="text-2xl font-bold text-white">Registro de Actividad</h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Trazabilidad completa de operaciones sobre documentos y carpetas en el sistema
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="space-y-4">
          {activityLogs.map((log) => (
            <div 
              key={log.id} 
              className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                  {log.user.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    <span className="text-indigo-300">{log.user}</span> {log.action === 'uploaded' ? 'subió el documento' : log.action === 'approved' ? 'aprobó' : log.action === 'commented' ? 'comentó en' : 'actualizó'} <strong className="text-white">"{log.documentTitle}"</strong>
                  </p>
                  {log.details && (
                    <p className="text-xs text-slate-400 mt-0.5">{log.details}</p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400 flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> {log.timestamp}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 mt-1 inline-block uppercase">
                  {log.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
