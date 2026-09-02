import React, { useEffect, useState, useCallback } from 'react';
import { Car, Trash2, RefreshCw, Plus, Pencil } from 'lucide-react';
import {
  fetchVehiclesAdmin,
  deleteVehicle,
  VehicleRowDto,
  assetUrl
} from './adminApi';
import { VehicleEditor } from './views/VehicleEditor';

export const VehiclesView: React.FC = () => {
  const [vehicles, setVehicles] = useState<VehicleRowDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<VehicleRowDto | null | undefined>(undefined); // undefined=closed, null=new, object=edit

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setVehicles(await fetchVehiclesAdmin());
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: number) => {
    if (!confirm('حذف هذه السيارة نهائياً؟')) return;
    await deleteVehicle(id);
    load();
  };

  const HIDDEN_KEY = 'apex_hidden_models';
  const [hiddenModels, setHiddenModels] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(HIDDEN_KEY) || '[]'); } catch { return []; }
  });
  const persistHidden = (next: string[]) => {
    setHiddenModels(next);
    localStorage.setItem(HIDDEN_KEY, JSON.stringify(next));
  };

  // cleanup old knownModels key that caused “return appear” bug (persisted models even after delete)
  useEffect(() => {
    localStorage.removeItem('apex_known_models');
  }, []);

  const hideModel = (m: string) => {
    if (!confirm(`إخفاء الموديل "${m}" من القائمة؟ لن يظهر في قائمة اختيار الموديل عند إضافة سيارة جديدة (السيارات الحالية لا تُحذف).`)) return;
    const next = [...hiddenModels, m];
    persistHidden(next);
  };
  const unhideModel = (m: string) => {
    const next = hiddenModels.filter(x => x !== m);
    persistHidden(next);
  };

  const allModels = Array.from(new Set(vehicles.map((v) => v.model).filter((m): m is string => Boolean(m)))).sort();
  const existingModels = allModels.filter(m => !hiddenModels.includes(m));
  const modelCounts = allModels.reduce<Record<string, number>>((acc, m) => {
    acc[m as string] = vehicles.filter(v => v.model === m).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#f7f7f8] pt-36 sm:pt-24 pb-16 px-6 lg:px-10 max-w-6xl mx-auto" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-semibold text-neutral-900 flex items-center gap-3">
          <Car className="w-6 h-6 text-[#a98136]" /> إدارة السيارات ({vehicles.length})
        </h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setEditing(null)} className="text-xs px-3 py-1.5 rounded bg-[#a98136] text-white hover:brightness-105 cursor-pointer flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> إضافة سيارة
          </button>
          <button onClick={load} className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" /> تحديث
          </button>
        </div>
      </div>

      {/* Models manager — hide/remove model from dropdown */}
      {!loading && allModels.length > 0 && (
        <div className="bg-white border border-neutral-200 shadow-sm p-4 mb-6">
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">إدارة الموديلات في القائمة ({allModels.length})</h3>
          <p className="text-xs text-neutral-500 mb-3">الموديلات تُستخرج تلقائياً من السيارات الحالية. لإزالة موديل من القائمة، احذف كل السيارات بهذا الموديل أو اضغط إخفاء (لن تُحذف السيارات، فقط سيختفي من قائمة الاختيار عند إضافة سيارة جديدة).</p>
          <div className="flex flex-wrap gap-2">
            {(allModels as string[]).map(m => {
              const isHidden = hiddenModels.includes(m as string);
              return (
                <span key={m as string} className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${isHidden ? 'bg-neutral-100 border-neutral-300 text-neutral-500 line-through' : 'bg-[#a98136]/10 border-[#a98136]/30 text-neutral-900'}`}>
                  {m as string} <span className="text-[11px] text-neutral-500">({(modelCounts as Record<string, number>)[m as string] || 0})</span>
                  {!isHidden ? (
                    <button onClick={() => hideModel(m as string)} title="إخفاء من القائمة" className="ms-1 text-neutral-500 hover:text-red-600 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                  ) : (
                    <button onClick={() => unhideModel(m as string)} title="إظهار" className="ms-1 text-emerald-600 hover:text-emerald-700 cursor-pointer">إظهار</button>
                  )}
                </span>
              );
            })}
          </div>
          {hiddenModels.length > 0 && <p className="text-xs text-neutral-500 mt-2">المخفية: {hiddenModels.join('، ')} — اضغط إظهار لإعادتها. (احذف كل السيارات بهذا الموديل ليختفي نهائياً)</p>}
        </div>
      )}

      {loading && <p className="text-sm text-neutral-500">جارٍ التحميل...</p>}

      {!loading && vehicles.length === 0 && (
        <p className="text-sm text-neutral-500 py-12 text-center">لا توجد سيارات.</p>
      )}

      <div className="space-y-3">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white border border-neutral-200 shadow-sm p-4 flex items-center gap-4 flex-wrap">
            <img src={assetUrl(v.images?.[0]?.url)} alt={v.model} className="w-24 h-16 object-cover border border-neutral-300 shrink-0" />
            <div className="flex-1 min-w-[200px]">
              <p className="font-semibold text-neutral-900 text-sm">
                {v.year} {v.brand} {v.model} <span className="text-neutral-500 font-normal">({v.trim})</span>
              </p>
              <p className="text-xs text-neutral-500 mt-1" dir="ltr">
                {v.price.toLocaleString()} {v.currency} · {v.mileageKm.toLocaleString()} km · فحص {v.inspectionScore}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setEditing(v)}
                className="text-xs px-2.5 py-1.5 rounded border border-neutral-300 text-neutral-600 hover:border-[#a98136] hover:text-[#a98136] cursor-pointer flex items-center gap-1.5"
              >
                <Pencil className="w-3.5 h-3.5" /> تعديل
              </button>
              <button onClick={() => handleDelete(v.id)} className="text-neutral-600 hover:text-red-600 cursor-pointer p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing !== undefined && (
        <VehicleEditor
          vehicle={editing}
          existingModels={existingModels}
          onClose={() => setEditing(undefined)}
          onSaved={() => {
            setEditing(undefined);
            load();
          }}
        />
      )}
    </div>
  );
};
