import React, { useState } from 'react';
import { 
  Truck, 
  ThermometerSnowflake, 
  Boxes, 
  Check, 
  Gauge, 
  ShieldCheck, 
  Users, 
  Flame, 
  Zap, 
  Layers, 
  ArrowRight,
  Maximize2,
  Navigation,
  Compass,
  FileCheck2,
  PhoneCall,
  Send
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FleetSection() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'tent' | 'ref' | 'heavy' | 'container'>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const fleetData = [
    {
      id: 'tent-standard',
      category: 'tent',
      title: lang === 'ru' ? 'Еврофура Тент / Штора 86-92 м³' : 'Standard Euro Tautliner 86-92 m³',
      subtitle: lang === 'ru' ? 'Тягачи Scania, MAN, Mercedes-Benz Euro-5/6' : 'Scania, MAN, Mercedes-Benz Euro-5/6 Trucks',
      capacity: lang === 'ru' ? 'до 22 тонн / 86–92 м³ / 33 европаллеты' : 'up to 22 tons / 86-92 m³ / 33 Euro pallets',
      dimensions: '13.60 м × 2.48 м × 2.70 м',
      loadingTypes: lang === 'ru' ? 'Задняя, боковая (сдвижная штора), верхняя (краном)' : 'Rear, full side curtain, top crane loading',
      icon: Truck,
      highlight: lang === 'ru' ? 'ОСНОВНОЙ ПАРК' : 'PRIMARY FLEET',
      specs: [
        lang === 'ru' ? 'Полезный объем: 86–92 м³, вместимость 33 европаллеты' : 'Usable volume: 86-92 m³, 33 Euro-pallets capacity',
        lang === 'ru' ? 'Полная растентовка со снятием стоек для негабаритных грузов' : 'Full roof and curtain slide with pillar removal',
        lang === 'ru' ? 'Крепеж: 24 стяжных ремня (500 daN), коники, противоскользящие маты' : 'Securing: 24 ratchet tie-downs (500 daN), anti-slip mats',
        lang === 'ru' ? 'Спутниковый GPS-мониторинг и датчики расхода топлива 24/7' : '24/7 GPS satellite tracking and telematics'
      ]
    },
    {
      id: 'tent-mega',
      category: 'tent',
      title: lang === 'ru' ? 'Автопоезд Mega / Сцепка 100-120 м³' : 'Mega Road Train / High-Cube 100-120 m³',
      subtitle: lang === 'ru' ? 'Повышенная кубатура для легких и объемных грузов' : 'Increased cubic volume for lightweight cargo',
      capacity: lang === 'ru' ? 'до 20 тонн / 100–120 м³ / до 38 паллет' : 'up to 20 tons / 100-120 m³ / up to 38 pallets',
      dimensions: '13.60 м × 2.48 м × 3.00 м (или сцепка 8м + 8м)',
      loadingTypes: lang === 'ru' ? 'Трехсторонняя растентовка, подъемная крыша' : '3-way curtain slider, hydraulic lifting roof',
      icon: Boxes,
      highlight: lang === 'ru' ? 'МАКСИМУМ ОБЪЕМА' : 'MAX CUBIC VOLUME',
      specs: [
        lang === 'ru' ? 'Внутренняя высота 3.00 м — подходит для промышленного оборудования и упаковки' : 'Internal height 3.00 m — ideal for tall industrial units',
        lang === 'ru' ? 'Снижение стоимости перевозки 1 м³ груза до 20%' : 'Reduces per-cubic-meter transportation cost up to 20%',
        lang === 'ru' ? 'Пневматическая подвеска для бережной транспортировки' : 'Full air-ride suspension for gentle transport',
        lang === 'ru' ? 'TIR Carnet и ЕАЭС допуск' : 'TIR Carnet & EAEU international transit certificate'
      ]
    },
    {
      id: 'ref-standard',
      category: 'ref',
      title: lang === 'ru' ? 'Рефрижератор FRC (-20°C ... +12°C)' : 'Refrigerated Trailer FRC (-20°C ... +12°C)',
      subtitle: lang === 'ru' ? 'Установки Thermo King / Carrier с термописцами' : 'Thermo King / Carrier units with live data loggers',
      capacity: lang === 'ru' ? 'до 22 тонн / 86 м³ / 33 паллеты' : 'up to 22 tons / 86 m³ / 33 Euro pallets',
      dimensions: '13.40 м × 2.46 м × 2.60 м',
      loadingTypes: lang === 'ru' ? 'Задняя погрузка (рампа / пандус), герметичный портал' : 'Rear ramp/dock sealed loading',
      icon: ThermometerSnowflake,
      highlight: lang === 'ru' ? 'ТЕРМОКОНТРОЛЬ FRC' : 'COLD CHAIN FRC',
      specs: [
        lang === 'ru' ? 'Точная поддержка заданной температуры с погрешностью ±0.5°C' : 'Exact temperature holding within ±0.5°C precision',
        lang === 'ru' ? 'Электронные термописцы с распечаткой температурного чека при выгрузке' : 'Digital data logger with printed temperature receipt upon delivery',
        lang === 'ru' ? 'Санитарный паспорт и регулярная дезинфекция кузова' : 'Certified food & pharmaceutical hygiene compliance',
        lang === 'ru' ? 'Перевозка фруктов, медикаментов, мяса, рыбы, шоколада' : 'Fresh fruits, vegetables, meat, fish, pharmaceuticals, wine'
      ]
    },
    {
      id: 'ref-multitemp',
      category: 'ref',
      title: lang === 'ru' ? 'Двухкамерный Рефрижератор (Bi-Temp)' : 'Multi-Temperature Refrigerator (Bi-Temp)',
      subtitle: lang === 'ru' ? 'Два независимых климатических отсека с перегородкой' : 'Dual isolated climate zones with movable bulkhead',
      capacity: lang === 'ru' ? 'до 21 тонны / 84 м³ / мультизона' : 'up to 21 tons / 84 m³ / dual zones',
      dimensions: '13.40 м × 2.46 м × 2.60 м',
      loadingTypes: lang === 'ru' ? 'Задняя рампа с раздельной фиксацией отсеков' : 'Rear dock sealed loading with separated chambers',
      icon: ThermometerSnowflake,
      highlight: lang === 'ru' ? 'ДВА ТЕМП. РЕЖИМА' : 'DUAL CLIMATE ZONES',
      specs: [
        lang === 'ru' ? 'Одновременная перевозка заморозки (-18°C) и охлажденной продукции (+4°C)' : 'Simultaneous frozen (-18°C) and chilled (+4°C) delivery',
        lang === 'ru' ? 'Съемная термоизоляционная перегородка' : 'Insulated movable thermal barrier divider',
        lang === 'ru' ? 'Автономная работа холодильной установки до 72 часов' : 'Autonomous cooling diesel engine up to 72 hours run',
        lang === 'ru' ? 'Круглосуточный телеметрический контроль температуры' : '24/7 online temperature telematics'
      ]
    },
    {
      id: 'heavy-lowbed',
      category: 'heavy',
      title: lang === 'ru' ? 'Низкорамный Трал / Негабарит (до 60т)' : 'Heavy Lowbed Trailer / Oversized (up to 60t)',
      subtitle: lang === 'ru' ? 'Экспедирование и доставка КТГ и спецтехники' : 'Heavy machinery & out-of-gauge engineering transport',
      capacity: lang === 'ru' ? 'до 45–60 тонн / длина площадки до 21 м' : 'up to 45-60 tons / bed length up to 21 m',
      dimensions: lang === 'ru' ? 'Погрузочная высота 0.60–0.90 м, уширители до 3.20 м' : 'Loading height 0.60-0.90 m, outriggers to 3.20 m',
      loadingTypes: lang === 'ru' ? 'Передний и задний заезд (гидроаппарели), кран' : 'Hydraulic front & rear detachable gooseneck ramps',
      icon: Gauge,
      highlight: lang === 'ru' ? 'СПЕЦТРАНСПОРТ' : 'HEAVY HAULAGE',
      specs: [
        lang === 'ru' ? 'Транспортировка экскаваторов, буровых, трансформаторов, станков' : 'Excavators, crushers, heavy transformers, industrial plants',
        lang === 'ru' ? 'Разработка спецпроектов, получение разрешений на проезд по РФ, РА, Грузии' : 'Road route survey, heavy transport permits across CIS & Armenia',
        lang === 'ru' ? 'Организация машин прикрытия и сопровождения ГИБДД/Дорожной полиции' : 'Pilot car escort and traffic police convoy management',
        lang === 'ru' ? 'Усиленные крепежные цепи класса G80/G100 и талрепы' : 'High-grade G80/G100 heavy load chains and turnbuckles'
      ]
    },
    {
      id: 'container-platform',
      category: 'container',
      title: lang === 'ru' ? 'Контейнеровоз (20ft, 40ft, 40HQ)' : 'Container Chassis (20ft, 40ft, 40HQ)',
      subtitle: lang === 'ru' ? 'Вывоз из портов Поти, Батуми, Новороссийск, Бендер-Аббас' : 'Drayage from Poti, Batumi, Novorossiysk, Bandar Abbas',
      capacity: lang === 'ru' ? 'до 28 тонн / 1x40HQ или 2x20ft' : 'up to 28 tons / 1x40HQ or 2x20ft',
      dimensions: '12.60 м × 2.50 м (стандартные фитинги ISO)',
      loadingTypes: lang === 'ru' ? 'Портовые и терминальные контейнерные краны / ричстакеры' : 'Port & rail container spreaders and reach stackers',
      icon: Boxes,
      highlight: lang === 'ru' ? 'МУЛЬТИМОДАЛ' : 'INTERMODAL',
      specs: [
        lang === 'ru' ? 'Прямой вывоз морских контейнеров из черноморских и иранских портов' : 'Direct sea container drayage from Black Sea and Persian Gulf ports',
        lang === 'ru' ? 'Усиленная трехосная пневмоподвеска Saf / BPW' : 'Heavy-duty tri-axle Saf / BPW air suspension',
        lang === 'ru' ? 'Пломбирование и таможенное сопровождение до склада заказчика' : 'Sealed customs transit directly to client warehouse door',
        lang === 'ru' ? 'Возможность подключения рефрижераторных контейнеров (GenSet)' : 'Reefer container power generator (GenSet equipped)'
      ]
    }
  ];

  const filteredFleet = activeCategory === 'all' 
    ? fleetData 
    : fleetData.filter((v) => v.category === activeCategory);

  const handleFleetInquiry = (vehicleName: string) => {
    const text = encodeURIComponent(`Здравствуйте! Интересует заказ транспорта: ${vehicleName}. Прошу уточнить наличие и ставку.`);
    window.open(`https://t.me/+37499902007?text=${text}`, '_blank');
  };

  return (
    <section id="fleet" className="relative py-20 sm:py-28 border-t border-white/10 overflow-hidden bg-[#0a0c10]">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none industrial-grid" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[400px] bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 mb-3">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            <span className="font-mono text-xs font-bold text-orange-400 uppercase tracking-widest">
              {lang === 'ru' ? 'ПОДВИЖНОЙ СОСТАВ И ТЕХНИКА' : 'ROLLING STOCK & FLEET'}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {lang === 'ru' ? 'АВТОПАРК И' : 'VEHICLE FLEET &'} <span className="text-orange-500">{lang === 'ru' ? 'СПЕЦИФИКАЦИИ' : 'SPECIFICATIONS'}</span>
          </h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4" />
          <p className="text-sm sm:text-base text-[#bbb] mt-5 leading-relaxed font-light">
            {lang === 'ru' 
              ? 'Современные магистральные автопоезда стандартов Euro-5 и Euro-6. Собственная техническая база, строгий регламент ТО и 100% готовность к международным рейсам.' 
              : 'Modern heavy-duty Euro-5 and Euro-6 long-haul trucks. Certified in-house maintenance, continuous telematics and 100% readiness for international corridors.'}
          </p>

          {/* Interactive Fleet Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8" id="fleet-filter-tabs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition cursor-pointer border flex items-center space-x-2 ${
                activeCategory === 'all'
                  ? 'bg-orange-500 text-black border-orange-400 font-extrabold shadow-lg shadow-orange-950/50'
                  : 'bg-[#111318] text-[#aaa] border-white/15 hover:text-white hover:border-orange-500/50'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>{lang === 'ru' ? 'Все типы техники' : 'All Fleet'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 ${activeCategory === 'all' ? 'bg-black/30 text-white' : 'bg-white/10 text-orange-400'}`}>
                {fleetData.length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('tent')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition cursor-pointer border flex items-center space-x-2 ${
                activeCategory === 'tent'
                  ? 'bg-orange-500 text-black border-orange-400 font-extrabold shadow-lg shadow-orange-950/50'
                  : 'bg-[#111318] text-[#aaa] border-white/15 hover:text-white hover:border-orange-500/50'
              }`}
            >
              <Truck className="h-3.5 w-3.5" />
              <span>{lang === 'ru' ? 'Евротенты и Шторы' : 'Tautliners & Mega'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 ${activeCategory === 'tent' ? 'bg-black/30 text-white' : 'bg-white/10 text-orange-400'}`}>
                {fleetData.filter((f) => f.category === 'tent').length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('ref')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition cursor-pointer border flex items-center space-x-2 ${
                activeCategory === 'ref'
                  ? 'bg-orange-500 text-black border-orange-400 font-extrabold shadow-lg shadow-orange-950/50'
                  : 'bg-[#111318] text-[#aaa] border-white/15 hover:text-white hover:border-orange-500/50'
              }`}
            >
              <ThermometerSnowflake className="h-3.5 w-3.5" />
              <span>{lang === 'ru' ? 'Рефрижераторы (-20°C)' : 'Reefers FRC'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 ${activeCategory === 'ref' ? 'bg-black/30 text-white' : 'bg-white/10 text-orange-400'}`}>
                {fleetData.filter((f) => f.category === 'ref').length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('heavy')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition cursor-pointer border flex items-center space-x-2 ${
                activeCategory === 'heavy'
                  ? 'bg-orange-500 text-black border-orange-400 font-extrabold shadow-lg shadow-orange-950/50'
                  : 'bg-[#111318] text-[#aaa] border-white/15 hover:text-white hover:border-orange-500/50'
              }`}
            >
              <Gauge className="h-3.5 w-3.5" />
              <span>{lang === 'ru' ? 'Тралы и Негабарит' : 'Lowbed / Heavy'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 ${activeCategory === 'heavy' ? 'bg-black/30 text-white' : 'bg-white/10 text-orange-400'}`}>
                {fleetData.filter((f) => f.category === 'heavy').length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('container')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition cursor-pointer border flex items-center space-x-2 ${
                activeCategory === 'container'
                  ? 'bg-orange-500 text-black border-orange-400 font-extrabold shadow-lg shadow-orange-950/50'
                  : 'bg-[#111318] text-[#aaa] border-white/15 hover:text-white hover:border-orange-500/50'
              }`}
            >
              <Boxes className="h-3.5 w-3.5" />
              <span>{lang === 'ru' ? 'Контейнеровозы' : 'Chassis 40HQ'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 ${activeCategory === 'container' ? 'bg-black/30 text-white' : 'bg-white/10 text-orange-400'}`}>
                {fleetData.filter((f) => f.category === 'container').length}
              </span>
            </button>
          </div>
        </div>

        {/* Fleet Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="bg-[#111318] hover:bg-[#161922] p-8 border border-white/15 hover:border-orange-500 flex flex-col justify-between group transition-all duration-200 shadow-xl relative overflow-hidden"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-orange-500" />

                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-5">
                    <div className="h-14 w-14 flex items-center justify-center bg-orange-500/10 border border-orange-500/30 text-orange-400 group-hover:bg-orange-500 group-hover:text-black transition-colors">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider px-2.5 py-1 bg-amber-500/10 border border-amber-500/30">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold uppercase text-white mb-1.5 leading-snug group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-orange-400 font-mono font-semibold mb-4 uppercase">
                    {item.subtitle}
                  </p>

                  {/* Primary Metrics */}
                  <div className="bg-black/40 border border-white/10 p-4 mb-4 text-xs font-mono space-y-2">
                    <div>
                      <span className="text-[#888] block text-[9px] uppercase tracking-wider mb-0.5 font-bold">
                        {lang === 'ru' ? 'ГРУЗОПОДЪЕМНОСТЬ И ОБЪЕМ:' : 'PAYLOAD & VOLUME:'}
                      </span>
                      <strong className="text-white text-sm font-bold block">{item.capacity}</strong>
                    </div>
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                      <span className="text-[#888] uppercase font-bold">{lang === 'ru' ? 'Габариты (Д×Ш×В):' : 'Dimensions (L×W×H):'}</span>
                      <span className="text-orange-400 font-bold">{item.dimensions}</span>
                    </div>
                    <div className="pt-1 text-[10px] text-[#aaa]">
                      <span className="text-[#888] block font-bold uppercase">{lang === 'ru' ? 'Тип погрузки:' : 'Loading types:'}</span>
                      <span>{item.loadingTypes}</span>
                    </div>
                  </div>

                  {/* Bullet Specs */}
                  <div className="space-y-2.5 my-5">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start space-x-2.5 text-xs text-[#bbb] font-mono leading-relaxed">
                        <Check className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 1-Click Fleet Booking Button */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <button
                    onClick={() => handleFleetInquiry(item.title)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-black py-3 px-4 text-xs font-mono font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 transition cursor-pointer shadow-lg"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{lang === 'ru' ? 'Запросить расчет ставки' : 'Request Vehicle Rate'}</span>
                  </button>

                  <div className="flex items-center justify-between text-[10px] text-[#777] font-mono uppercase font-bold">
                    <span>{lang === 'ru' ? 'Стандарт: Euro-5 / Euro-6' : 'Standard: Euro-5 / Euro-6'}</span>
                    <span className="text-emerald-400">{lang === 'ru' ? '● В наличии на линии' : '● Active in Fleet'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fleet Maintenance & Telematics Industrial Specs */}
        <div className="mt-12 bg-[#111318] p-6 sm:p-8 border border-white/15 grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-xl">
          <div className="space-y-2 p-2">
            <Gauge className="h-7 w-7 text-orange-400 mx-auto" />
            <h4 className="font-serif text-lg text-white font-bold uppercase">
              {lang === 'ru' ? 'Регламентное ТО каждые 30 000 км' : 'Strict Maintenance Every 30k km'}
            </h4>
            <p className="text-xs text-[#888] font-light leading-relaxed">
              {lang === 'ru' 
                ? 'Собственная ремонтная база в Ереване, оригинальные запчасти и предрейсовый инструментальный контроль каждого тягача.' 
                : 'Certified in-house service depot in Yerevan with original manufacturer parts and pre-trip mechanical inspections.'}
            </p>
          </div>
          <div className="space-y-2 p-2 pt-6 md:pt-2">
            <ShieldCheck className="h-7 w-7 text-amber-400 mx-auto" />
            <h4 className="font-serif text-lg text-white font-bold uppercase">
              {lang === 'ru' ? 'GPS и Онлайн-Термометрия' : '24/7 GPS & Cold-Chain Telematics'}
            </h4>
            <p className="text-xs text-[#888] font-light leading-relaxed">
              {lang === 'ru' 
                ? 'Спутниковое отслеживание местоположения, датчики открывания дверей и постоянная трансляция температуры в кузове.' 
                : 'Live satellite tracking, door tamper sensors, and real-time cold-chain temperature telemetry transmitted to client.'}
            </p>
          </div>
          <div className="space-y-2 p-2 pt-6 md:pt-2">
            <Users className="h-7 w-7 text-orange-400 mx-auto" />
            <h4 className="font-serif text-lg text-white font-bold uppercase">
              {lang === 'ru' ? 'Водители международного класса' : 'Certified International Drivers'}
            </h4>
            <p className="text-xs text-[#888] font-light leading-relaxed">
              {lang === 'ru' 
                ? 'Стаж водителей от 10 лет на горных серпантинах и зимних трассах СНГ. Наличие виз, медкнижек и сертификатов ADR.' 
                : 'Minimum 10+ years highway experience across mountain passes and harsh winter routes. Full ADR & health certifications.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
