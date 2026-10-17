import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Download, 
  Share2, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  History, 
  Info, 
  Tag, 
  User, 
  Calendar, 
  HardDrive, 
  Lock, 
  Send,
  FileSpreadsheet
} from 'lucide-react';
import { DocItem, DocumentComment, DocumentStatus } from '../types';

interface DocumentModalProps {
  doc: DocItem;
  onClose: () => void;
  onUpdateStatus: (docId: string, status: DocumentStatus) => void;
  onAddComment: (docId: string, text: string) => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  doc,
  onClose,
  onUpdateStatus,
  onAddComment
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'versions' | 'comments'>('preview');
  const [newCommentText, setNewCommentText] = useState('');
  const [shareCopied, setShareCopied] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    onAddComment(doc.id, newCommentText.trim());
    setNewCommentText('');
  };

  const handleCopyShareLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-8 h-8 text-rose-400" />;
      case 'xlsx': return <FileSpreadsheet className="w-8 h-8 text-emerald-400" />;
      default: return <FileText className="w-8 h-8 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 select-none animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              {getFileIcon(doc.fileType)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-white truncate">{doc.title}</h2>
                {doc.isConfidential && (
                  <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-purple-500/30">
                    Confidencial
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Categoría: <span className="text-indigo-400 font-medium">{doc.category}</span> • Tamaño: {doc.fileSize}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyShareLink}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span>{shareCopied ? '¡Enlace copiado!' : 'Compartir'}</span>
            </button>
            <button
              onClick={() => alert(`Descargando ${doc.title}...`)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Descargar</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-800 flex gap-6 bg-slate-900/60 text-sm">
          <button
            onClick={() => setActiveTab('preview')}
            className={`py-3.5 font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'preview' 
                ? 'border-indigo-500 text-indigo-400' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Vista Previa & Metadatos</span>
          </button>
          <button
            onClick={() => setActiveTab('versions')}
            className={`py-3.5 font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'versions' 
                ? 'border-indigo-500 text-indigo-400' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Control de Versiones ({doc.versions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`py-3.5 font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'comments' 
                ? 'border-indigo-500 text-indigo-400' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Comentarios & Discusión ({doc.comments.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-200">
          {activeTab === 'preview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Document Overview */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Descripción del Documento</h4>
                  <p className="text-slate-200 text-sm leading-relaxed">{doc.description}</p>
                </div>

                {/* Simulated File Preview Screen */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center space-y-4 flex flex-col items-center justify-center min-h-[220px]">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Vista Previa Interactiva de Documento</h5>
                    <p className="text-xs text-slate-400 mt-1">El archivo está listo para visualización y descarga segura en formato {doc.fileType.toUpperCase()}</p>
                  </div>
                  <button
                    onClick={() => alert(`Abriendo visor completo para ${doc.title}`)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors border border-slate-700"
                  >
                    Abrir Visor Pantalla Completa
                  </button>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Etiquetas Asignadas</h4>
                  <div className="flex flex-wrap gap-2">
                    {doc.tags.map(t => (
                      <span key={t} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-xl text-xs font-medium border border-slate-700 flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-indigo-400" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Metadata Card */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-5 h-fit">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Metadatos del Sistema</h4>
                
                <div className="space-y-4 text-xs">
                  <div>
                    <p className="text-slate-400 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-400" /> Autor / Propietario
                    </p>
                    <p className="font-semibold text-white text-sm">{doc.author}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Fecha de Creación
                    </p>
                    <p className="font-semibold text-white">{doc.createdAt}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" /> Última Modificación
                    </p>
                    <p className="font-semibold text-white">{doc.updatedAt}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 mb-1 flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-indigo-400" /> Peso del Archivo
                    </p>
                    <p className="font-semibold text-white">{doc.fileSize}</p>
                  </div>
                </div>

                {/* Status Updater */}
                <div className="pt-4 border-t border-slate-800">
                  <label className="text-xs font-semibold text-slate-400 block mb-2">Estado del Documento</label>
                  <select
                    value={doc.status}
                    onChange={(e) => onUpdateStatus(doc.id, e.target.value as DocumentStatus)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-500"
                  >
                    <option value="draft">Borrador</option>
                    <option value="review">En Revisión</option>
                    <option value="approved">Aprobado</option>
                    <option value="archived">Archivado</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'versions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-white">Historial de Revisiones</h4>
                <button
                  onClick={() => alert('Simulando carga de nueva versión del documento')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                >
                  Subir Nueva Versión
                </button>
              </div>

              <div className="space-y-3">
                {doc.versions.map((v, idx) => (
                  <div key={idx} className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                        {v.version}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{v.changesSummary}</p>
                        <p className="text-xs text-slate-400 mt-0.5">Modificado por {v.updatedBy} el {v.updatedAt} • {v.size || doc.fileSize}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Restaurando versión ${v.version}`)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      Restaurar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-6">
              <div className="space-y-3">
                {doc.comments.length === 0 ? (
                  <p className="text-slate-400 text-xs italic text-center py-6">No hay comentarios aún. Inicia la discusión a continuación.</p>
                ) : (
                  doc.comments.map(c => (
                    <div key={c.id} className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-indigo-300">{c.author}</span>
                        <span className="text-[11px] text-slate-400">{c.createdAt}</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{c.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add comment form */}
              <form onSubmit={handleCommentSubmit} className="flex gap-3 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="Escribe un comentario o anotación..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
