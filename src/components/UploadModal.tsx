import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Shield } from 'lucide-react';
import { DocItem, FileCategory, Folder as FolderType } from '../types';

interface UploadModalProps {
  folders: FolderType[];
  onClose: () => void;
  onAddDocument: (doc: DocItem) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  folders,
  onClose,
  onAddDocument
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FileCategory>('Financiero');
  const [folderId, setFolderId] = useState(folders[0]?.id || 'f-1');
  const [fileType, setFileType] = useState<'pdf' | 'docx' | 'xlsx' | 'pptx'>('pdf');
  const [tagsInput, setTagsInput] = useState('Corporativo, 2026');
  const [isConfidential, setIsConfidential] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const categories: FileCategory[] = ['Financiero', 'Legal', 'Recursos Humanos', 'Proyectos', 'Operaciones', 'Marketing'];

  const handleFileDropSimulation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
      if (file.name.endsWith('.xlsx')) setFileType('xlsx');
      else if (file.name.endsWith('.docx')) setFileType('docx');
      else if (file.name.endsWith('.pptx')) setFileType('pptx');
      else setFileType('pdf');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const newDoc: DocItem = {
      id: `doc-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Documento corporativo subido al sistema de gestión.',
      category,
      folderId,
      fileType,
      fileSize: fileName ? '3.4 MB' : '2.1 MB',
      status: 'review',
      tags: tags.length ? tags : ['General'],
      author: 'Isaac Pérez (Admin)',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      isStarred: false,
      isConfidential,
      versions: [
        { version: 'v1.0', updatedAt: new Date().toISOString().split('T')[0], updatedBy: 'Isaac Pérez', size: '2.1 MB', changesSummary: 'Carga inicial del documento' }
      ],
      comments: []
    };

    onAddDocument(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 select-none animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div>
            <h2 className="text-xl font-bold text-white">Subir Nuevo Documento</h2>
            <p className="text-xs text-slate-400 mt-0.5">Añade ficheros corporativos al repositorio seguro</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-slate-200">
          {/* Drag & Drop File Box */}
          <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-6 text-center bg-slate-950/40 relative cursor-pointer transition-colors group">
            <input
              type="file"
              onChange={handleFileDropSimulation}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {fileName ? <span className="text-emerald-400">Archivo seleccionado: {fileName}</span> : 'Arrastra tu archivo aquí o haz clic para explorar'}
                </p>
                <p className="text-xs text-slate-400 mt-1">Soporta PDF, DOCX, XLSX, PPTX (máx. 50 MB)</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Título del Documento *</label>
              <input
                type="text"
                required
                placeholder="Ej. Informe de Auditoría Q1 2026.pdf"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Descripción / Resumen</label>
              <textarea
                rows={2}
                placeholder="Breve descripción del contenido y propósito del archivo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Categoría</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FileCategory)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Carpeta de Destino</label>
                <select
                  value={folderId}
                  onChange={(e) => setFolderId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                >
                  {folders.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Etiquetas (separadas por comas)</label>
              <input
                type="text"
                placeholder="Ej. Legal, Q1, Contrato, Importante"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="confidentialCheck"
                checked={isConfidential}
                onChange={(e) => setIsConfidential(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="confidentialCheck" className="text-xs font-medium text-slate-300 flex items-center gap-1.5 cursor-pointer">
                <Shield className="w-3.5 h-3.5 text-purple-400" /> Marcar como Documento Confidencial (Requiere permisos especiales)
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
            >
              Subir al Repositorio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
