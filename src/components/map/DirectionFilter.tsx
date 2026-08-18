import React from 'react';
import { Layers } from 'lucide-react';
import { LogisticsRoute, RouteCategory, ROUTE_CATEGORY_LIST } from '../../data/logisticsData';
import { useLanguage } from '../../context/LanguageContext';

export type FilterValue = 'all' | RouteCategory;

interface DirectionFilterProps {
  routes: LogisticsRoute[];
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

const CATEGORY_LABEL: Record<RouteCategory, { ru: string; en: string; hy: string }> = {
  europe: { ru: 'Европа', en: 'Europe', hy: 'Եվրոպա' },
  russia: { ru: 'Россия', en: 'Russia', hy: 'Ռուսաստան' },
  cis: { ru: 'СНГ', en: 'CIS', hy: 'ԱՊՀ' },
  caucasus: { ru: 'Кавказ', en: 'Caucasus', hy: 'Կովկաս' },
  iran: { ru: 'Иран', en: 'Iran', hy: 'Իրան' },
  asia: { ru: 'Азия', en: 'Asia', hy: 'Ասիա' },
};

export default function DirectionFilter({ routes, value, onChange }: DirectionFilterProps) {
  const { lang } = useLanguage();
  const t3 = (ru: string, en: string, hy: string) => (lang === 'ru' ? ru : lang === 'hy' ? hy : en);

  const counts: Record<FilterValue, number> = { all: routes.length, europe: 0, russia: 0, cis: 0, caucasus: 0, iran: 0, asia: 0 };
  routes.forEach((r) => {
    counts[r.category] += 1;
  });

  const options: FilterValue[] = ['all', ...ROUTE_CATEGORY_LIST];

  return (
    <div role="group" aria-label={t3('Фильтр направлений карты', 'Map direction filter', 'Քարտեզի ուղղությունների զտիչ')} className="flex flex-wrap items-center gap-1 bg-black/50 p-1 border border-white/10">
      {options.map((opt) => {
        const isActive = value === opt;
        const label = opt === 'all' ? t3('Все', 'All', 'Բոլորը') : t3(CATEGORY_LABEL[opt].ru, CATEGORY_LABEL[opt].en, CATEGORY_LABEL[opt].hy);
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(opt)}
            className={`px-2.5 py-1.5 text-[10px] sm:text-[11px] font-mono font-bold uppercase transition cursor-pointer flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
              isActive ? 'bg-orange-500 text-black font-extrabold shadow' : 'text-[#888] hover:text-white'
            }`}
          >
            {opt === 'all' && <Layers className="h-3 w-3" />}
            <span>{label}</span>
            <span className={`text-[9px] px-1 ${isActive ? 'bg-black/25' : 'bg-white/10 text-orange-400'}`}>{counts[opt]}</span>
          </button>
        );
      })}
    </div>
  );
}
