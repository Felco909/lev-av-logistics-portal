import React from 'react';
import { Destination, LogisticsRoute } from '../../data/logisticsData';
import { useLanguage } from '../../context/LanguageContext';

interface RouteTooltipProps {
  dest: Destination;
  route: LogisticsRoute;
  coords: [number, number];
  width: number;
  height: number;
}

export default function RouteTooltip({ dest, route, coords, width, height }: RouteTooltipProps) {
  const { lang } = useLanguage();
  const leftPct = (coords[0] / width) * 100;
  const topPct = (coords[1] / height) * 100;
  const flip = leftPct > 62;

  return (
    <div
      role="status"
      className="absolute z-30 pointer-events-none bg-[#111318] border border-orange-500/60 shadow-2xl px-3 py-2 min-w-[170px]"
      style={{ left: `${leftPct}%`, top: `${topPct}%`, transform: `translate(${flip ? '-104%' : '4%'}, -50%)` }}
    >
      <div className="font-mono text-[10px] font-black text-orange-400 uppercase tracking-wider whitespace-nowrap">
        {lang === 'ru' ? route.labelRu : route.labelEn}
      </div>
      <div className="text-[10px] text-[#aaa] mt-0.5 whitespace-nowrap">{lang === 'ru' ? route.taglineRu : route.taglineEn}</div>
    </div>
  );
}
