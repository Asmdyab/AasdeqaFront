import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PriceTag } from '../../components/price/PriceTag';
import { useShowroom } from '../../context/ShowroomContext';
import { submitInspection, assetUrl } from '../../lib/api';
import { X, Eye, ShieldCheck, CheckCircle2, ArrowLeft, MessageSquare } from 'lucide-react';

export const InspectionModal: React.FC = () => {
  const { inspectionModalOpen, closeInspection, inspectionVehicleId, vehicles, openWhatsApp, formatPrice } = useShowroom() as any;
  const [selectedCarId, setSelectedCarId] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (inspectionVehicleId) setSelectedCarId(inspectionVehicleId);
    else if (vehicles.length > 0 && !selectedCarId) setSelectedCarId(vehicles[0].id);
  }, [inspectionVehicleId, vehicles, selectedCarId]);

  useEffect(() => {
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (!inspectionModalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeInspection(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inspectionModalOpen, closeInspection]);

  const selectedVehicleObj = vehicles.find((v:any)=>v.id===selectedCarId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInspection({ vehicleId: selectedVehicleObj?.databaseId ?? null, name, phone, preferredDate: date, preferredTime: time, notes: notes||undefined });
      setBookingRef(`APX-IN-${Math.floor(100000+Math.random()*900000)}`);
      setIsSuccess(true);
    } catch {
      setBookingRef(`APX-IN-${Math.floor(100000+Math.random()*900000)}`);
      setIsSuccess(true);
    } finally { setSubmitting(false); }
  };

  const handleWhatsApp = () => {
    if (!selectedVehicleObj) return;
    const msg = `مرحباً، حجزت معاينة للسيارة ${selectedVehicleObj.year} ${selectedVehicleObj.brand} ${selectedVehicleObj.model} [${bookingRef}] التاريخ: ${date} الساعة ${time}. الاسم: ${name}، الجوال: ${phone}.`;
    openWhatsApp(selectedVehicleObj, msg);
    closeInspection();
  };

  return (
    <AnimatePresence>
      {inspectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={closeInspection} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:16}} role="dialog" aria-modal="true" className="relative z-10 w-full max-w-lg bg-white border border-neutral-200 p-6 sm:p-8 shadow-[0_30px_80px_rgba(9,9,11,0.28)] my-8">
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-neutral-200">
              <div><span className="eyebrow"><Eye className="w-3.5 h-3.5 text-[#a98136]" />طلب معاينة</span><h3 className="font-display text-lg font-semibold mt-2">حجز معاينة السيارة</h3><p className="text-xs text-neutral-500 mt-1">اختر الموعد المناسب لمعاينة السيارة في الصالة</p></div>
              <button onClick={closeInspection} className="p-1.5 -m-1.5 text-neutral-500 hover:text-neutral-900"><X className="w-5 h-5" /></button>
            </div>
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="pt-6 space-y-6">
                <div>
                  <label className="field-label">السيارة</label>
                  <select value={selectedCarId} onChange={e=>setSelectedCarId(e.target.value)} className="field-input cursor-pointer">
                    {vehicles.map((v:any)=>(<option key={v.id} value={v.id}>{v.year} {v.brand} {v.model} ({v.trim}) — {formatPrice(v.price)}</option>))}
                  </select>
                  {selectedVehicleObj && (
                    <div className="flex items-center gap-3 mt-4 bg-neutral-100 border border-neutral-200 p-3">
                      <img src={assetUrl(selectedVehicleObj.images[0]?.url)} alt={selectedVehicleObj.model} className="w-16 h-11 object-cover border border-neutral-200 shrink-0" />
                      <div className="flex-1 min-w-0"><div className="text-xs font-semibold truncate">{selectedVehicleObj.brand} {selectedVehicleObj.model}</div><div className="text-[11px] text-neutral-500 font-mono" dir="ltr">{selectedVehicleObj.engine} · {selectedVehicleObj.horsepower} HP</div></div>
                      <div className="text-end shrink-0"><PriceTag amount={selectedVehicleObj.price} className="text-xs font-semibold font-mono" /><div className="text-[10px] text-neutral-500" dir="ltr">#{selectedVehicleObj.stockNumber}</div></div>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div><label className="field-label">التاريخ</label><input type="date" required value={date} onChange={e=>setDate(e.target.value)} className="field-input font-mono" dir="ltr" /></div>
                  <div><label className="field-label">الوقت</label><select value={time} onChange={e=>setTime(e.target.value)} className="field-input cursor-pointer"><option value="10:00">10:00 صباحاً</option><option value="12:00">12:00 ظهراً</option><option value="14:00">14:00 مساءً</option><option value="16:00">16:00 مساءً</option><option value="18:00">18:00 مساءً</option></select></div>
                </div>
                <div><label className="field-label">الاسم الكريم</label><input type="text" required value={name} onChange={e=>setName(e.target.value)} placeholder="الاسم الكريم" className="field-input" /></div>
                <div><label className="field-label">الجوال</label><input type="tel" required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+20 100 000 0000" className="field-input font-mono" dir="ltr" /></div>
                <div><label className="field-label">ملاحظات (اختياري)</label><textarea rows={2} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="أي طلبات خاصة للمعاينة" className="field-input resize-none" /></div>
                <div className="pt-1 space-y-3"><button type="submit" disabled={submitting} className="btn btn-gold w-full">{submitting?'جارٍ الحجز...':'تأكيد المعاينة'}<ArrowLeft className="w-4 h-4 btn-arrow" /></button><p className="flex items-center justify-center gap-2 text-[10px] text-neutral-500"><ShieldCheck className="w-3.5 h-3.5 text-[#a98136]" />سيتم تأكيد الموعد عبر الهاتف</p></div>
              </form>
            ) : (
              <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="pt-7 space-y-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="space-y-2"><h3 className="font-display text-xl font-semibold">تم حجز المعاينة</h3><p className="text-xs text-neutral-500">المرجع <span className="font-mono text-[#a98136]" dir="ltr">#{bookingRef}</span> — {date} {time}</p></div>
                <div className="space-y-2.5 pt-1"><button onClick={handleWhatsApp} className="btn btn-sm w-full bg-[#25D366] hover:brightness-110 text-black border-0"><MessageSquare className="w-4 h-4" />متابعة عبر واتساب</button><button onClick={closeInspection} className="btn btn-ghost btn-sm w-full">إغلاق</button></div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
