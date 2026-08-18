import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  FileCheck2, 
  Truck, 
  Layers,
  ChevronRight,
  Flame,
  Zap,
  Activity,
  Send,
  MessageCircle,
  PhoneCall,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LogisticsMap from './LogisticsMap';
import { FilterValue } from './map/DirectionFilter';

// The card grid's "cis" tab bundles Russia + Georgia routes (Moscow, Krasnodar, Tbilisi) — a
// broader grouping than the map's own category taxonomy, where 'cis' means Belarus specifically
// and Georgia falls under 'caucasus'. There's no single map category that covers exactly the same
// set, so this maps to 'russia' (2 of the 3 routes in that tab) rather than the literal-but-wrong
// 'cis', which used to point the map at Belarus — a country not shown in that tab at all.
const GRID_TO_MAP_CATEGORY: Record<'all' | 'cis' | 'iran' | 'europe' | 'china', FilterValue> = {
  all: 'all',
  cis: 'russia',
  iran: 'iran',
  europe: 'europe',
  china: 'asia',
};

interface GeographySectionProps {
  onRequestRouteQuote?: (routeName: string) => void;
}

export default function GeographySection({ onRequestRouteQuote }: GeographySectionProps) {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'cis' | 'iran' | 'europe' | 'china'>('all');

  const baseRoutes = [
    {
      id: 'yerevan-moscow',
      category: 'cis',
      from: lang === 'ru' ? 'Ереван (Армения)' : 'Yerevan (Armenia)',
      to: lang === 'ru' ? 'Москва / Санкт-Петербург (Россия)' : 'Moscow / St. Petersburg (Russia)',
      distance: '~2,250 км',
      time: lang === 'ru' ? 'Индивидуально' : 'On Request',
      checkpoints: lang === 'ru' ? 'КПП Баграташен → КПП Верхний Ларс' : 'Bagratashen CP → Upper Lars CP',
      type: lang === 'ru' ? 'Евротенты (86-120 м³), Рефрижераторы (-20°C...+12°C)' : 'Tautliners (86-120 m³), Reefers (-20°C...+12°C)',
      frequency: lang === 'ru' ? 'Ежедневно (собственный парк)' : 'Daily departures',
      customs: lang === 'ru' ? 'Таможенный союз ЕАЭС (упрощенное оформление)' : 'EAEU Customs Union simplified transit',
      badge: lang === 'ru' ? 'ГЛАВНЫЙ КОРИДОР' : 'PRIMARY CORRIDOR',
      highlight: true
    },
    {
      id: 'yerevan-iran',
      category: 'iran',
      from: lang === 'ru' ? 'Тегеран / Бендер-Аббас (Иран)' : 'Tehran / Bandar Abbas (Iran)',
      to: lang === 'ru' ? 'Ереван (Армения) → Транзит в РФ' : 'Yerevan (Armenia) → Transit to CIS',
      distance: '~1,850 км',
      time: lang === 'ru' ? 'Индивидуально' : 'On Request',
      checkpoints: lang === 'ru' ? 'КПП Мегри — Нордуз' : 'Meghri — Norduz Checkpoint',
      type: lang === 'ru' ? 'Тенты, Контейнеровозы, Рефы' : 'Tents, Container carriers, Reefers',
      frequency: lang === 'ru' ? '3–4 раза в неделю' : '3–4 times / week',
      customs: lang === 'ru' ? 'TIR Carnet / Прямая растаможка' : 'TIR Carnet / Direct Customs clearance',
      badge: lang === 'ru' ? 'МЕЖДУНАРОДНЫЙ ХАБ' : 'INTERNATIONAL HUB',
      highlight: false
    },
    {
      id: 'yerevan-georgia',
      category: 'cis',
      from: lang === 'ru' ? 'Тбилиси / Поти / Батуми (Грузия)' : 'Tbilisi / Poti / Batumi (Georgia)',
      to: lang === 'ru' ? 'Ереван (Армения)' : 'Yerevan (Armenia)',
      distance: '~280–450 км',
      time: lang === 'ru' ? 'Индивидуально' : 'On Request',
      checkpoints: lang === 'ru' ? 'КПП Садахло — Баграташен / Гугути' : 'Sadakhlo — Bagratashen CP',
      type: lang === 'ru' ? 'Еврофуры, Контейнерные площадки' : 'Euro trucks, Container platforms',
      frequency: lang === 'ru' ? 'Ежедневно' : 'Daily',
      customs: lang === 'ru' ? 'Транзитная декларация T1 / CMR' : 'Transit T1 / CMR Declaration',
      badge: lang === 'ru' ? 'ПРЯМОЙ ТРАНЗИТ' : 'DIRECT TRANSIT',
      highlight: false
    },
    {
      id: 'yerevan-krasnodar',
      category: 'cis',
      from: lang === 'ru' ? 'Краснодар / Ростов-на-Дону (ЮФО РФ)' : 'Krasnodar / Rostov-on-Don (Russia)',
      to: lang === 'ru' ? 'Ереван (Армения)' : 'Yerevan (Armenia)',
      distance: '~1,150 км',
      time: lang === 'ru' ? 'Индивидуально' : 'On Request',
      checkpoints: lang === 'ru' ? 'КПП Верхний Ларс → КПП Баграташен' : 'Upper Lars CP → Bagratashen',
      type: lang === 'ru' ? 'Тенты, Рефы, Сборные грузы' : 'Tents, Reefers, Groupage cargo',
      frequency: lang === 'ru' ? 'Регулярно' : 'Regular',
      customs: lang === 'ru' ? 'ЕАЭС оформление' : 'EAEU processing',
      badge: lang === 'ru' ? 'РЕГУЛЯРНЫЙ РЕЙС' : 'SCHEDULED ROUTE',
      highlight: false
    },
    {
      id: 'europe-yerevan',
      category: 'europe',
      from: lang === 'ru' ? 'Германия, Италия, Польша (ЕС)' : 'Germany, Italy, Poland (EU)',
      to: lang === 'ru' ? 'Транзит через Грузию → Армения' : 'Transit via Georgia → Armenia',
      distance: '~3,600 км',
      time: lang === 'ru' ? 'Индивидуально' : 'On Request',
      checkpoints: lang === 'ru' ? 'ЕС Граница → Паром/Турция → Садахло' : 'EU Border → Ferry/TR → Sadakhlo',
      type: lang === 'ru' ? 'Еврофуры Mega (100 м³), Рефы, Негабарит' : 'Mega trailers (100 m³), Reefers, Heavy',
      frequency: lang === 'ru' ? 'По графику' : 'On schedule',
      customs: lang === 'ru' ? 'T1, EX-1, TIR Carnet' : 'T1, EX-1, TIR Carnet',
      badge: lang === 'ru' ? 'ЕВРОПА' : 'EUROPE',
      highlight: false
    },
    {
      id: 'china-yerevan',
      category: 'china',
      from: lang === 'ru' ? 'Китай (Урумчи, Иу, Гуанчжоу)' : 'China (Urumqi, Yiwu, Guangzhou)',
      to: lang === 'ru' ? 'Казахстан → РФ → Армения' : 'Kazakhstan → Russia → Armenia',
      distance: '~5,800 км',
      time: lang === 'ru' ? 'Индивидуально' : 'On Request',
      checkpoints: lang === 'ru' ? 'КПП Хоргос / Достык → ЕАЭС' : 'Khorgos CP → EAEU Transit',
      type: lang === 'ru' ? 'Контейнеры 40HQ, Автопоезда' : '40HQ Containers, Road trains',
      frequency: lang === 'ru' ? 'Еженедельно' : 'Weekly',
      customs: lang === 'ru' ? 'Полная таможенная очистка' : 'Full customs clearance',
      badge: lang === 'ru' ? 'ПРЯМАЯ АЗИЯ' : 'ASIA DIRECT',
      highlight: false
    }
  ];

  const filteredRoutes = activeCategory === 'all' 
    ? baseRoutes 
    : baseRoutes.filter((r) => r.category === activeCategory);

  const handleRouteAction = (routeName: string) => {
    if (onRequestRouteQuote) {
      onRequestRouteQuote(routeName);
    } else {
      const el = document.getElementById('management-contacts-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'europe':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/40';
      case 'china':
        return 'bg-orange-500/15 text-orange-400 border-orange-500/40';
      case 'iran':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-orange-500/15 text-orange-400 border-orange-500/40';
    }
  };

  // Live Border Checkpoints Monitor data
  const checkpointsData = [
    {
      name: lang === 'ru' ? 'КПП «Верхний Ларс»' : 'Upper Lars Checkpoint',
      route: lang === 'ru' ? 'Россия — Грузия (Главный коридор)' : 'Russia — Georgia (Main Corridor)',
      status: lang === 'ru' ? 'ДВИЖЕНИЕ ОТКРЫТО • ШТАТНЫЙ РЕЖИМ' : 'TRAFFIC OPEN • NORMAL OPS',
      statusType: 'normal',
      weather: lang === 'ru' ? '+14°C, без осадков' : '+14°C, dry',
      queue: lang === 'ru' ? 'Электронная очередь ~ 4-8 ч' : 'E-queue ~ 4-8 hrs',
    },
    {
      name: lang === 'ru' ? 'КПП «Баграташен — Садахло»' : 'Bagratashen — Sadakhlo CP',
      route: lang === 'ru' ? 'Армения — Грузия' : 'Armenia — Georgia',
      status: lang === 'ru' ? 'РАБОТАЕТ 24/7 • БЕЗ ЗАДЕРЖЕК' : 'OPEN 24/7 • NO DELAYS',
      statusType: 'success',
      weather: lang === 'ru' ? '+22°C, ясно' : '+22°C, clear',
      queue: lang === 'ru' ? 'Минимальное время пропуска' : 'Minimal wait time',
    },
    {
      name: lang === 'ru' ? 'КПП «Мегри — Нордуз»' : 'Meghri — Norduz CP',
      route: lang === 'ru' ? 'Армения — Иран (Южный коридор)' : 'Armenia — Iran (South Corridor)',
      status: lang === 'ru' ? 'КРУГЛОСУТОЧНО • ТЕРМОКОНТРОЛЬ' : 'ROUND-THE-CLOCK • REEFERS ACTIVE',
      statusType: 'success',
      weather: lang === 'ru' ? '+26°C, ясно' : '+26°C, clear',
      queue: lang === 'ru' ? 'Прямой пропуск TIR' : 'Direct TIR clearance',
    },
  ];

  return (
    <section id="geography" className="relative py-20 sm:py-28 border-t border-white/10 overflow-hidden bg-[#08090b]">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none industrial-grid" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 mb-3">
            <Globe className="h-3.5 w-3.5 text-orange-400" />
            <span className="font-mono text-xs font-bold text-orange-400 uppercase tracking-widest">
              {lang === 'ru' ? 'ТРАНСПОРТНЫЕ КОРИДОРЫ' : 'TRANSPORT CORRIDORS'}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {lang === 'ru' ? 'ГЕОГРАФИЯ И' : 'GEOGRAPHY &'} <span className="text-orange-500">{lang === 'ru' ? 'МАРШРУТЫ' : 'ROUTES'}</span>
          </h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4" />
          <p className="text-sm sm:text-base text-[#bbb] mt-5 leading-relaxed font-light">
            {lang === 'ru' 
              ? 'Регулярные международные грузовые коридоры между Арменией, Россией, странами СНГ, Ираном, Китаем и Европой. Прямое экспедирование и собственный подвижной состав.' 
              : 'Regular international cargo corridors between Armenia, Russia, CIS nations, Iran, China, and Europe with direct fleet dispatch.'}
          </p>

          {/* Interactive Industrial Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8" id="geography-filter-tabs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer border flex items-center space-x-2 ${
                activeCategory === 'all'
                  ? 'bg-orange-500 text-black border-orange-400 shadow-lg shadow-orange-950/50 font-extrabold'
                  : 'bg-[#111318] text-[#aaa] border-white/15 hover:text-white hover:border-orange-500/50'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>{lang === 'ru' ? 'Все направления' : 'All Routes'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 ${activeCategory === 'all' ? 'bg-black/30 text-white' : 'bg-white/10 text-orange-400'}`}>
                {baseRoutes.length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('cis')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer border flex items-center space-x-2 ${
                activeCategory === 'cis'
                  ? 'bg-orange-500 text-black border-orange-400 shadow-lg shadow-orange-950/50 font-extrabold'
                  : 'bg-[#111318] text-[#aaa] border-white/15 hover:text-white hover:border-orange-500/50'
              }`}
            >
              <span>{lang === 'ru' ? 'Россия и СНГ' : 'Russia & CIS'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 ${activeCategory === 'cis' ? 'bg-black/30 text-white' : 'bg-white/10 text-orange-400'}`}>
                {baseRoutes.filter((r) => r.category === 'cis').length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('iran')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer border flex items-center space-x-2 ${
                activeCategory === 'iran'
                  ? 'bg-orange-500 text-black border-orange-400 shadow-lg shadow-orange-950/50 font-extrabold'
                  : 'bg-[#111318] text-[#aaa] border-white/15 hover:text-white hover:border-orange-500/50'
              }`}
            >
              <span>{lang === 'ru' ? 'Иран и Ближний Восток' : 'Iran & Middle East'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 ${activeCategory === 'iran' ? 'bg-black/30 text-white' : 'bg-white/10 text-orange-400'}`}>
                {baseRoutes.filter((r) => r.category === 'iran').length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('europe')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer border flex items-center space-x-2 ${
                activeCategory === 'europe'
                  ? 'bg-orange-500 text-black border-orange-400 shadow-lg shadow-orange-950/50 font-extrabold'
                  : 'bg-[#111318] text-[#aaa] border-white/15 hover:text-white hover:border-orange-500/50'
              }`}
            >
              <span>{lang === 'ru' ? 'Европа (ЕС)' : 'Europe'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 ${activeCategory === 'europe' ? 'bg-black/30 text-white' : 'bg-white/10 text-orange-400'}`}>
                {baseRoutes.filter((r) => r.category === 'europe').length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('china')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer border flex items-center space-x-2 ${
                activeCategory === 'china'
                  ? 'bg-orange-500 text-black border-orange-400 shadow-lg shadow-orange-950/50 font-extrabold'
                  : 'bg-[#111318] text-[#aaa] border-white/15 hover:text-white hover:border-orange-500/50'
              }`}
            >
              <span>{lang === 'ru' ? 'Китай и Азия' : 'China & Asia'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 ${activeCategory === 'china' ? 'bg-black/30 text-white' : 'bg-white/10 text-orange-400'}`}>
                {baseRoutes.filter((r) => r.category === 'china').length}
              </span>
            </button>
          </div>
        </div>

        {/* Interactive Logistics Map from Armenia Hub */}
        <div className="mb-14">
          <LogisticsMap
            selectedCategory={GRID_TO_MAP_CATEGORY[activeCategory]}
            onSelectRoute={(routeName) => handleRouteAction(routeName)}
          />
        </div>

        {/* Live Border Checkpoints Status Monitor */}
        <div className="mb-12 bg-[#111318] border-2 border-white/15 p-6 sm:p-8 shadow-2xl relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 bg-emerald-500 rounded-none animate-pulse shrink-0" />
              <div>
                <span className="font-mono text-xs font-bold text-orange-400 uppercase tracking-widest block">
                  {lang === 'ru' ? 'ОПЕРАТИВНЫЙ МОНИТОРИНГ ГРАНИЦ И КПП' : 'LIVE BORDER CHECKPOINT MONITOR'}
                </span>
                <span className="text-[11px] text-[#aaa] font-mono">
                  {lang === 'ru' ? 'Актуальный статус транзитных узлов в режиме реального времени' : 'Real-time border transit status & operational conditions'}
                </span>
              </div>
            </div>
            <div className="inline-flex items-center space-x-2 font-mono text-[10px] text-[#888] bg-black/40 px-3 py-1.5 border border-white/10">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span>{lang === 'ru' ? 'Диспетчерская служба 24/7' : 'Dispatch Control 24/7'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {checkpointsData.map((cp, idx) => (
              <div key={idx} className="bg-black/40 border border-white/10 p-4 space-y-3 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white uppercase">{cp.name}</h4>
                    <p className="text-[10px] text-orange-400 font-mono font-bold mt-0.5">{cp.route}</p>
                  </div>
                  <span className="h-2 w-2 bg-emerald-400 rounded-full animate-ping" />
                </div>

                <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs font-mono">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[11px]">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>{cp.status}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#aaa] pt-1">
                    <span>{lang === 'ru' ? 'Очередь:' : 'Queue:'} <strong className="text-white">{cp.queue}</strong></span>
                    <span>{cp.weather}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Routes Industrial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="geography-routes-grid">
          {filteredRoutes.map((route) => (
            <div 
              key={route.id}
              className={`bg-[#111318] hover:bg-[#161922] p-6 sm:p-7 border ${
                route.highlight ? 'border-orange-500' : 'border-white/15 hover:border-orange-500'
              } flex flex-col justify-between group transition-all duration-200 relative overflow-hidden shadow-xl`}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />

              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border ${getBadgeStyle(route.category)}`}>
                    {route.badge}
                  </span>
                  <span className="text-[10px] font-mono text-orange-400 font-bold px-2 py-0.5 bg-orange-500/10 border border-orange-500/30 flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-orange-400" />
                    {route.time}
                  </span>
                </div>

                {/* From / To Points */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-start space-x-2.5">
                    <MapPin className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] font-mono text-[#777] uppercase block tracking-wider font-bold">
                        {lang === 'ru' ? 'Откуда:' : 'Origin:'}
                      </span>
                      <strong className="text-sm font-serif text-white font-bold uppercase leading-snug block">
                        {route.from}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] font-mono text-[#777] uppercase block tracking-wider font-bold">
                        {lang === 'ru' ? 'Куда:' : 'Destination:'}
                      </span>
                      <strong className="text-sm font-serif text-white font-bold uppercase leading-snug block">
                        {route.to}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Transport & Distance Details */}
                <div className="bg-black/40 border border-white/10 p-3.5 space-y-2 text-xs font-mono mb-4">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#777] uppercase font-bold">{lang === 'ru' ? 'Расстояние:' : 'Distance:'}</span>
                    <span className="text-white font-bold">{route.distance}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#777] uppercase font-bold">{lang === 'ru' ? 'Частота:' : 'Frequency:'}</span>
                    <span className="text-orange-400 font-extrabold">{route.frequency}</span>
                  </div>
                  <div className="flex items-start space-x-1.5 text-[11px] text-[#ccc] pt-1 border-t border-white/5">
                    <Truck className="h-3.5 w-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="leading-tight">{route.type}</span>
                  </div>
                  <div className="flex items-start space-x-1.5 text-[10px] text-amber-300 pt-1">
                    <FileCheck2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{route.customs}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  onClick={() => handleRouteAction(`${route.from} → ${route.to}`)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black py-2.5 px-3 text-xs font-mono font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 transition cursor-pointer shadow-md"
                >
                  <span>{lang === 'ru' ? 'Заказать этот рейс' : 'Book This Route'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#888] pt-1">
                  <span>{route.checkpoints}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 bg-[#111318] p-6 sm:p-8 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 flex items-center justify-center bg-orange-500/10 border border-orange-500/30 text-orange-400 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-white uppercase">
                {lang === 'ru' ? 'Индивидуальные и проектные маршруты' : 'Custom & Project Logistics'}
              </h4>
              <p className="text-xs text-[#aaa] font-mono mt-0.5">
                {lang === 'ru' 
                  ? 'Нужен нестандартный маршрут или негабаритный груз? Рассчитаем специальный тариф с учетом разрешений за 15 минут.' 
                  : 'Need a custom route or out-of-gauge transport? We calculate tailored tariffs including road permits in 15 minutes.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://t.me/+37499902007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white/5 hover:bg-orange-500 hover:text-black border border-white/15 text-orange-400 px-4 py-2.5 text-xs font-mono font-bold uppercase transition"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Telegram</span>
            </a>
            <a
              href="tel:+37494902007"
              className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-black px-4 py-2.5 text-xs font-mono font-extrabold uppercase tracking-wider transition"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>{lang === 'ru' ? 'Директор (+374 94 902007)' : 'CEO (+374 94 902007)'}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
