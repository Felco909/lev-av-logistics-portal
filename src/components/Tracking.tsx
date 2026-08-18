import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Clock, Info, CheckCircle2, AlertTriangle, Play, Truck, Plane, Ship, Train, CornerDownRight } from 'lucide-react';
import { Shipment, ShipmentStatus } from '../types';
import RoutePlanner from './RoutePlanner';

interface TrackingProps {
  shipments: Shipment[];
  activeShipment: Shipment | null;
  onSearchTrack: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function Tracking({ shipments, activeShipment, onSearchTrack, setActiveTab }: TrackingProps) {
  const [searchInput, setSearchInput] = useState('');
  const [hasSearched, setHasSearched] = useState(activeShipment !== null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    onSearchTrack(searchInput.trim());
  };

  const getStatusLabel = (status: ShipmentStatus) => {
    switch (status) {
      case 'pending': return { label: 'Заявка принята', color: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'sorting': return { label: 'Сортировка / Хаб', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'in_transit': return { label: 'В пути', color: 'bg-orange-50 text-orange-700 border-orange-200 animate-pulse' };
      case 'customs': return { label: 'Таможенный контроль', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'delivered': return { label: 'Доставлен', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'cancelled': return { label: 'Отменен', color: 'bg-red-50 text-red-700 border-red-200' };
      default: return { label: 'Неизвестно', color: 'bg-slate-50 text-slate-500 border-slate-100' };
    }
  };

  const getProgressPercentage = (status: ShipmentStatus) => {
    switch (status) {
      case 'pending': return 10;
      case 'sorting': return 35;
      case 'in_transit': return 65;
      case 'customs': return 85;
      case 'delivered': return 100;
      case 'cancelled': return 0;
      default: return 0;
    }
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'road': return <Truck className="h-5 w-5" />;
      case 'air': return <Plane className="h-5 w-5" />;
      case 'sea': return <Ship className="h-5 w-5" />;
      case 'rail': return <Train className="h-5 w-5" />;
      default: return <Truck className="h-5 w-5" />;
    }
  };

  const getTransportName = (mode: string) => {
    switch (mode) {
      case 'road': return 'Автоперевозка';
      case 'air': return 'Авиадоставка';
      case 'sea': return 'Морской фрахт';
      case 'rail': return 'Ж/Д экспресс';
      default: return 'Автоперевозка';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" id="tracking-tab-view">
      {/* Search Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="font-serif italic text-gold text-base block mb-1">Где ваш груз?</span>
        <h1 className="font-serif text-3xl font-light text-white tracking-tight sm:text-4xl">
          Онлайн-отслеживание
        </h1>
        <p className="text-[#888] mt-2 text-xs sm:text-sm uppercase tracking-wider">
          Контролируйте перемещение груза на любом этапе логистической цепочки в реальном времени.
        </p>

        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Введите трек-номер груза..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 rounded-none border border-white/10 bg-[#0c101b]/70 px-4 py-3 text-sm text-white outline-none transition focus:border-gold"
            id="tracking-search-input"
          />
          <button
            type="submit"
            className="rounded-none bg-gold hover:bg-gold-hover text-black font-semibold text-xs uppercase tracking-widest px-6 py-3 transition duration-150 flex items-center justify-center space-x-1.5 hover:cursor-pointer"
            id="tracking-search-submit"
          >
            <Search className="h-4 w-4" />
            <span>Найти</span>
          </button>
        </form>
      </div>

      {activeShipment ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="tracking-result-panel">
          
          {/* Timeline & Details (Left Panel) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Shipment Main Status Card */}
            <div className="rounded-none glass-card p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-5 gap-3">
                <div>
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest">Груз</span>
                    <span className="font-serif text-lg font-light text-white">{activeShipment.id}</span>
                  </div>
                  <div className="flex items-center text-xs text-[#888] mt-1 space-x-1">
                    <MapPin className="h-3 w-3 text-gold" />
                    <span>{activeShipment.origin}</span>
                    <span>&rarr;</span>
                    <span>{activeShipment.destination}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-1 text-[10px] text-[#888] bg-white/[0.01] border border-white/10 px-2.5 py-1 rounded-none font-semibold uppercase tracking-wider">
                    {getTransportIcon(activeShipment.mode)}
                    <span>{getTransportName(activeShipment.mode)}</span>
                  </div>
                  <span className={`inline-flex items-center rounded-none border px-3 py-1 text-[10px] uppercase font-bold tracking-widest ${getStatusLabel(activeShipment.status).color}`}>
                    {getStatusLabel(activeShipment.status).label}
                  </span>
                </div>
              </div>

              {/* Progress Tracker Bar */}
              <div className="py-6">
                <div className="flex items-center justify-between text-xs font-medium text-[#888] mb-2">
                  <span className="uppercase tracking-wider">Статус доставки</span>
                  <span className="font-bold text-white">{getProgressPercentage(activeShipment.status)}% выполнено</span>
                </div>
                <div className="h-1.5 w-full rounded-none bg-white/[0.03] overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage(activeShipment.status)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-none bg-gold"
                  />
                </div>
                
                <div className="grid grid-cols-4 mt-3 text-[10px] sm:text-xs font-medium text-[#555] text-center uppercase tracking-wider">
                  <div className={activeShipment.status !== 'pending' ? 'text-white font-bold' : ''}>Заявка</div>
                  <div className={['sorting', 'in_transit', 'customs', 'delivered'].includes(activeShipment.status) ? 'text-white font-bold' : ''}>Склад / Хаб</div>
                  <div className={['in_transit', 'customs', 'delivered'].includes(activeShipment.status) ? 'text-white font-bold' : ''}>В пути</div>
                  <div className={activeShipment.status === 'delivered' ? 'text-gold font-bold' : ''}>Доставлен</div>
                </div>
              </div>

              {/* Stats / Info Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/5 pt-5 text-sm">
                <div>
                  <span className="block text-[10px] text-[#555] uppercase tracking-wider font-semibold">Ожидается к</span>
                  <span className="font-serif text-sm font-light text-white block mt-0.5">
                    {new Date(activeShipment.estimatedDelivery).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#555] uppercase tracking-wider font-semibold">Отправитель</span>
                  <span className="font-serif text-sm font-light text-white block truncate mt-0.5" title={activeShipment.sender}>
                    {activeShipment.sender}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#555] uppercase tracking-wider font-semibold">Получатель</span>
                  <span className="font-serif text-sm font-light text-white block truncate mt-0.5" title={activeShipment.recipient}>
                    {activeShipment.recipient}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#555] uppercase tracking-wider font-semibold">Тип груза</span>
                  <span className="font-serif text-sm font-light text-white block truncate mt-0.5" title={activeShipment.cargoType}>
                    {activeShipment.cargoType}
                  </span>
                </div>
              </div>

              {/* Physical properties & Price Info footer inside Main Card */}
              <div className="mt-4 bg-dark-bg rounded-none p-3.5 flex flex-wrap items-center justify-between text-xs border border-white/5">
                <div className="flex space-x-4 text-[#888] font-medium">
                  <span>Вес: <strong className="text-white">{activeShipment.weight} кг</strong></span>
                  <span>Объем: <strong className="text-white">{activeShipment.volume} м³</strong></span>
                </div>
                <div className="text-[#888]">
                  Стоимость перевозки: <strong className="text-gold font-bold font-mono">{activeShipment.price.toLocaleString('ru-RU')} ₽</strong>
                </div>
              </div>
            </div>

            {/* Tracking Log / Timeline */}
            <div className="rounded-none glass-card p-6 shadow-xl">
              <h3 className="text-lg font-serif font-light text-white border-b border-white/5 pb-4 mb-6">
                История перемещения
              </h3>

              <div className="flow-root">
                <ul className="-mb-8">
                  {activeShipment.history.slice().reverse().map((checkpoint, checkpointIdx) => {
                    const isLast = checkpointIdx === activeShipment.history.length - 1;
                    const isNewest = checkpointIdx === 0;

                    return (
                      <li key={checkpoint.id}>
                        <div className="relative pb-8">
                          {!isLast && (
                            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-white/5" aria-hidden="true" />
                          )}
                          <div className="relative flex space-x-3 sm:space-x-4">
                            <div>
                              <span className={`flex h-10 w-10 items-center justify-center rounded-none ring-8 ring-[#111726]/40 ${
                                isNewest 
                                  ? 'bg-gold text-black shadow-md shadow-gold/20' 
                                  : 'bg-[#111] border border-white/10 text-[#888]'
                              }`}>
                                {isNewest ? (
                                  <MapPin className="h-5 w-5" />
                                ) : (
                                  <CheckCircle2 className="h-5 w-5 text-[#444]" />
                                )}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0 pt-1.5">
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <p className={`text-sm font-serif ${isNewest ? 'text-white' : 'text-[#888]'}`}>
                                  {checkpoint.location}
                                </p>
                                <div className="text-xs font-mono text-[#555] flex items-center space-x-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{checkpoint.timestamp}</span>
                                </div>
                              </div>
                              <p className="mt-1.5 text-xs sm:text-sm text-[#888] leading-relaxed">
                                {checkpoint.description}
                              </p>
                              
                              <div className="mt-1 flex items-center space-x-1">
                                <span className="text-[10px] font-mono font-semibold uppercase bg-gold/5 border border-gold/15 text-gold rounded-none px-1.5 py-0.5">
                                  {getStatusLabel(checkpoint.status).label}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

          </div>

          {/* Map / Routing Section (Right Panel) */}
          <div className="lg:col-span-5">
            <div className="rounded-none glass-card p-5 shadow-xl sticky top-24">
              <div className="border-b border-white/5 pb-4 mb-4">
                <h3 className="text-lg font-serif font-light text-white">Интерактивный маршрут</h3>
                <p className="text-xs text-[#888] mt-0.5 uppercase tracking-wider">Траектория транспортировки между терминалами компании</p>
              </div>

              {/* Embed Route Planner directly inside tracking view */}
              <div className="h-[340px] sm:h-[420px] rounded-none border border-white/5 bg-dark-bg overflow-hidden relative">
                <RoutePlanner activeShipment={activeShipment} />
              </div>

              {/* Simulation Quick-Action Box */}
              <div className="mt-4 bg-gold/5 border border-gold/20 rounded-none p-4 text-xs">
                <div className="flex items-start space-x-2.5">
                  <Info className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-gold uppercase tracking-wider text-[10px]">Тестовое окружение</h5>
                    <p className="text-[#888] leading-relaxed mt-1">
                      Вы можете имитировать движение этого груза. Перейдите во вкладку <button onClick={() => setActiveTab('manager')} className="font-semibold underline hover:text-white text-gold cursor-pointer">«Режим диспетчера»</button>, чтобы добавить чекпоинты или обновить статус, и вернитесь сюда, чтобы увидеть мгновенные изменения.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        // Search Empty State
        <div className="rounded-none border border-dashed border-white/20 glass-card p-12 text-center max-w-xl mx-auto shadow-xl" id="tracking-empty-state">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-none bg-white/[0.02] border border-white/10 text-gold mb-5">
            <Search className="h-6 w-6" />
          </div>
          
          <h3 className="text-lg font-serif font-light text-white">Груз не выбран</h3>
          <p className="text-xs text-[#888] mt-2 leading-relaxed uppercase tracking-wider">
            {hasSearched 
              ? 'Груз с таким трек-номером не найден в нашей системе. Проверьте правильность ввода или введите тестовый трек-номер из списка.'
              : 'Введите ваш уникальный трек-номер отправления в строке поиска выше или выберите один из активных тестовых грузов компании:'}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 max-w-sm mx-auto">
            {shipments.map((shipment) => (
              <button
                key={shipment.id}
                onClick={() => {
                  onSearchTrack(shipment.id);
                  setSearchInput(shipment.id);
                }}
                className="flex items-center justify-between rounded-none border border-white/10 bg-dark-bg hover:border-gold/30 hover:bg-[#111] p-3 text-left transition text-sm cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="flex h-7 w-7 items-center justify-center bg-white/[0.02] border border-white/10 text-gold font-mono text-xs rounded-none">
                    {getTransportIcon(shipment.mode)}
                  </div>
                  <div>
                    <span className="font-mono font-bold text-white block">{shipment.id}</span>
                    <span className="text-xs text-[#888]">{shipment.origin} &rarr; {shipment.destination}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-gold font-semibold uppercase tracking-wider">
                  <span>Отследить</span>
                  <CornerDownRight className="h-3.5 w-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
