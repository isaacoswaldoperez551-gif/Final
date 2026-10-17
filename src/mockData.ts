import { DocItem, Folder, ActivityLog } from './types';

export const initialFolders: Folder[] = [
  { id: 'f-1', name: 'Contabilidad y Finanzas', color: 'bg-emerald-500', icon: 'DollarSign' },
  { id: 'f-2', name: 'Contratos Legales', color: 'bg-indigo-500', icon: 'Scale' },
  { id: 'f-3', name: 'Recursos Humanos', color: 'bg-purple-500', icon: 'Users' },
  { id: 'f-4', name: 'Proyectos Q4', color: 'bg-blue-500', icon: 'Briefcase' },
  { id: 'f-5', name: 'Operaciones & TI', color: 'bg-amber-500', icon: 'Server' },
  { id: 'f-6', name: 'Marketing y Ventas', color: 'bg-rose-500', icon: 'TrendingUp' },
];

export const initialDocuments: DocItem[] = [
  {
    id: 'doc-1',
    title: 'Presupuesto Anual 2026 - Consolidado.xlsx',
    description: 'Proyección financiera detallada por departamentos y previsión de flujo de caja para el ejercicio fiscal 2026.',
    category: 'Financiero',
    folderId: 'f-1',
    fileType: 'xlsx',
    fileSize: '4.2 MB',
    status: 'approved',
    tags: ['Presupuesto', 'Finanzas', '2026', 'Confidencial'],
    author: 'Sofía Martínez (CFO)',
    createdAt: '2026-01-10',
    updatedAt: '2026-02-15',
    isStarred: true,
    isConfidential: true,
    versions: [
      { version: 'v1.0', updatedAt: '2026-01-10', updatedBy: 'Sofía Martínez', size: '3.8 MB', size: '3.8 MB', changesSummary: 'Borrador inicial' },
      { version: 'v2.0', updatedAt: '2026-02-15', updatedBy: 'Sofía Martínez', size: '4.2 MB', changesSummary: 'Ajuste de partida de TI y marketing' }
    ],
    comments: [
      { id: 'c-1', author: 'Carlos Mendoza', text: 'Revisado y aprobado el anexo 3 de infraestructura.', createdAt: '2026-02-16' }
    ]
  },
  {
    id: 'doc-2',
    title: 'Contrato Marco de Proveedores Cloud 2026.pdf',
    description: 'Acuerdo de nivel de servicio (SLA) y condiciones legales para infraestructura en la nube AWS y Google Cloud.',
    category: 'Legal',
    folderId: 'f-2',
    fileType: 'pdf',
    fileSize: '2.8 MB',
    status: 'approved',
    tags: ['Legal', 'Proveedores', 'SLA', 'Contrato'],
    author: 'Alejandro Vega (Legal)',
    createdAt: '2026-01-20',
    updatedAt: '2026-01-22',
    isStarred: true,
    isConfidential: true,
    versions: [
      { version: 'v1.0', updatedAt: '2026-01-20', updatedBy: 'Alejandro Vega', size: '2.8 MB', changesSummary: 'Versión final firmada por ambas partes' }
    ],
    comments: []
  },
  {
    id: 'doc-3',
    title: 'Manual de Políticas de Teletrabajo y Seguridad.docx',
    description: 'Guía actualizada de directrices para trabajo híbrido, uso de VPN corporativa y protección de datos personales (GDPR).',
    category: 'Recursos Humanos',
    folderId: 'f-3',
    fileType: 'docx',
    fileSize: '1.5 MB',
    status: 'review',
    tags: ['RRHH', 'Políticas', 'Seguridad', 'Interno'],
    author: 'Lucia Gómez (HR Director)',
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10',
    isStarred: false,
    isConfidential: false,
    versions: [
      { version: 'v0.9', updatedAt: '2026-03-01', updatedBy: 'Lucia Gómez', size: '1.4 MB', changesSummary: 'Propuesta de revisión trimestral' },
      { version: 'v1.0', updatedAt: '2026-03-10', updatedBy: 'Lucia Gómez', size: '1.5 MB', changesSummary: 'Incorporación de sugerencias del comité directivo' }
    ],
    comments: [
      { id: 'c-2', author: 'Mateo Silva', text: '¿Se incluyó la cláusula sobre equipos personales?', createdAt: '2026-03-11' }
    ]
  },
  {
    id: 'doc-4',
    title: 'Arquitectura de Microservicios v3.pdf',
    description: 'Diagramas de arquitectura técnica, esquemas de bases de datos distribuidas y protocolos de autenticación OAuth2.',
    category: 'Operaciones',
    folderId: 'f-5',
    fileType: 'pdf',
    fileSize: '8.4 MB',
    status: 'approved',
    tags: ['Tecnología', 'Arquitectura', 'Backend', 'API'],
    author: 'Diego Torres (CTO)',
    createdAt: '2026-02-05',
    updatedAt: '2026-02-28',
    isStarred: true,
    isConfidential: true,
    versions: [
      { version: 'v3.0', updatedAt: '2026-02-28', updatedBy: 'Diego Torres', size: '8.4 MB', changesSummary: 'Actualización de diagramas de secuencia Kubernetes' }
    ],
    comments: []
  },
  {
    id: 'doc-5',
    title: 'Plan de Lanzamiento Campaña Q2 - Growth.pptx',
    description: 'Estrategia de marketing digital, pauta publicitaria en redes sociales y métricas de adquisición de clientes esperadas.',
    category: 'Marketing',
    folderId: 'f-6',
    fileType: 'pptx',
    fileSize: '12.1 MB',
    status: 'draft',
    tags: ['Marketing', 'Q2', 'Growth', 'Estrategia'],
    author: 'Valeria Ríos (CMO)',
    createdAt: '2026-03-12',
    updatedAt: '2026-03-14',
    isStarred: false,
    isConfidential: false,
    versions: [
      { version: 'v0.1', updatedAt: '2026-03-12', updatedBy: 'Valeria Ríos', size: '11.5 MB', changesSummary: 'Estructura general' },
      { version: 'v0.5', updatedAt: '2026-03-14', updatedBy: 'Valeria Ríos', size: '12.1 MB', changesSummary: 'Adición de presupuestos por canal' }
    ],
    comments: []
  },
  {
    id: 'doc-6',
    title: 'Auditoría de Cumplimiento ISO 27001.pdf',
    description: 'Informe final de la auditoría externa de seguridad de la información con hallazgos y plan de mitigación.',
    category: 'Operaciones',
    folderId: 'f-5',
    fileType: 'pdf',
    fileSize: '5.3 MB',
    status: 'approved',
    tags: ['ISO27001', 'Seguridad', 'Auditoría', 'Compliance'],
    author: 'Esteban Ruiz (CISO)',
    createdAt: '2026-01-15',
    updatedAt: '2026-01-18',
    isStarred: true,
    isConfidential: true,
    versions: [
      { version: 'v1.0', updatedAt: '2026-01-18', updatedBy: 'Esteban Ruiz', size: '5.3 MB', changesSummary: 'Informe certificado sin no conformidades mayores' }
    ],
    comments: []
  },
  {
    id: 'doc-7',
    title: 'Plan de Negocio Proyecto Ártico Q4.docx',
    description: 'Objetivos estratégicos, análisis de competencia y cronograma de despliegue para la nueva línea de productos.',
    category: 'Proyectos',
    folderId: 'f-4',
    fileType: 'docx',
    fileSize: '3.1 MB',
    status: 'review',
    tags: ['Estrategia', 'Proyecto Ártico', 'Q4'],
    author: 'Camila Rojas (Project Manager)',
    createdAt: '2026-03-08',
    updatedAt: '2026-03-13',
    isStarred: false,
    isConfidential: false,
    versions: [
      { version: 'v1.0', updatedAt: '2026-03-13', updatedBy: 'Camila Rojas', size: '3.1 MB', changesSummary: 'Revisión por dirección de operaciones' }
    ],
    comments: []
  }
];

export const initialActivityLogs: ActivityLog[] = [
  { id: 'act-1', action: 'uploaded', documentTitle: 'Plan de Lanzamiento Campaña Q2 - Growth.pptx', user: 'Valeria Ríos', timestamp: 'Hace 2 horas', details: 'Nuevo documento en borrador' },
  { id: 'act-2', action: 'commented', documentTitle: 'Manual de Políticas de Teletrabajo y Seguridad.docx', user: 'Mateo Silva', timestamp: 'Hace 4 horas', details: 'Comentario en sección 4.2' },
  { id: 'act-3', action: 'approved', documentTitle: 'Presupuesto Anual 2026 - Consolidado.xlsx', user: 'Carlos Mendoza', timestamp: 'Ayer', details: 'Estado cambiado a Aprobado' },
  { id: 'act-4', action: 'updated', documentTitle: 'Arquitectura de Microservicios v3.pdf', user: 'Diego Torres', timestamp: 'Hace 3 días', details: 'Actualizado a v3.0' },
  { id: 'act-5', action: 'downloaded', documentTitle: 'Contrato Marco de Proveedores Cloud 2026.pdf', user: 'Ana Pineda', timestamp: 'Hace 4 días' }
];
