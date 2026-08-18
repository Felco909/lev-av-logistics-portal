import React, { useState, useEffect } from 'react';
import { CITY_TERMINALS, FREIGHT_RATES, CARGO_TYPES } from '../data';
import { TransportMode, Shipment, TrackingCheckpoint } from '../types';
import { FileText, Send, Sparkles, Scale, Box, AlertCircle, ArrowRight, User, Phone, CheckCircle, Package } from 'lucide-react';

interface RequestQuoteProps {
  preFilledData: {
    origin: string;
    destination: string;
    weight: number;
    volume: number;
    cargoType: string;
    mode: TransportMode;
    price: number;
  } | null;
  onClearPreFill: () => void;
  onCreateShipment: (shipment: Shipment) => void;
  setActiveTab: (tab: string) => void;
  onSearchTrack: (id: string) => void;
}

export default function RequestQuote({ 
  preFilledData, 
  onClearPreFill, 
  onCreateShipment, 
  setActiveTab, 
  onSearchTrack 
}: RequestQuoteProps) {
  const [sender, setSender] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [recipient, setRecipient] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  
  const [origin, setOrigin] = useState('Москва');
  const [destination, setDestination] = useState('Владивосток');
  const [mode, setMode] = useState<TransportMode>('road');
  const [cargoType, setCargoType] = useState('Генеральный груз');
  const [weight, setWeight] = useState<number>(50);
  const [volume, setVolume] = useState<number>(0.5);

  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  // Handle pre-fill from calculator
  useEffect(() => {
    if (preFilledData) {
      setOrigin(preFilledData.origin);
      setDestination(preFilledData.destination);
      setWeight(preFilledData.weight);
      setVolume(preFilledData.volume);
      setCargoType(preFilledData.cargoType);
      setMode(preFilledData.mode);
    }
  }, [preFilledData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!sender.trim() || !recipient.trim() || !senderPhone.trim() || !recipientPhone.trim()) {
      alert('Пожалуйста, заполните контактные данные отправителя и получателя.');
      return;
    }

    // Generate fresh tracking number
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `TRK-RU-${uniqueSuffix}`;
    setGeneratedId(trackingId);

    // Calculate simulated price if not prefilled (fallback)
    let finalPrice = preFilledData?.price || 12500;
    if (!preFilledData) {
      const rate = FREIGHT_RATES.find(r => r.mode === mode) || FREIGHT_RATES[0];
      finalPrice = Math.round((weight * rate.pricePerKg + volume * rate.pricePerM3 + rate.basePrice) * 1.1);
    }

    // Generate initial history tracking record
    const initialCheckpoint: TrackingCheckpoint = {
      id: 'chk-init-1',
      status: 'pending',
      location: origin,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      description: `Заявка зарегистрирована в диспетчерском хабе г. ${origin}. Ожидается передача груза отправителем.`
    };

    const newShipment: Shipment = {
      id: trackingId,
      sender: sender.trim(),
      recipient: recipient.trim(),
      origin,
      destination,
      weight,
      volume,
      cargoType,
      mode,
      status: 'pending',
      currentLocation: origin,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
      createdDate: new Date().toISOString().split('T')[0],
      price: finalPrice,
      history: [initialCheckpoint]
    };

    // Save shipment
    onCreateShipment(newShipment);
    
    // Clear calculator parameters cache
    onClearPreFill();
    
    // Show local success state
    setIsSuccess(true);
  };

  const handleGoToTracking = () => {
    onSearchTrack(generatedId);
    setActiveTab('tracking');
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center" id="booking-success-view">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-none bg-gold/10 border border-gold/25 text-gold mb-6">
          <CheckCircle className="h-10 w-10" />
        </div>

        <h1 className="font-serif text-2xl font-light text-white tracking-tight">Заявка успешно оформлена!</h1>
        <p className="text-[#888] mt-2 text-xs sm:text-sm uppercase tracking-wider leading-relaxed">
          Вашему отправлению присвоен уникальный трек-номер. Вы можете отслеживать его статус и движение в реальном времени.
        </p>

        {/* Tracking Code Display */}
        <div className="mt-8 rounded-none glass-card p-6 flex flex-col items-center shadow-xl">
          <span className="text-xs font-mono font-bold uppercase text-[#888] tracking-widest">Уникальный трек-номер</span>
          <span className="text-3xl font-mono font-extrabold text-gold mt-1">{generatedId}</span>
          
          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1.5 text-xs text-[#888] border-t border-white/5 pt-4 w-full">
            <div className="text-left">Маршрут: <strong className="text-white">{origin} &rarr; {destination}</strong></div>
            <div className="text-right">Вес: <strong className="text-white">{weight} кг</strong></div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoToTracking}
            className="rounded-none bg-gold hover:bg-gold-hover text-black font-bold text-xs uppercase tracking-widest px-6 py-3.5 transition duration-150 flex items-center justify-center space-x-1.5 hover:cursor-pointer"
            id="success-track-btn"
          >
            <span>Отследить груз</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setIsSuccess(false);
              setSender('');
              setRecipient('');
              setSenderPhone('');
              setRecipientPhone('');
            }}
            className="rounded-none bg-[#111] border border-white/10 text-[#888] hover:text-white hover:border-white/20 font-semibold text-xs uppercase tracking-widest px-6 py-3.5 transition"
            id="success-new-btn"
          >
            Оформить еще одну заявку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8" id="booking-tab-view">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="font-serif italic text-gold text-base block mb-1">Оформление доставки</span>
        <h1 className="font-serif text-3xl font-light text-white tracking-tight sm:text-4xl">
          Оформить заявку на доставку
        </h1>
        <p className="text-[#888] mt-2 text-xs sm:text-sm uppercase tracking-wider">
          Заполните контактную информацию отправителя и получателя, чтобы забронировать рейс.
        </p>
      </div>

      {/* Info notification from calculator */}
      {preFilledData && (
        <div className="mb-6 rounded-none bg-gold/5 border border-gold/20 p-4 text-xs flex items-center justify-between" id="calculator-prefill-banner">
          <div className="flex items-center space-x-2.5 text-gold">
            <Sparkles className="h-5 w-5 text-gold animate-pulse flex-shrink-0" />
            <span>
              <strong>Параметры импортированы:</strong> Расчет стоимости составил <strong>{preFilledData.price.toLocaleString('ru-RU')} ₽</strong> для маршрута {preFilledData.origin} &rarr; {preFilledData.destination}.
            </span>
          </div>
          <button 
            type="button" 
            onClick={onClearPreFill} 
            className="text-xs font-bold uppercase tracking-widest text-[#888] hover:text-white underline hover:cursor-pointer"
          >
            Сбросить
          </button>
        </div>
      )}

      {/* Core Form */}
      <form onSubmit={handleSubmit} className="glass-card shadow-xl overflow-hidden" id="booking-core-form">
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Section 1: Contacts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sender block */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-widest text-gold flex items-center space-x-1.5 border-b border-white/5 pb-2">
                <User className="h-4 w-4 text-gold" />
                <span>1. Отправитель</span>
              </h3>

              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">ФИО или Название компании *</label>
                <input
                  type="text"
                  required
                  placeholder="ООО Прогресс или Иванов Иван"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-dark-bg px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:bg-[#111]"
                  id="sender-name-input"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Контактный телефон *</label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (999) 000-00-00"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-dark-bg px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:bg-[#111]"
                  id="sender-phone-input"
                />
              </div>
            </div>

            {/* Recipient block */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-widest text-gold flex items-center space-x-1.5 border-b border-white/5 pb-2">
                <User className="h-4 w-4 text-gold" />
                <span>2. Получатель</span>
              </h3>

              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">ФИО или Название компании *</label>
                <input
                  type="text"
                  required
                  placeholder="АО Спектр или Петров Петр"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-dark-bg px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:bg-[#111]"
                  id="recipient-name-input"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Контактный телефон *</label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (999) 111-11-11"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-dark-bg px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:bg-[#111]"
                  id="recipient-phone-input"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Freight specifications */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-widest text-gold flex items-center space-x-1.5 border-b border-white/5 pb-2">
              <Package className="h-4 w-4 text-gold" />
              <span>3. Параметры груза и маршрут</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Город отправления</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  disabled={!!preFilledData}
                  className="w-full rounded-none border border-white/10 bg-dark-bg disabled:opacity-50 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:bg-[#111]"
                  id="booking-origin-select"
                >
                  {CITY_TERMINALS.map((c) => (
                    <option key={`booking-org-${c.name}`} value={c.name} disabled={c.name === destination} className="bg-dark-card text-white">{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Город назначения</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  disabled={!!preFilledData}
                  className="w-full rounded-none border border-white/10 bg-dark-bg disabled:opacity-50 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:bg-[#111]"
                  id="booking-dest-select"
                >
                  {CITY_TERMINALS.map((c) => (
                    <option key={`booking-dest-${c.name}`} value={c.name} disabled={c.name === origin} className="bg-dark-card text-white">{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Способ перевозки</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as TransportMode)}
                  disabled={!!preFilledData}
                  className="w-full rounded-none border border-white/10 bg-dark-bg disabled:opacity-50 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:bg-[#111]"
                  id="booking-mode-select"
                >
                  {FREIGHT_RATES.map((r) => (
                    <option key={`booking-mode-${r.mode}`} value={r.mode} className="bg-dark-card text-white">{r.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Характер груза</label>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  disabled={!!preFilledData}
                  className="w-full rounded-none border border-white/10 bg-dark-bg disabled:opacity-50 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:bg-[#111]"
                  id="booking-type-select"
                >
                  {CARGO_TYPES.map((t) => (
                    <option key={`booking-type-${t.id}`} value={t.name} className="bg-dark-card text-white">{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Weight & Volume */}
              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider flex items-center space-x-1">
                  <Scale className="h-3 w-3 text-gold" />
                  <span>Вес (кг)</span>
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  disabled={!!preFilledData}
                  value={weight || ''}
                  onChange={(e) => setWeight(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full rounded-none border border-white/10 bg-dark-bg disabled:opacity-50 px-3 py-2.5 text-sm font-mono text-white outline-none transition focus:border-gold focus:bg-[#111]"
                  id="booking-weight-input"
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
                  required
                  disabled={!!preFilledData}
                  value={volume || ''}
                  onChange={(e) => setVolume(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-none border border-white/10 bg-dark-bg disabled:opacity-50 px-3 py-2.5 text-sm font-mono text-white outline-none transition focus:border-gold focus:bg-[#111]"
                  id="booking-volume-input"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Form Submission Bar */}
        <div className="bg-[#111] border-t border-white/5 px-6 py-5.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2 text-[#555]">
            <AlertCircle className="h-4.5 w-4.5 text-[#444] flex-shrink-0" />
            <span className="text-xs leading-relaxed">Нажимая кнопку, вы соглашаетесь с условиями экспедиторского договора-оферты.</span>
          </div>

          <button
            type="submit"
            className="rounded-none bg-gold hover:bg-gold-hover text-black font-bold text-xs uppercase tracking-widest px-7 py-3.5 transition duration-150 flex items-center justify-center space-x-2 hover:cursor-pointer"
            id="booking-submit-btn"
          >
            <span>Подтвердить и отправить заявку</span>
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
