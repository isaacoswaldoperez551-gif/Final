import React from 'react';
import { 
  FolderKanban, 
  FileText, 
  CheckSquare, 
  Activity, 
  Settings, 
  Folder, 
  ShieldCheck, 
  PlusCircle,
  HardDrive
} from 'lucide-react';
import { Folder as FolderType } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  folders: FolderType[];
  selectedFolderId: string | null;
  setSelectedFolderId: (id: string | null) => void;
  onOpenUpload: () => void;
  pendingCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  folders,
  selectedFolderId,
  setSelectedFolderId,
  onOpenUpload,
  pendingCount
}) => {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen select-none shrink-0 text-slate-300">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
          <FolderKanban className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-white text-lg tracking-tight">GestiónDoc</h1>
          <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Enterprise ECM
          </p>
        </div>
      </div>

      {/* Quick Upload Action */}
      <div className="p-4">
        <button
          onClick={onOpenUpload}
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium py-2.5 px-4 rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Nuevo Documento</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="px-4 space-y-1 py-2 flex-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menú Principal</p>
        
        <button
          onClick={() => { setActiveTab('dashboard'); setSelectedFolderId(null); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === 'dashboard' 
              ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30' 
              : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Panel General</span>
        </button>

        <button
          onClick={() => { setActiveTab('documents'); setSelectedFolderId(null); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === 'documents' && selectedFolderId === null
              ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30' 
              : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Todos los Documentos</span>
        </button>

        <button
          onClick={() => setActiveTab('approvals')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === 'approvals' 
              ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30' 
              : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <CheckSquare className="w-4 h-4" />
            <span>Aprobaciones</span>
          </div>
          {pendingCount > 0 && (
            <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === 'activity' 
              ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30' 
              : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Registro de Auditoría</span>
        </button>

        {/* Folders Section */}
        <div className="pt-6">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Carpetas Corporativas</p>
          <div className="space-y-1">
            {folders.map(folder => (
              <button
                key={folder.id}
                onClick={() => { setActiveTab('documents'); setSelectedFolderId(folder.id); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedFolderId === folder.id 
                    ? 'bg-slate-800 text-white font-medium' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${folder.color}`}></div>
                <span className="truncate flex-1 text-left">{folder.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer / Storage Widget */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
          <span className="flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-indigo-400" /> Almacenamiento</span>
          <span>38.4 GB / 100 GB</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full" style={{ width: '38%' }}></div>
        </div>
        <button
          onClick={() => setActiveTab('settings')}
          className="mt-3 w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Configuración & Supabase</span>
        </button>
      </div>
    </aside>
  );
};
