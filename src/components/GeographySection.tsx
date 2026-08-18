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
  Send,
  MessageCircle,
  PhoneCall,
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

  const t3 = (ru: string, en: string, hy: string) => (lang === 'ru' ? ru : lang === 'hy' ? hy : en);

  const baseRoutes = [
    {
      id: 'yerevan-moscow',
      category: 'cis',
      from: t3('Ереван (Армения)', 'Yerevan (Armenia)', 'Երևան (Հայաստան)'),
      to: t3('Москва / Санкт-Петербург (Россия)', 'Moscow / St. Petersburg (Russia)', 'Մոսկվա / Սանկտ Պետերբուրգ (Ռուսաստան)'),
      distance: '~2,250 км',
      time: t3('Индивидуально', 'On Request', 'Անհատական'),
      checkpoints: t3('КПП Баграташен → КПП Верхний Ларс', 'Bagratashen CP → Upper Lars CP', 'Բագրատաշեն ԱԿԿ → Վերին Լարս ԱԿԿ'),
      type: t3('Евротенты (86-120 м³), Рефрижераторы (-20°C...+12°C)', 'Tautliners (86-120 m³), Reefers (-20°C...+12°C)', 'Եվրոթենտեր (86-120 մ³), սառնարաններ (-20°C...+12°C)'),
      frequency: t3('Ежедневно (собственный парк)', 'Daily departures', 'Ամեն օր (սեփական ավտոպարկ)'),
      customs: t3('Таможенный союз ЕАЭС (упрощенное оформление)', 'EAEU Customs Union simplified transit', 'ԵԱՏՄ մաքսային միություն (պարզեցված ձևակերպում)'),
      badge: t3('ГЛАВНЫЙ КОРИДОР', 'PRIMARY CORRIDOR', 'ԳԼԽԱՎՈՐ ՄԻՋԱՆՑՔ'),
      highlight: true
    },
    {
      id: 'yerevan-iran',
      category: 'iran',
      from: t3('Тегеран / Бендер-Аббас (Иран)', 'Tehran / Bandar Abbas (Iran)', 'Թեհրան / Բենդեր-Աբբաս (Իրան)'),
      to: t3('Ереван (Армения) → Транзит в РФ', 'Yerevan (Armenia) → Transit to CIS', 'Երևան (Հայաստան) → Տարանցում ՌԴ'),
      distance: '~1,850 км',
      time: t3('Индивидуально', 'On Request', 'Անհատական'),
      checkpoints: t3('КПП Мегри — Нордуз', 'Meghri — Norduz Checkpoint', 'Մեղրի — Նորդուզ ԱԿԿ'),
      type: t3('Тенты, Контейнеровозы, Рефы', 'Tents, Container carriers, Reefers', 'Թենտեր, կոնտեյներատարներ, սառնարաններ'),
      frequency: t3('3–4 раза в неделю', '3–4 times / week', '3–4 անգամ շաբաթական'),
      customs: t3('TIR Carnet / Прямая растаможка', 'TIR Carnet / Direct Customs clearance', 'TIR Carnet / Ուղիղ մաքսազերծում'),
      badge: t3('МЕЖДУНАРОДНЫЙ ХАБ', 'INTERNATIONAL HUB', 'ՄԻՋԱԶԳԱՅԻՆ ՀԱԲ'),
      highlight: false
    },
    {
      id: 'yerevan-georgia',
      category: 'cis',
      from: t3('Тбилиси / Поти / Батуми (Грузия)', 'Tbilisi / Poti / Batumi (Georgia)', 'Թբիլիսի / Փոթի / Բաթումի (Վրաստան)'),
      to: t3('Ереван (Армения)', 'Yerevan (Armenia)', 'Երևան (Հայաստան)'),
      distance: '~280–450 км',
      time: t3('Индивидуально', 'On Request', 'Անհատական'),
      checkpoints: t3('КПП Садахло — Баграташен / Гугути', 'Sadakhlo — Bagratashen CP', 'Սադախլո — Բագրատաշեն ԱԿԿ / Գուգուտի'),
      type: t3('Еврофуры, Контейнерные площадки', 'Euro trucks, Container platforms', 'Եվրոբեռնատարներ, կոնտեյներային հարթակներ'),
      frequency: t3('Ежедневно', 'Daily', 'Ամեն օր'),
      customs: t3('Транзитная декларация T1 / CMR', 'Transit T1 / CMR Declaration', 'Տարանցիկ հայտարարագիր T1 / CMR'),
      badge: t3('ПРЯМОЙ ТРАНЗИТ', 'DIRECT TRANSIT', 'ՈՒՂԻՂ ՏԱՐԱՆՑՈՒՄ'),
      highlight: false
    },
    {
      id: 'yerevan-krasnodar',
      category: 'cis',
      from: t3('Краснодар / Ростов-на-Дону (ЮФО РФ)', 'Krasnodar / Rostov-on-Don (Russia)', 'Կրասնոդար / Ռոստով-Դոնի (Հարավային ՌԴ)'),
      to: t3('Ереван (Армения)', 'Yerevan (Armenia)', 'Երևան (Հայաստան)'),
      distance: '~1,150 км',
      time: t3('Индивидуально', 'On Request', 'Անհատական'),
      checkpoints: t3('КПП Верхний Ларс → КПП Баграташен', 'Upper Lars CP → Bagratashen', 'Վերին Լարս ԱԿԿ → Բագրատաշեն ԱԿԿ'),
      type: t3('Тенты, Рефы, Сборные грузы', 'Tents, Reefers, Groupage cargo', 'Թենտեր, սառնարաններ, հավաքական բեռներ'),
      frequency: t3('Регулярно', 'Regular', 'Կանոնավոր'),
      customs: t3('ЕАЭС оформление', 'EAEU processing', 'ԵԱՏՄ ձևակերպում'),
      badge: t3('РЕГУЛЯРНЫЙ РЕЙС', 'SCHEDULED ROUTE', 'ԿԱՆՈՆԱՎՈՐ ԵՐԹ'),
      highlight: false
    },
    {
      id: 'europe-yerevan',
      category: 'europe',
      from: t3('Германия, Италия, Польша (ЕС)', 'Germany, Italy, Poland (EU)', 'Գերմանիա, Իտալիա, Լեհաստան (ԵՄ)'),
      to: t3('Транзит через Грузию → Армения', 'Transit via Georgia → Armenia', 'Տարանցում Վրաստանով → Հայաստան'),
      distance: '~3,600 км',
      time: t3('Индивидуально', 'On Request', 'Անհատական'),
      checkpoints: t3('ЕС Граница → Паром/Турция → Садахло', 'EU Border → Ferry/TR → Sadakhlo', 'ԵՄ սահման → Լաստանավ/Թուրքիա → Սադախլո'),
      type: t3('Еврофуры Mega (100 м³), Рефы, Негабарит', 'Mega trailers (100 m³), Reefers, Heavy', 'Եվրոբեռնատարներ Mega (100 մ³), սառնարաններ, հանելուկ բեռներ'),
      frequency: t3('По графику', 'On schedule', 'Ըստ գրաֆիկի'),
      customs: t3('T1, EX-1, TIR Carnet', 'T1, EX-1, TIR Carnet', 'T1, EX-1, TIR Carnet'),
      badge: t3('ЕВРОПА', 'EUROPE', 'ԵՎՐՈՊԱ'),
      highlight: false
    },
    {
      id: 'china-yerevan',
      category: 'china',
      from: t3('Китай (Урумчи, Иу, Гуанчжоу)', 'China (Urumqi, Yiwu, Guangzhou)', 'Չինաստան (Ուրումչի, Իվու, Գուանչժոու)'),
      to: t3('Казахстан → РФ → Армения', 'Kazakhstan → Russia → Armenia', 'Ղազախստան → ՌԴ → Հայաստան'),
      distance: '~5,800 км',
      time: t3('Индивидуально', 'On Request', 'Անհատական'),
      checkpoints: t3('КПП Хоргос / Достык → ЕАЭС', 'Khorgos CP → EAEU Transit', 'Խորգոս ԱԿԿ / Դոստիկ → ԵԱՏՄ'),
      type: t3('Контейнеры 40HQ, Автопоезда', '40HQ Containers, Road trains', 'Կոնտեյներներ 40HQ, ավտոշարասյուներ'),
      frequency: t3('Еженедельно', 'Weekly', 'Շաբաթական'),
      customs: t3('Полная таможенная очистка', 'Full customs clearance', 'Լիարժեք մաքսազերծում'),
      badge: t3('ПРЯМАЯ АЗИЯ', 'ASIA DIRECT', 'ՈՒՂԻՂ ԱՍԻԱ'),
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
              {t3('ТРАНСПОРТНЫЕ КОРИДОРЫ', 'TRANSPORT CORRIDORS', 'ՏՐԱՆՍՊՈՐՏԱՅԻՆ ՄԻՋԱՆՑՔՆԵՐ')}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {t3('ГЕОГРАФИЯ И', 'GEOGRAPHY &', 'ԱՇԽԱՐՀԱԳՐՈՒԹՅՈՒՆ ԵՎ')} <span className="text-orange-500">{t3('МАРШРУТЫ', 'ROUTES', 'ՈՒՂՂՈՒԹՅՈՒՆՆԵՐ')}</span>
          </h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4" />
          <p className="text-sm sm:text-base text-[#bbb] mt-5 leading-relaxed font-light">
            {t3(
              'Регулярные международные грузовые коридоры между Арменией, Россией, странами СНГ, Ираном, Китаем и Европой. Прямое экспедирование и собственный подвижной состав.',
              'Regular international cargo corridors between Armenia, Russia, CIS nations, Iran, China, and Europe with direct fleet dispatch.',
              'Կանոնավոր միջազգային բեռնային միջանցքներ Հայաստանի, Ռուսաստանի, ԱՊՀ երկրների, Իրանի, Չինաստանի և Եվրոպայի միջև։ Ուղիղ էքսպեդիտորական սպասարկում և սեփական շարժակազմ։'
            )}
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
              <span>{t3('Все направления', 'All Routes', 'Բոլոր ուղղությունները')}</span>
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
              <span>{t3('Россия и СНГ', 'Russia & CIS', 'Ռուսաստան և ԱՊՀ')}</span>
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
              <span>{t3('Иран и Ближний Восток', 'Iran & Middle East', 'Իրան և Մերձավոր Արևելք')}</span>
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
              <span>{t3('Европа (ЕС)', 'Europe', 'Եվրոպա (ԵՄ)')}</span>
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
              <span>{t3('Китай и Азия', 'China & Asia', 'Չինաստան և Ասիա')}</span>
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
                        {t3('Откуда:', 'Origin:', 'Որտեղից.')}
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
                        {t3('Куда:', 'Destination:', 'Ուր.')}
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
                    <span className="text-[#777] uppercase font-bold">{t3('Расстояние:', 'Distance:', 'Հեռավորություն.')}</span>
                    <span className="text-white font-bold">{route.distance}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#777] uppercase font-bold">{t3('Частота:', 'Frequency:', 'Հաճախականություն.')}</span>
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
                  <span>{t3('Заказать этот рейс', 'Book This Route', 'Պատվիրել այս երթը')}</span>
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
                {t3('Индивидуальные и проектные маршруты', 'Custom & Project Logistics', 'Անհատական և նախագծային երթուղիներ')}
              </h4>
              <p className="text-xs text-[#aaa] font-mono mt-0.5">
                {t3(
                  'Нужен нестандартный маршрут или негабаритный груз? Рассчитаем специальный тариф с учетом разрешений за 15 минут.',
                  'Need a custom route or out-of-gauge transport? We calculate tailored tariffs including road permits in 15 minutes.',
                  'Ձեզ անհրաժեշտ է ոչ ստանդարտ երթուղի կամ հանելուկ բեռ։ Կհաշվարկենք հատուկ սակագին՝ հաշվի առնելով թույլտվությունները, 15 րոպեում։'
                )}
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
              <span>{t3('Директор (+374 94 902007)', 'CEO (+374 94 902007)', 'Տնօրեն (+374 94 902007)')}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
