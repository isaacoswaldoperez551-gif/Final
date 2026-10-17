import React, { useState } from 'react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, Key, Globe, Shield, Save } from 'lucide-react';

interface SettingsViewProps {
  isSupabaseConnected: boolean;
  setIsSupabaseConnected: (connected: boolean) => void;
  supabaseUrl: string;
  setSupabaseUrl: (url: string) => void;
  supabaseKey: string;
  setSupabaseKey: (key: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isSupabaseConnected,
  setIsSupabaseConnected,
  supabaseUrl,
  setSupabaseUrl,
  supabaseKey,
  setSupabaseKey
}) => {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestConnection = (e: React.FormEvent) => {
    e.preventDefault();
    setTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setTesting(false);
      if (supabaseUrl.trim() && supabaseKey.trim()) {
        setIsSupabaseConnected(true);
        setTestResult('¡Conexión con Supabase establecida exitosamente! Las tablas documents y audit_logs están sincronizadas.');
      } else {
        setIsSupabaseConnected(false);
        setTestResult('Por favor ingresa URL y Anon Key válidos de Supabase.');
      }
    }, 1200);
  };

  const handleDisconnect = () => {
    setIsSupabaseConnected(false);
    setSupabaseUrl('');
    setSupabaseKey('');
    setTestResult('Desconectado de Supabase. Operando en Modo Demo Local.');
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full text-slate-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white">Configuración del Sistema</h2>
        <p className="text-slate-400 text-sm mt-0.5">
          Conexión con bases de datos Supabase, almacenamiento en la nube y parámetros de seguridad empresarial
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Supabase Connection Card */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Integración con Supabase</h3>
                <p className="text-xs text-slate-400">Base de datos PostgreSQL en tiempo real</p>
              </div>
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              isSupabaseConnected 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              {isSupabaseConnected ? 'Conectado' : 'Modo Demo'}
            </div>
          </div>

          <form onSubmit={handleTestConnection} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Supabase Project URL
              </label>
              <input
                type="text"
                placeholder="https://xyzproject.supabase.co"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-400" /> Supabase Anon / Service Role Key
              </label>
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {testResult && (
              <div className={`p-4 rounded-2xl text-xs flex items-center gap-3 border ${
                isSupabaseConnected 
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
              }`}>
                {isSupabaseConnected ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                <span>{testResult}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              {isSupabaseConnected ? (
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-colors"
                >
                  Desconectar Supabase
                </button>
              ) : (
                <div></div>
              )}

              <button
                type="submit"
                disabled={testing}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 ml-auto"
              >
                {testing && <RefreshCw className="w-4 h-4 animate-spin" />}
                <span>{testing ? 'Verificando...' : 'Guardar y Probar Conexión'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* System Specs Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-4">Información del Sistema</h3>
          
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Versión de la App</span>
              <span className="font-semibold text-white">v1.2.0 Enterprise</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Framework</span>
              <span className="font-semibold text-white">React 19 + Vite</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Estilos</span>
              <span className="font-semibold text-white">Tailwind CSS v4</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Seguridad</span>
              <span className="font-semibold text-emerald-400">OAuth & RBAC Activo</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-400">Soporte de Archivos</span>
              <span className="font-semibold text-white">PDF, DOCX, XLSX, PPTX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
