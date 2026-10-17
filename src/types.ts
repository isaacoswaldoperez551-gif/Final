export type DocumentStatus = 'draft' | 'review' | 'approved' | 'archived';

export type FileCategory = 'Financiero' | 'Legal' | 'Recursos Humanos' | 'Proyectos' | 'Operaciones' | 'Marketing';

export interface DocumentVersion {
  version: string;
  updatedAt: string;
  updatedBy: string;
  size: string;
  changesSummary: string;
}

export interface DocumentComment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  createdAt: string;
}

export interface DocItem {
  id: string;
  title: string;
  description: string;
  category: FileCategory;
  folderId: string;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'png' | 'txt' | 'zip';
  fileSize: string;
  status: DocumentStatus;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  versions: DocumentVersion[];
  comments: DocumentComment[];
  isStarred?: boolean;
  isConfidential?: boolean;
}

export interface Folder {
  id: string;
  name: string;
  color: string;
  icon: string;
  parentId?: string;
  itemCount?: number;
}

export interface ActivityLog {
  id: string;
  action: 'uploaded' | 'updated' | 'approved' | 'downloaded' | 'deleted' | 'commented';
  documentTitle: string;
  user: string;
  timestamp: string;
  details?: string;
}
