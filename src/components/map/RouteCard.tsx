import React from 'react';
import { ArrowRight, Truck, Clock, Navigation, ShieldCheck, Compass, X } from 'lucide-react';
import { Destination, LogisticsRoute } from '../../data/logisticsData';
import { useLanguage } from '../../context/LanguageContext';

interface RouteCardProps {
  dest: Destination;
  route: LogisticsRoute;
  onBook: (route: LogisticsRoute) => void;
  onClose?: () => void;
  variant?: 'panel' | 'sheet';
}

export default function RouteCard({ dest, route, onBook, onClose, variant = 'panel' }: RouteCardProps) {
  const { lang } = useLanguage();
  const distanceLabel = `~${route.distanceKm.toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US')} ${lang === 'ru' ? 'км' : 'km'}`;

  return (
    <div
      id="active-route-detail-card"
      className={`bg-[#111318] border-2 border-orange-500 p-5 sm:p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden ${
        variant === 'panel' ? 'h-full' : 'w-full max-h-[80vh] overflow-y-auto'
      }`}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label={lang === 'ru' ? 'Закрыть карточку маршрута' : 'Close route card'}
          className="absolute top-3 right-3 z-10 p-1.5 bg-black/50 border border-white/10 text-white hover:bg-orange-500 hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <div className="absolute top-0 left-0 bg-orange-500 text-black px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest">
        {lang === 'ru' ? route.badgeRu : route.badgeEn}
      </div>

      <div className="mt-8">
        <div className="border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center space-x-2 text-orange-400 text-xs font-mono font-bold mb-1">
            <Compass className="h-4 w-4 text-orange-500" aria-hidden="true" />
            <span>{lang === 'ru' ? 'ВЫБРАННЫЙ МАРШРУТ' : 'SELECTED ROUTE'}</span>
          </div>
          <h4 className="font-serif text-xl sm:text-2xl font-black text-white uppercase leading-tight mt-1">
            {lang === 'ru' ? route.labelRu : route.labelEn}
          </h4>
          <p className="text-xs text-orange-300 font-mono mt-0.5">{lang === 'ru' ? route.taglineRu : route.taglineEn}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-black/50 border border-white/10 p-3">
            <span className="text-[9px] font-mono text-[#888] uppercase block">{lang === 'ru' ? 'Расстояние:' : 'Distance:'}</span>
            <strong className="text-base font-serif font-black text-white">{distanceLabel}</strong>
          </div>
          <div className="bg-black/50 border border-white/10 p-3">
            <span className="text-[9px] font-mono text-[#888] uppercase block">{lang === 'ru' ? 'Срок доставки:' : 'Transit Time:'}</span>
            <strong className="text-sm font-mono font-black text-orange-400">{lang === 'ru' ? route.timeRu : route.timeEn}</strong>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {route.typeTags.map((tag) => (
            <span key={tag} className="text-[10px] font-mono font-bold text-orange-300 bg-orange-500/10 border border-orange-500/30 px-1.5 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-3 text-xs font-mono mb-6">
          <div className="bg-black/30 p-2.5 border border-white/5 space-y-1">
            <div className="text-[9px] text-[#777] uppercase font-bold flex items-center space-x-1">
              <Truck className="h-3 w-3 text-orange-500" aria-hidden="true" />
              <span>{lang === 'ru' ? 'Подвижной состав:' : 'Transport Fleet:'}</span>
            </div>
            <p className="text-white font-bold text-[11px] leading-snug">{lang === 'ru' ? route.transportRu : route.transportEn}</p>
          </div>

          <div className="bg-black/30 p-2.5 border border-white/5 space-y-1">
            <div className="text-[9px] text-[#777] uppercase font-bold flex items-center space-x-1">
              <Clock className="h-3 w-3 text-amber-400" aria-hidden="true" />
              <span>{lang === 'ru' ? 'График и частота рейсов:' : 'Frequency & Schedule:'}</span>
            </div>
            <p className="text-orange-400 font-bold text-[11px]">{lang === 'ru' ? route.frequencyRu : route.frequencyEn}</p>
          </div>

          <div className="bg-black/30 p-2.5 border border-white/5 space-y-1">
            <div className="text-[9px] text-[#777] uppercase font-bold flex items-center space-x-1">
              <Navigation className="h-3 w-3 text-emerald-400" aria-hidden="true" />
              <span>{lang === 'ru' ? 'Погранпереходы и трассы:' : 'Checkpoints & Highways:'}</span>
            </div>
            <p className="text-[#ccc] text-[11px] leading-snug">{lang === 'ru' ? route.checkpointRu : route.checkpointEn}</p>
          </div>

          <div className="bg-black/30 p-2.5 border border-white/5 space-y-1">
            <div className="text-[9px] text-[#777] uppercase font-bold flex items-center space-x-1">
              <ShieldCheck className="h-3 w-3 text-amber-400" aria-hidden="true" />
              <span>{lang === 'ru' ? 'Таможенное оформление:' : 'Customs & Docs:'}</span>
            </div>
            <p className="text-amber-300 text-[10px] leading-snug">{lang === 'ru' ? route.customsRu : route.customsEn}</p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 space-y-2">
        <button
          type="button"
          onClick={() => onBook(route)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-black py-3 px-4 text-xs font-mono font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 transition cursor-pointer shadow-lg shadow-orange-950/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span>{lang === 'ru' ? 'ЗАКАЗАТЬ ПЕРЕВОЗКУ' : 'BOOK THIS ROUTE'}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center justify-between text-[10px] font-mono text-[#888] pt-1">
          <span>{lang === 'ru' ? 'Прямой контракт с LEV&AV LLC' : 'Direct carrier contract'}</span>
          <span className="text-emerald-400 font-bold">{lang === 'ru' ? '100% страховка CMR' : '100% CMR Insured'}</span>
        </div>
      </div>
    </div>
  );
}
