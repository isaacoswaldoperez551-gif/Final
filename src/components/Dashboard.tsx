import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  ArrowUpRight, 
  Folder, 
  ShieldCheck,
  HardDrive,
  Download,
  Eye,
  FileSpreadsheet,
  FileCheck
} from 'lucide-react';
import { DocItem, Folder as FolderType, ActivityLog } from '../types';

interface DashboardProps {
  documents: DocItem[];
  folders: FolderType[];
  activityLogs: ActivityLog[];
  onSelectDoc: (doc: DocItem) => void;
  setActiveTab: (tab: string) => void;
  setSelectedFolderId: (id: string | null) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  documents,
  folders,
  activityLogs,
  onSelectDoc,
  setActiveTab,
  setSelectedFolderId
}) => {
  const totalDocs = documents.length;
  const approvedDocs = documents.filter(d => d.status === 'approved').length;
  const pendingDocs = documents.filter(d => d.status === 'review').length;
  const confidentialDocs = documents.filter(d => d.isConfidential).length;

  const recentDocs = [...documents].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-rose-400" />;
      case 'xlsx': return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      case 'docx': return <FileText className="w-5 h-5 text-blue-400" />;
      default: return <FileText className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Aprobado</span>;
      case 'review':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1 w-fit"><Clock className="w-3.5 h-3.5" /> En Revisión</span>;
      case 'draft':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-700 flex items-center gap-1 w-fit">Borrador</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 w-fit">Archivado</span>;
    }
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full text-slate-200">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900/50 via-slate-900 to-purple-900/40 border border-indigo-500/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Sistema de Gestión Documental Corporativo
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Bienvenido a GestiónDoc</h2>
          <p className="text-slate-400 mt-1.5 max-w-xl text-sm leading-relaxed">
            Administre contratos, informes financieros, normativas de seguridad y proyectos estratégicos con control de versiones y auditoría en tiempo real.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('documents')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            <span>Ver Documentos</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Total Documentos</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{totalDocs}</h3>
            <p className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% este mes
            </p>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Aprobados</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{approvedDocs}</h3>
            <p className="text-xs text-slate-400 mt-1">Listos para auditoría</p>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Pendientes Revisión</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{pendingDocs}</h3>
            <p className="text-xs text-amber-400 font-medium mt-1">Requiere atención</p>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Confidenciales</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{confidentialDocs}</h3>
            <p className="text-xs text-purple-400 font-medium mt-1">Acceso restringido</p>
          </div>
        </div>
      </div>

      {/* Folders Grid Quick Access */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Carpetas Principales</h3>
          <button 
            onClick={() => setActiveTab('documents')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Ver todas
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {folders.map(folder => {
            const count = documents.filter(d => d.folderId === folder.id).length;
            return (
              <div
                key={folder.id}
                onClick={() => { setSelectedFolderId(folder.id); setActiveTab('documents'); }}
                className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 cursor-pointer transition-all group shadow-md"
              >
                <div className={`w-9 h-9 rounded-xl ${folder.color} flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-105 transition-transform`}>
                  <Folder className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-white text-sm truncate">{folder.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{count} documentos</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Files and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Files Table */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Documentos Recientes</h3>
            <button
              onClick={() => setActiveTab('documents')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Explorar repositorio
            </button>
          </div>

          <div className="space-y-3">
            {recentDocs.map(doc => (
              <div
                key={doc.id}
                onClick={() => onSelectDoc(doc)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    {getFileIcon(doc.fileType)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {doc.author} • {doc.category} • {doc.fileSize}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {getStatusBadge(doc.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Stream */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6">Actividad Reciente</h3>
          <div className="space-y-4">
            {activityLogs.slice(0, 5).map(log => (
              <div key={log.id} className="flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5 text-xs font-bold">
                  {log.user.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white leading-snug">
                    <span className="font-semibold">{log.user}</span> {log.action === 'uploaded' ? 'subió' : log.action === 'approved' ? 'aprobó' : log.action === 'commented' ? 'comentó en' : 'actualizó'} <span className="text-indigo-300 font-medium truncate block">{log.documentTitle}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
