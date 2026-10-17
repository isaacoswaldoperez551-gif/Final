import React from 'react';
import { CheckCircle2, XCircle, Clock, FileText, ArrowUpRight, User, Calendar } from 'lucide-react';
import { DocItem, DocumentStatus } from '../types';

interface ApprovalsViewProps {
  documents: DocItem[];
  onUpdateStatus: (id: string, status: DocumentStatus) => void;
  onSelectDoc: (doc: DocItem) => void;
}

export const ApprovalsView: React.FC<ApprovalsViewProps> = ({
  documents,
  onUpdateStatus,
  onSelectDoc
}) => {
  const pendingDocs = documents.filter(d => d.status === 'review' || d.status === 'draft');

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full text-slate-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Flujo de Aprobaciones y Revisiones</h2>
          <p className="text-slate-400 text-sm mt-0.5">
            {pendingDocs.length} documentos pendientes de validación por parte del comité directivo
          </p>
        </div>
      </div>

      {pendingDocs.length === 0 ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-16 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">¡Todo al día!</h3>
          <p className="text-slate-400 text-sm">No hay documentos pendientes de revisión en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {pendingDocs.map(doc => (
            <div
              key={doc.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 
                      onClick={() => onSelectDoc(doc)}
                      className="font-bold text-white text-base hover:text-indigo-400 cursor-pointer truncate"
                    >
                      {doc.title}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {doc.status === 'review' ? 'En Revisión' : 'Borrador'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">{doc.description}</p>
                  
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-indigo-400" /> {doc.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {doc.updatedAt}
                    </span>
                    <span>Categoría: <strong className="text-slate-300">{doc.category}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
                <button
                  onClick={() => onSelectDoc(doc)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                >
                  Ver Detalles
                </button>
                <button
                  onClick={() => onUpdateStatus(doc.id, 'draft')}
                  className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Rechazar</span>
                </button>
                <button
                  onClick={() => onUpdateStatus(doc.id, 'approved')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Aprobar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
