/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { DocumentList } from './components/DocumentList';
import { DocumentModal } from './components/DocumentModal';
import { UploadModal } from './components/UploadModal';
import { ApprovalsView } from './components/ApprovalsView';
import { ActivityLogView } from './components/ActivityLogView';
import { SettingsView } from './components/SettingsView';
import { initialDocuments, initialFolders, initialActivityLogs } from './mockData';
import { DocItem, DocumentStatus, ActivityLog } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [documents, setDocuments] = useState<DocItem[]>(initialDocuments);
  const [folders] = useState(initialFolders);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialActivityLogs);

  // Supabase state
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');

  const pendingCount = documents.filter(d => d.status === 'review' || d.status === 'draft').length;

  const handleAddDocument = (newDoc: DocItem) => {
    setDocuments(prev => [newDoc, ...prev]);
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      action: 'uploaded',
      documentTitle: newDoc.title,
      user: 'Isaac Pérez',
      timestamp: 'Justo ahora',
      details: `Categoría: ${newDoc.category}`
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const handleUpdateStatus = (docId: string, status: DocumentStatus) => {
    setDocuments(prev => prev.map(d => {
      if (d.id === docId) {
        return { ...d, status, updatedAt: new Date().toISOString().split('T')[0] };
      }
      return d;
    }));

    if (selectedDoc && selectedDoc.id === docId) {
      setSelectedDoc(prev => prev ? { ...prev, status, updatedAt: new Date().toISOString().split('T')[0] } : null);
    }

    const doc = documents.find(d => d.id === docId);
    if (doc) {
      const newLog: ActivityLog = {
        id: `act-${Date.now()}`,
        action: status === 'approved' ? 'approved' : 'updated',
        documentTitle: doc.title,
        user: 'Isaac Pérez',
        timestamp: 'Justo ahora',
        details: `Estado cambiado a ${status}`
      };
      setActivityLogs(prev => [newLog, ...prev]);
    }
  };

  const handleDeleteDoc = (id: string) => {
    const doc = documents.find(d => d.id === id);
    if (confirm(`¿Estás seguro de eliminar el documento "${doc?.title || id}"?`)) {
      setDocuments(prev => prev.filter(d => d.id !== id));
      if (selectedDoc && selectedDoc.id === id) {
        setSelectedDoc(null);
      }
      if (doc) {
        const newLog: ActivityLog = {
          id: `act-${Date.now()}`,
          action: 'deleted',
          documentTitle: doc.title,
          user: 'Isaac Pérez',
          timestamp: 'Justo ahora'
        };
        setActivityLogs(prev => [newLog, ...prev]);
      }
    }
  };

  const handleToggleStar = (id: string) => {
    setDocuments(prev => prev.map(d => {
      if (d.id === id) {
        return { ...d, isStarred: !d.isStarred };
      }
      return d;
    }));
    if (selectedDoc && selectedDoc.id === id) {
      setSelectedDoc(prev => prev ? { ...prev, isStarred: !prev.isStarred } : null);
    }
  };

  const handleAddComment = (docId: string, text: string) => {
    const comment = {
      id: `c-${Date.now()}`,
      author: 'Isaac Pérez',
      text,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setDocuments(prev => prev.map(d => {
      if (d.id === docId) {
        return { ...d, comments: [...d.comments, comment] };
      }
      return d;
    }));

    if (selectedDoc && selectedDoc.id === docId) {
      setSelectedDoc(prev => prev ? { ...prev, comments: [...prev.comments, comment] } : null);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        folders={folders}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
        onOpenUpload={() => setIsUploadOpen(true)}
        pendingCount={pendingCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTabName={
            activeTab === 'dashboard' ? 'Panel General' :
            activeTab === 'documents' ? 'Repositorio de Documentos' :
            activeTab === 'approvals' ? 'Aprobaciones y Revisiones' :
            activeTab === 'activity' ? 'Registro de Auditoría' : 'Configuración'
          }
          isSupabaseConnected={isSupabaseConnected}
        />

        <main className="flex-1 overflow-hidden">
          {activeTab === 'dashboard' && (
            <Dashboard
              documents={documents}
              folders={folders}
              activityLogs={activityLogs}
              onSelectDoc={setSelectedDoc}
              setActiveTab={setActiveTab}
              setSelectedFolderId={setSelectedFolderId}
            />
          )}

          {activeTab === 'documents' && (
            <DocumentList
              documents={documents}
              folders={folders}
              selectedFolderId={selectedFolderId}
              setSelectedFolderId={setSelectedFolderId}
              searchQuery={searchQuery}
              onSelectDoc={setSelectedDoc}
              onOpenUpload={() => setIsUploadOpen(true)}
              onDeleteDoc={handleDeleteDoc}
              onToggleStar={handleToggleStar}
            />
          )}

          {activeTab === 'approvals' && (
            <ApprovalsView
              documents={documents}
              onUpdateStatus={handleUpdateStatus}
              onSelectDoc={setSelectedDoc}
            />
          )}

          {activeTab === 'activity' && (
            <ActivityLogView activityLogs={activityLogs} />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              isSupabaseConnected={isSupabaseConnected}
              setIsSupabaseConnected={setIsSupabaseConnected}
              supabaseUrl={supabaseUrl}
              setSupabaseUrl={setSupabaseUrl}
              supabaseKey={supabaseKey}
              setSupabaseKey={setSupabaseKey}
            />
          )}
        </main>
      </div>

      {/* Document Detail Modal */}
      {selectedDoc && (
        <DocumentModal
          doc={selectedDoc}
          onClose={() => setSelectedDoc(null)}
          onUpdateStatus={handleUpdateStatus}
          onAddComment={handleAddComment}
        />
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <UploadModal
          folders={folders}
          onClose={() => setIsUploadOpen(false)}
          onAddDocument={handleAddDocument}
        />
      )}
    </div>
  );
}
