import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Folder, 
  Plus, 
  Star, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Download, 
  Eye, 
  MoreVertical,
  FileSpreadsheet,
  Trash2,
  Share2,
  Tag
} from 'lucide-react';
import { DocItem, Folder as FolderType, FileCategory, DocumentStatus } from '../types';

interface DocumentListProps {
  documents: DocItem[];
  folders: FolderType[];
  selectedFolderId: string | null;
  setSelectedFolderId: (id: string | null) => void;
  searchQuery: string;
  onSelectDoc: (doc: DocItem) => void;
  onOpenUpload: () => void;
  onDeleteDoc: (id: string) => void;
  onToggleStar: (id: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  folders,
  selectedFolderId,
  setSelectedFolderId,
  searchQuery,
  onSelectDoc,
  onOpenUpload,
  onDeleteDoc,
  onToggleStar
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedCategory, setSelectedCategory] = useState<FileCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<DocumentStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'title'>('date-desc');

  const categories: FileCategory[] = ['Financiero', 'Legal', 'Recursos Humanos', 'Proyectos', 'Operaciones', 'Marketing'];

  const currentFolder = folders.find(f => f.id === selectedFolderId);

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      // Folder filter
      if (selectedFolderId && doc.folderId !== selectedFolderId) return false;
      // Category filter
      if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;
      // Status filter
      if (selectedStatus !== 'all' && doc.status !== selectedStatus) return false;
      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesDesc = doc.description.toLowerCase().includes(q);
        const matchesAuthor = doc.author.toLowerCase().includes(q);
        const matchesTags = doc.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesAuthor && !matchesTags) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (sortBy === 'date-asc') return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      return a.title.localeCompare(b.title);
    });
  }, [documents, selectedFolderId, selectedCategory, selectedStatus, searchQuery, sortBy]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-rose-400" />;
      case 'xlsx': return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      case 'docx': return <FileText className="w-5 h-5 text-blue-400" />;
      default: return <FileText className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'approved':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1 w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Aprobado</span>;
      case 'review':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25 flex items-center gap-1 w-fit"><Clock className="w-3.5 h-3.5" /> Revisión</span>;
      case 'draft':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-700 flex items-center gap-1 w-fit">Borrador</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 w-fit">Archivado</span>;
    }
  };

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full text-slate-200">
      {/* Breadcrumb / Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <span>Repositorio</span>
            {currentFolder && (
              <>
                <span>/</span>
                <span className="text-indigo-400">{currentFolder.name}</span>
              </>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white">
            {currentFolder ? currentFolder.name : 'Todos los Documentos'}
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Mostrando {filteredDocuments.length} documentos corporativos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenUpload}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Subir Documento</span>
          </button>
        </div>
      </div>

      {/* Filters & Controls bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row justify-between items-center gap-4">
        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Todas las categorías
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filter & View Mode */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Todos los estados</option>
            <option value="approved">Aprobados</option>
            <option value="review">En Revisión</option>
            <option value="draft">Borrador</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-indigo-500"
          >
            <option value="date-desc">Más recientes</option>
            <option value="date-asc">Más antiguos</option>
            <option value="title">Título (A-Z)</option>
          </select>

          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Folder quick tabs if no folder selected */}
      {!selectedFolderId && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {folders.map(f => (
            <div
              key={f.id}
              onClick={() => setSelectedFolderId(f.id)}
              className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 rounded-xl p-3 cursor-pointer flex items-center gap-3 transition-all"
            >
              <div className={`w-3 h-3 rounded-full ${f.color}`}></div>
              <span className="text-xs font-semibold text-slate-300 truncate">{f.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Document Listing */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No se encontraron documentos</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Prueba ajustando los filtros de búsqueda o sube un nuevo archivo al repositorio.
          </p>
          <button
            onClick={onOpenUpload}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-semibold mt-2 inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Subir archivo
          </button>
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Documento</th>
                  <th className="py-4 px-4">Categoría</th>
                  <th className="py-4 px-4">Estado</th>
                  <th className="py-4 px-4">Autor / Fecha</th>
                  <th className="py-4 px-4">Tamaño</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                {filteredDocuments.map(doc => (
                  <tr 
                    key={doc.id}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => onSelectDoc(doc)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center shrink-0">
                          {getFileIcon(doc.fileType)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors truncate">
                              {doc.title}
                            </span>
                            {doc.isConfidential && (
                              <span className="bg-purple-500/20 text-purple-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-purple-500/30">
                                Confidencial
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5 max-w-md">{doc.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-xs font-medium bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
                        {doc.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      {getStatusBadge(doc.status)}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <p className="text-xs font-medium text-slate-200">{doc.author}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{doc.updatedAt}</p>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-400">
                      {doc.fileSize}
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onToggleStar(doc.id)}
                          className={`p-2 rounded-lg transition-colors ${doc.isStarred ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                          title={doc.isStarred ? 'Destacado' : 'Destacar'}
                        >
                          <Star className="w-4 h-4" fill={doc.isStarred ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={() => onSelectDoc(doc)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteDoc(doc.id)}
                          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Eliminar documento"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map(doc => (
            <div
              key={doc.id}
              onClick={() => onSelectDoc(doc)}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 cursor-pointer transition-all shadow-xl flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full pointer-events-none"></div>
              
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center">
                    {getFileIcon(doc.fileType)}
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.isConfidential && (
                      <span className="bg-purple-500/20 text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-500/30">
                        Confidencial
                      </span>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleStar(doc.id); }}
                      className={`p-1.5 rounded-lg ${doc.isStarred ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      <Star className="w-4 h-4" fill={doc.isStarred ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {doc.title}
                </h3>
                <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                  {doc.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {doc.tags.map(t => (
                    <span key={t} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-slate-300">{doc.author}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">{doc.updatedAt}</p>
                </div>
                <div>
                  {getStatusBadge(doc.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
