import React, { useState, useEffect } from 'react';
import { CITY_TERMINALS, FREIGHT_RATES, CARGO_TYPES } from '../data';
import { TransportMode, CityTerminal, FreightRate } from '../types';
import { Calculator as CalcIcon, Scale, Box, ArrowRightLeft, ShieldAlert, Leaf, Check, HelpCircle, CornerDownRight } from 'lucide-react';
import RoutePlanner from './RoutePlanner';

interface CalculatorProps {
  onPreFillBooking: (data: {
    origin: string;
    destination: string;
    weight: number;
    volume: number;
    cargoType: string;
    mode: TransportMode;
    price: number;
  }) => void;
  setActiveTab: (tab: string) => void;
}

export default function Calculator({ onPreFillBooking, setActiveTab }: CalculatorProps) {
  const [origin, setOrigin] = useState('Москва');
  const [destination, setDestination] = useState('Новосибирск');
  const [mode, setMode] = useState<TransportMode>('road');
  const [cargoType, setCargoType] = useState('general');
  const [weight, setWeight] = useState<number>(120);
  const [volume, setVolume] = useState<number>(0.8);
  
  // Custom vehicle configuration
  const [bodyType, setBodyType] = useState('tent'); // tent, ref, iso, flat
  const [tempRegime, setTempRegime] = useState('none'); // none, cool, freeze, warm

  // Options
  const [insurance, setInsurance] = useState(true);
  const [cargoValue, setCargoValue] = useState<number>(150000); // For insurance calculation
  const [expressHandling, setExpressHandling] = useState(false);
  const [doorDelivery, setDoorDelivery] = useState(true);

  // Computed Outputs
  const [distance, setDistance] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [co2Emissions, setCo2Emissions] = useState(0);

  const startCity = CITY_TERMINALS.find((c) => c.name === origin);
  const endCity = CITY_TERMINALS.find((c) => c.name === destination);
  const currentRate = FREIGHT_RATES.find((r) => r.mode === mode) || FREIGHT_RATES[0];
  const currentCargoType = CARGO_TYPES.find((t) => t.id === cargoType) || CARGO_TYPES[0];

  // Auto-set body/temp when category is Refrigerated (Temperature)
  useEffect(() => {
    if (cargoType === 'temperature') {
      setBodyType('ref');
      setTempRegime('cool');
    }
  }, [cargoType]);

  // Recalculate distance and price
  useEffect(() => {
    if (!startCity || !endCity) return;

    // Approximate distance in km based on terminal coordinate diff
    const dx = startCity.coordinates.x - endCity.coordinates.x;
    const dy = startCity.coordinates.y - endCity.coordinates.y;
    // Scale factor to approximate real Russian geography distances
    const calculatedDistance = Math.round(Math.sqrt(dx * dx + dy * dy) * 115);
    setDistance(calculatedDistance || 150); // Fallback min 150km

    // Shipping calculations
    const distFactor = (calculatedDistance || 150) / 1000; // factor per 1000 km
    
    // Base cost
    const cargoWeightCost = weight * currentRate.pricePerKg;
    const cargoVolumeCost = volume * currentRate.pricePerM3;
    
    // Choose the larger volumetric cost or weight cost
    const densityCost = Math.max(cargoWeightCost, cargoVolumeCost);
    
    // Calculate final price base
    let basePrice = (currentRate.basePrice + (densityCost * distFactor)) * currentCargoType.multiplier;

    // Body type modifiers
    if (bodyType === 'ref') {
      basePrice *= 1.25; // Refrigerator premium (+25%)
    } else if (bodyType === 'iso') {
      basePrice *= 1.15; // Isothermal premium (+15%)
    } else if (bodyType === 'flat') {
      basePrice *= 1.10; // Flatbed premium (+10%)
    }

    // Temperature regime modifiers
    if (tempRegime !== 'none') {
      basePrice *= 1.15; // +15% for active temperature climate control
    }

    // Apply addons
    if (insurance) {
      basePrice += cargoValue * 0.002; // 0.2% of cargo value
    }
    if (expressHandling) {
      basePrice += currentRate.basePrice * 0.35; // +35% of base freight processing
    }
    if (doorDelivery) {
      basePrice += 1500; // Flat price for door-to-door courier service
    }

    setCalculatedPrice(Math.round(basePrice));

    // CO2 Emissions
    // emissions = co2_per_kg_km * cargo_weight_kg * distance_km / 1000 (represented in kg CO2)
    const emissionsKg = (currentRate.co2PerKgKm * weight * (calculatedDistance || 150)) / 100;
    setCo2Emissions(Number(emissionsKg.toFixed(1)));

  }, [origin, destination, mode, cargoType, weight, volume, insurance, cargoValue, expressHandling, doorDelivery, startCity, endCity, currentRate, currentCargoType, bodyType, tempRegime]);

  const handleBookNow = () => {
    onPreFillBooking({
      origin,
      destination,
      weight,
      volume,
      cargoType: currentCargoType.name,
      mode,
      price: calculatedPrice,
    });
    setActiveTab('request');
  };

  const swapCities = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" id="calculator-tab-view">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="font-serif italic text-gold text-base block mb-1">Расчет тарифов</span>
        <h1 className="font-serif text-3xl font-light text-white tracking-tight sm:text-4xl">
          Калькулятор доставки
        </h1>
        <p className="text-[#888] mt-2 text-xs sm:text-sm uppercase tracking-wider">
          Интеллектуальный расчет тарифа с учетом расстояния, габаритов, веса и экологического следа груза.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (Left) */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Route Section */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white mb-3.5 flex items-center space-x-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-none bg-gold/5 border border-gold/30 text-gold text-[10px] font-mono">1</span>
              <span>Маршрут перевозки</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-3 relative">
              {/* Origin */}
              <div className="w-full">
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Откуда</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-dark-bg px-3.5 py-3 text-sm text-white outline-none transition focus:border-gold"
                  id="calc-origin-select"
                >
                  {CITY_TERMINALS.map((c) => (
                    <option key={`org-${c.name}`} value={c.name} disabled={c.name === destination}>{c.name} ({c.country})</option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <button
                type="button"
                onClick={swapCities}
                className="rounded-none bg-white/[0.02] border border-white/10 hover:border-gold text-gold hover:bg-gold/5 p-2.5 transition sm:mt-5 focus:outline-none hover:cursor-pointer"
                title="Поменять местами"
                id="calc-swap-btn"
              >
                <ArrowRightLeft className="h-4 w-4 rotate-90 sm:rotate-0" />
              </button>

              {/* Destination */}
              <div className="w-full">
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Куда</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-dark-bg px-3.5 py-3 text-sm text-white outline-none transition focus:border-gold"
                  id="calc-dest-select"
                >
                  {CITY_TERMINALS.map((c) => (
                    <option key={`dest-${c.name}`} value={c.name} disabled={c.name === origin}>{c.name} ({c.country})</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-2.5 text-xs text-[#888] flex items-center justify-between">
              <span>Расчетное расстояние:</span>
              <strong className="text-gold font-mono font-bold">{distance.toLocaleString('ru-RU')} км</strong>
            </div>
          </div>

          {/* Transport Mode Selection */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white mb-3.5 flex items-center space-x-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-none bg-gold/5 border border-gold/30 text-gold text-[10px] font-mono">2</span>
              <span>Способ транспортировки</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" id="calc-transport-modes">
              {FREIGHT_RATES.map((rate) => {
                const isSelected = mode === rate.mode;
                return (
                  <button
                    key={rate.mode}
                    type="button"
                    onClick={() => setMode(rate.mode)}
                    className={`rounded-none border p-3.5 text-left transition flex flex-col justify-between h-28 cursor-pointer ${
                      isSelected
                        ? 'border-gold bg-gold/5 shadow-sm shadow-gold/5'
                        : 'border-white/10 bg-dark-bg hover:border-white/20'
                    }`}
                  >
                    <span className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-gold' : 'text-[#555]'}`}>
                      {rate.speedDays}
                    </span>
                    <div>
                      <h4 className="font-serif text-sm font-light text-white block mt-1.5">{rate.name.split(' ')[0]}</h4>
                      <p className="text-[10px] text-[#888] mt-0.5">от {rate.pricePerKg}₽/кг</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cargo Parameters */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white mb-3.5 flex items-center space-x-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-none bg-gold/5 border border-gold/30 text-gold text-[10px] font-mono">3</span>
              <span>Характеристики и свойства груза</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Категория груза</label>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-dark-bg px-3.5 py-3 text-sm text-white outline-none transition focus:border-gold"
                  id="calc-cargotype-select"
                >
                  {CARGO_TYPES.map((t) => (
                    <option key={`type-${t.id}`} value={t.id}>{t.name} (x{t.multiplier})</option>
                  ))}
                </select>
              </div>

              {/* Weight and Volume Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider flex items-center space-x-1">
                    <Scale className="h-3 w-3 text-gold" />
                    <span>Вес (кг)</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={weight || ''}
                    onChange={(e) => setWeight(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full rounded-none border border-white/10 bg-dark-bg px-3 py-2.5 text-sm font-mono font-bold text-white outline-none transition focus:border-gold"
                    id="calc-weight-input"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider flex items-center space-x-1">
                    <Box className="h-3 w-3 text-gold" />
                    <span>Объем (м³)</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={volume || ''}
                    onChange={(e) => setVolume(Math.max(0.1, parseFloat(e.target.value) || 0))}
                    className="w-full rounded-none border border-white/10 bg-dark-bg px-3 py-2.5 text-sm font-mono font-bold text-white outline-none transition focus:border-gold"
                    id="calc-volume-input"
                  />
                </div>
              </div>
            </div>

            {/* B2B Vehicle and Temperature configurations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4.5 mt-4.5" id="calc-b2b-config-grid">
              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Тип кузова / транспорта</label>
                <select
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-dark-bg px-3.5 py-3 text-sm text-white outline-none transition focus:border-gold"
                  id="calc-bodytype-select"
                >
                  <option value="tent">Тент / Шторный полуприцеп (Стандарт)</option>
                  <option value="ref">Рефрижератор (+25% к базовому тарифу)</option>
                  <option value="iso">Изотермический фургон (+15%)</option>
                  <option value="flat">Бортовой / Открытая платформа (+10%)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Температурный режим</label>
                <select
                  value={tempRegime}
                  onChange={(e) => setTempRegime(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-dark-bg px-3.5 py-3 text-sm text-white outline-none transition focus:border-gold"
                  id="calc-tempregime-select"
                >
                  <option value="none">Не требуется (Обычные условия)</option>
                  <option value="cool">Охлаждение (+2°C...+8°C) (+15%)</option>
                  <option value="freeze">Глубокая заморозка (-18°C) (+15%)</option>
                  <option value="warm">Обогрев (+15°C) (+15%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white mb-3.5 flex items-center space-x-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-none bg-gold/5 border border-gold/30 text-gold text-[10px] font-mono">4</span>
              <span>Дополнительные опции</span>
            </h3>

            <div className="space-y-3" id="calc-options-checkboxes">
              
              {/* Option 1: Insurance */}
              <div className="rounded-none border border-white/5 bg-dark-bg/40 p-3.5 flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={insurance}
                    onChange={(e) => setInsurance(e.target.checked)}
                    className="mt-1 h-4.5 w-4.5 accent-gold cursor-pointer"
                    id="chk-insurance"
                  />
                  <div>
                    <label htmlFor="chk-insurance" className="text-sm font-semibold text-[#f0f0f0] cursor-pointer block leading-none">Страхование ценности груза (0.2%)</label>
                    <p className="text-xs text-[#888] mt-1">Обязательно для коммерческих и хрупких отправлений.</p>
                    
                    {insurance && (
                      <div className="mt-2.5 flex items-center space-x-2">
                        <span className="text-xs font-medium text-[#888]">Объявленная стоимость груза:</span>
                        <input
                          type="number"
                          step="1000"
                          min="1000"
                          value={cargoValue}
                          onChange={(e) => setCargoValue(Math.max(1000, parseInt(e.target.value) || 0))}
                          className="w-28 rounded-none border border-white/10 bg-dark-bg px-2 py-1 text-xs font-mono font-bold text-white outline-none transition focus:border-gold"
                        />
                        <span className="text-xs font-bold text-gold">₽</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-gold">+{insurance ? Math.round(cargoValue * 0.002) : 0}₽</span>
              </div>

              {/* Option 2: Express Processing */}
              <div className="rounded-none border border-white/5 bg-dark-bg/40 p-3.5 flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={expressHandling}
                    onChange={(e) => setExpressHandling(e.target.checked)}
                    className="mt-1 h-4.5 w-4.5 accent-gold cursor-pointer"
                    id="chk-express"
                  />
                  <div>
                    <label htmlFor="chk-express" className="text-sm font-semibold text-[#f0f0f0] cursor-pointer block leading-none">Приоритетное экспедирование</label>
                    <p className="text-xs text-[#888] mt-1">Внеочередная погрузка и подготовка документов (+35% к тарифу терминала).</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-gold">+{expressHandling ? '35%' : '0₽'}</span>
              </div>

              {/* Option 3: Door to Door */}
              <div className="rounded-none border border-white/5 bg-dark-bg/40 p-3.5 flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={doorDelivery}
                    onChange={(e) => setDoorDelivery(e.target.checked)}
                    className="mt-1 h-4.5 w-4.5 accent-gold cursor-pointer"
                    id="chk-door"
                  />
                  <div>
                    <label htmlFor="chk-door" className="text-sm font-semibold text-[#f0f0f0] cursor-pointer block leading-none">Доставка «до двери» получателя</label>
                    <p className="text-xs text-[#888] mt-1">Курьерский забор со склада назначения и вручение в руки.</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-gold">+1,500₽</span>
              </div>

            </div>
          </div>

        </div>

        {/* Pricing & Output Summary (Right Panel) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Price Card */}
          <div className="rounded-none glass-card text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold">Итоговый расчет</h3>
            
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl sm:text-5xl font-serif font-light tracking-tight text-white">
                {calculatedPrice.toLocaleString('ru-RU')}
              </span>
              <span className="text-xl font-bold ml-1.5 text-gold">₽</span>
            </div>
            
            <div className="mt-1.5 text-xs text-[#888]">
              Все налоги и портовые/терминальные сборы включены
            </div>

            <div className="mt-6 border-t border-white/10 pt-5 space-y-3.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#888]">Срок транспортировки:</span>
                <span className="font-bold text-gold">{currentRate.speedDays}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#888]">Плечо перевозки:</span>
                <span className="font-serif text-[#f0f0f0]">{origin} &rarr; {destination}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#888]">Способ доставки:</span>
                <span className="font-serif text-[#f0f0f0]">{currentRate.name}</span>
              </div>
            </div>

            {/* Smart Green Initiative */}
            <div className="mt-6 rounded-none bg-white/[0.01] border border-white/10 p-4 flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-none bg-gold/5 border border-gold/20 text-gold flex-shrink-0">
                <Leaf className="h-4.5 w-4.5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-gold uppercase tracking-wider">Экологический след (CO₂)</h5>
                <p className="text-[11px] text-[#888] leading-relaxed mt-0.5">
                  Транспортировка выделит около <strong className="text-white">{co2Emissions} кг</strong> углекислого газа. Наша компания компенсирует 10% выбросов за счет посадки лесов.
                </p>
              </div>
            </div>

            {/* Order Action Button */}
            <button
              onClick={handleBookNow}
              className="mt-6 w-full rounded-none bg-gold hover:bg-gold-hover text-black font-bold text-xs uppercase tracking-widest py-4.5 transition duration-150 flex items-center justify-center space-x-1.5 hover:cursor-pointer"
              id="calc-book-btn"
            >
              <span>Перейти к оформлению заказа</span>
              <CornerDownRight className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Interactive Routing Visualizer Card */}
          <div className="rounded-none glass-card p-4 shadow-xl">
            <h4 className="text-[10px] font-bold text-[#888] uppercase tracking-widest mb-2.5 px-1">Визуальный маршрут</h4>
            <div className="h-64 rounded-none overflow-hidden bg-dark-bg relative border border-white/5">
              <RoutePlanner customOrigin={origin} customDestination={destination} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
