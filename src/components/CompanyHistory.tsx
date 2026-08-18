import React from 'react';
import { 
  Building2, 
  Truck, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Award, 
  HeartHandshake, 
  CheckCircle2,
  Calendar,
  Flame,
  Zap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TIMELINE_ICONS = [Building2, Truck, ShieldCheck, TrendingUp];
const VALUE_ICONS = [Users, Truck, Award, HeartHandshake];

export default function CompanyHistory() {
  const { t, lang } = useLanguage();

  return (
    <section id="history" className="relative py-20 sm:py-28 border-t border-white/10 overflow-hidden bg-[#08090b]">
      {/* Heavy Industrial Background Grid and Ambience */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none industrial-grid" />
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 mb-3">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            <span className="font-mono text-xs font-bold text-orange-400 uppercase tracking-widest">
              {t.history.header}
            </span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {t.history.title} <span className="text-orange-500">{t.history.titleAccent}</span>
          </h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4" />
          <p className="text-sm sm:text-base text-[#bbb] mt-5 leading-relaxed font-light">
            {t.history.subtitle}
          </p>
        </div>

        {/* Narrative Intro Heavy Industrial Box */}
        <div className="bg-[#111318] p-8 sm:p-12 mb-16 border-2 border-white/15 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-2.5 h-full bg-orange-500" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-extrabold block">
                {t.history.badge}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-white font-extrabold uppercase leading-snug">
                {t.history.mainTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#ccc] leading-relaxed font-light">
                {t.history.desc1}
              </p>
              <p className="text-xs sm:text-sm text-[#aaa] leading-relaxed font-light">
                {t.history.desc2}
              </p>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 space-y-5">
              <div className="bg-black/30 p-3 border border-white/5 space-y-1">
                <div className="text-3xl font-serif font-black text-white">14 500+</div>
                <div className="text-[10px] text-orange-400 uppercase tracking-wider font-mono font-bold">{t.history.statTransits}</div>
              </div>
              <div className="bg-black/30 p-3 border border-white/5 space-y-1">
                <div className="text-3xl font-serif font-black text-amber-400">100%</div>
                <div className="text-[10px] text-[#aaa] uppercase tracking-wider font-mono font-bold">{t.history.statCoverage}</div>
              </div>
              <div className="bg-black/30 p-3 border border-white/5 space-y-1">
                <div className="text-3xl font-serif font-black text-orange-500">2010</div>
                <div className="text-[10px] text-white uppercase tracking-wider font-mono font-bold">{t.history.statFounded}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-[2.5px] block">{t.history.timelineTitle}</span>
            <h3 className="font-serif text-2xl sm:text-4xl font-black uppercase text-white mt-1">
              {lang === 'ru' ? 'Хронология индустриального роста' : 'Chronology of Growth'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.history.events.map((event, idx) => {
              const Icon = TIMELINE_ICONS[idx] || Truck;
              return (
                <div 
                  key={idx} 
                  className="bg-[#111318] hover:bg-[#171a22] p-6 flex flex-col justify-between border border-white/15 hover:border-orange-500 transition-all duration-200 relative group"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                      <span className="font-serif text-3xl sm:text-4xl font-black text-orange-500">
                        {event.year}
                      </span>
                      <div className="h-10 w-10 flex items-center justify-center bg-orange-500/10 border border-orange-500/30 text-orange-400 group-hover:bg-orange-500 group-hover:text-black transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <span className="inline-block text-[9px] font-mono text-amber-400 font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 mb-3">
                      {event.tag}
                    </span>

                    <h4 className="font-serif text-lg font-bold uppercase text-white mb-2 leading-snug">
                      {event.title}
                    </h4>

                    <p className="text-xs text-[#aaa] font-light leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center text-[10px] text-emerald-400 font-mono font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mr-1.5 shrink-0" />
                    <span>{lang === 'ru' ? 'Успешно реализовано' : 'Successfully Delivered'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corporate Values */}
        <div>
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-orange-400 uppercase tracking-[2.5px] font-bold block">{t.history.valuesTitle}</span>
            <h3 className="font-serif text-2xl sm:text-4xl font-black uppercase text-white mt-1">
              {lang === 'ru' ? 'Ценности и стандарты LEV&AV' : 'Core Principles of LEV&AV'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.history.values.map((val, idx) => {
              const Icon = VALUE_ICONS[idx] || Award;
              return (
                <div 
                  key={idx}
                  className="bg-[#111318] p-6 border border-white/10 space-y-4 hover:border-orange-500/50 transition-colors"
                >
                  <div className="h-12 w-12 flex items-center justify-center bg-orange-500/10 border border-orange-500/30 text-orange-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold uppercase text-white leading-snug">
                    {val.title}
                  </h4>
                  <p className="text-xs text-[#aaa] font-light leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
