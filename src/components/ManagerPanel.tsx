import React, { useState } from 'react';
import { Shipment, ShipmentStatus, TrackingCheckpoint } from '../types';
import { Sliders, RefreshCw, PlusCircle, Clock, MapPin, Truck, Check, Edit3, Trash2, HelpCircle } from 'lucide-react';

interface ManagerPanelProps {
  shipments: Shipment[];
  onUpdateShipment: (updatedShipment: Shipment) => void;
  onDeleteShipment?: (id: string) => void;
  setActiveTab: (tab: string) => void;
  onSearchTrack: (id: string) => void;
}

export default function ManagerPanel({ 
  shipments, 
  onUpdateShipment, 
  onDeleteShipment,
  setActiveTab,
  onSearchTrack
}: ManagerPanelProps) {
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
  
  // Status update states
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('pending');
  const [newLocation, setNewLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Notification feedback state
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const selectedShipment = shipments.find((s) => s.id === selectedShipmentId);

  const handleSelectShipment = (shipment: Shipment) => {
    setSelectedShipmentId(shipment.id);
    setNewStatus(shipment.status);
    setNewLocation(shipment.currentLocation);
    setNewDescription('');
    setSuccessMsg(null);
  };

  const handleUpdateStatusOnly = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipment) return;

    // Automatic standard description text helper
    let defaultDesc = '';
    switch (newStatus) {
      case 'pending':
        defaultDesc = 'Заявка зарегистрирована, груз ожидает отправки.';
        break;
      case 'sorting':
        defaultDesc = `Груз прибыл в транзитный сортировочный терминал г. ${newLocation}.`;
        break;
      case 'in_transit':
        defaultDesc = `Груз выпущен из терминала и находится в транзите в направлении г. ${selectedShipment.destination}.`;
        break;
      case 'customs':
        defaultDesc = `Груз прибыл на пункт таможенного/пограничного досмотра в г. ${newLocation}.`;
        break;
      case 'delivered':
        defaultDesc = `Груз успешно прибыл в конечный пункт назначения и выдан получателю в г. ${newLocation}.`;
        break;
      case 'cancelled':
        defaultDesc = 'Транспортировка приостановлена. Заявка аннулирована.';
        break;
    }

    const checkpointDesc = newDescription.trim() || defaultDesc;

    // Build new checkpoint
    const newCheckpoint: TrackingCheckpoint = {
      id: `chk-${Date.now()}`,
      status: newStatus,
      location: newLocation.trim() || selectedShipment.currentLocation,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      description: checkpointDesc,
    };

    // Update shipment
    const updatedShipment: Shipment = {
      ...selectedShipment,
      status: newStatus,
      currentLocation: newLocation.trim() || selectedShipment.currentLocation,
      history: [...selectedShipment.history, newCheckpoint],
    };

    onUpdateShipment(updatedShipment);
    setNewDescription('');
    setSuccessMsg('Статус груза и хронология успешно обновлены!');
    
    // Clear feedback after a few seconds
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleViewInTracking = (id: string) => {
    onSearchTrack(id);
    setActiveTab('tracking');
  };

  const getStatusBadgeClass = (status: ShipmentStatus) => {
    switch (status) {
      case 'pending': return 'bg-white/5 text-[#888] border-white/10';
      case 'sorting': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'in_transit': return 'bg-gold/10 text-gold border-gold/20';
      case 'customs': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'delivered': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/5 text-[#555]';
    }
  };

  const getStatusLabelRu = (status: ShipmentStatus) => {
    switch (status) {
      case 'pending': return 'Оформлен';
      case 'sorting': return 'Сортировка';
      case 'in_transit': return 'В пути';
      case 'customs': return 'Таможня';
      case 'delivered': return 'Доставлен';
      case 'cancelled': return 'Отменен';
      default: return status;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" id="manager-tab-view">
      
      {/* Title */}
      <div className="border-b border-white/5 pb-5 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-none bg-gold text-black font-mono text-xs font-bold">M</span>
            <h1 className="font-serif text-2xl font-light text-white tracking-tight sm:text-3xl">
              Диспетчерский пульт (Симулятор)
            </h1>
          </div>
          <p className="text-[#888] mt-1 text-sm leading-relaxed">
            Административная консоль управления грузами. Позволяет обновлять геолокацию и этапы доставки для демонстрации.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Shipments List Table (Left) */}
        <div className="lg:col-span-7 glass-card shadow-xl overflow-hidden">
          <div className="px-5 py-4 bg-[#111] border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xs uppercase font-bold tracking-widest text-gold flex items-center space-x-2">
              <Sliders className="h-4.5 w-4.5 text-gold" />
              <span>Список активных отправлений ({shipments.length})</span>
            </h3>
            <span className="text-[10px] font-mono text-[#555] uppercase tracking-wider">Кликните на груз для управления</span>
          </div>

          <div className="divide-y divide-white/5 overflow-x-auto">
            {shipments.length === 0 ? (
              <div className="p-8 text-center text-[#888] text-sm font-light uppercase tracking-wider">
                Нет оформленных грузов в системе. Создайте новый во вкладке «Оформить заявку».
              </div>
            ) : (
              <table className="min-w-full divide-y divide-white/5 text-left">
                <thead className="bg-[#111] text-[10px] font-bold text-[#888] uppercase tracking-widest border-b border-white/5">
                  <tr>
                    <th className="px-5 py-3">Трек-номер</th>
                    <th className="px-5 py-3">Маршрут</th>
                    <th className="px-5 py-3">Вес/Объем</th>
                    <th className="px-5 py-3">Статус</th>
                    <th className="px-5 py-3 text-right">Управление</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm font-medium">
                  {shipments.map((s) => {
                    const isSelected = selectedShipmentId === s.id;
                    return (
                      <tr 
                        key={s.id}
                        onClick={() => handleSelectShipment(s)}
                        className={`hover:bg-[#111] transition cursor-pointer ${
                          isSelected ? 'bg-gold/[0.03] border-l-2 border-l-gold' : ''
                        }`}
                      >
                        <td className="px-5 py-4">
                          <span className="font-mono font-bold text-white block">{s.id}</span>
                          <span className="text-[10px] font-mono text-gold block mt-0.5 uppercase tracking-widest">{s.cargoType}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-white text-xs font-semibold">{s.origin} &rarr; {s.destination}</div>
                          <div className="text-[10px] text-[#888] flex items-center space-x-1 mt-0.5">
                            <MapPin className="h-3 w-3 text-gold" />
                            <span>Текущий: <strong className="text-white">{s.currentLocation}</strong></span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-xs font-mono text-[#888]">
                          <div>{s.weight} кг</div>
                          <div>{s.volume} м³</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center rounded-none border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${getStatusBadgeClass(s.status)}`}>
                            {getStatusLabelRu(s.status)}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => handleViewInTracking(s.id)}
                              className="rounded-none bg-gold hover:bg-gold-hover text-black text-xs font-semibold uppercase tracking-wider px-2.5 py-1.5 transition cursor-pointer"
                            >
                              Отследить
                            </button>
                            {onDeleteShipment && s.id.startsWith('TRK-RU-') && !['TRK-RU-2041'].includes(s.id) && (
                              <button
                                onClick={() => onDeleteShipment(s.id)}
                                className="rounded-none text-red-400 hover:text-red-500 hover:bg-red-500/10 p-1.5 transition"
                                title="Удалить накладную"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Dispatcher Actions Panel (Right) */}
        <div className="lg:col-span-5 glass-card shadow-xl p-6 space-y-6">
          {selectedShipment ? (
            <div id="manager-control-panel">
              <div className="border-b border-white/5 pb-4.5 mb-5 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest">УПРАВЛЕНИЕ НАКЛАДНОЙ</span>
                  <h3 className="font-mono text-lg font-extrabold text-white">{selectedShipment.id}</h3>
                </div>
                <button 
                  onClick={() => handleSelectShipment(selectedShipment)}
                  className="p-1 rounded-none text-[#555] hover:bg-white/[0.02] hover:text-gold transition cursor-pointer"
                  title="Сбросить поля"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              {/* Status form */}
              <form onSubmit={handleUpdateStatusOnly} className="space-y-4">
                {/* Status selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Новый статус груза</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ShipmentStatus)}
                    className="w-full rounded-none border border-white/10 bg-dark-bg px-3.5 py-2.5 text-sm text-white outline-none focus:border-gold font-medium"
                  >
                    <option value="pending" className="bg-dark-card text-white">Оформлен (Ожидает забора)</option>
                    <option value="sorting" className="bg-dark-card text-white">На сортировке (Терминал / Хаб)</option>
                    <option value="in_transit" className="bg-dark-card text-white">Выпущен в рейс (В движении)</option>
                    <option value="customs" className="bg-dark-card text-white">Таможенный досмотр</option>
                    <option value="delivered" className="bg-dark-card text-white">Успешно доставлен</option>
                    <option value="cancelled" className="bg-dark-card text-white">Отменен / Приостановлен</option>
                  </select>
                </div>

                {/* Current Location */}
                <div>
                  <label className="block text-xs font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Текущее местоположение груза</label>
                  <input
                    type="text"
                    required
                    placeholder="Пример: Пермь Сортировочная"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full rounded-none border border-white/10 bg-dark-bg px-3.5 py-2.5 text-sm text-white outline-none focus:border-gold font-medium"
                  />
                  <span className="text-[10px] text-[#555] mt-1 block">Укажите терминал или город, где был отсканирован груз.</span>
                </div>

                {/* Checkpoint Details / Custom log comment */}
                <div>
                  <label className="block text-xs font-semibold text-[#888] mb-1.5 uppercase tracking-wider">
                    Описание события (Комментарий к истории) <span className="text-[#555] font-normal">(Необязательно)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Введите описание транзитного действия или оставьте пустым для генерации системного комментария..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full rounded-none border border-white/10 bg-dark-bg px-3.5 py-2.5 text-sm text-white outline-none focus:border-gold leading-relaxed resize-none"
                  />
                </div>

                {/* Success alert toast */}
                {successMsg && (
                  <div className="rounded-none bg-emerald-500/5 border border-emerald-500/25 p-3 flex items-start space-x-2">
                    <Check className="h-4.5 w-4.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-emerald-400 font-medium">{successMsg}</span>
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full rounded-none bg-gold hover:bg-gold-hover text-black font-bold text-xs uppercase tracking-widest py-3.5 transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Обновить статус и координаты</span>
                </button>
              </form>

              {/* Tips */}
              <div className="mt-5 border-t border-white/5 pt-5 text-xs text-[#888] leading-relaxed">
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-gold uppercase tracking-wider text-[10px]">Принцип работы симулятора</h5>
                    <p className="mt-0.5 text-[#888]">
                      Когда вы нажимаете кнопку, система генерирует новый контрольный чекпоинт с точным системным временем и записывает его в историю перемещений этого груза. Вы можете мгновенно проверить результат во вкладке <strong>«Отслеживание грузов»</strong>.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-10" id="manager-no-selected">
              <Sliders className="h-10 w-10 text-gold mx-auto mb-3 animate-pulse" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Груз не выбран</h4>
              <p className="text-xs text-[#888] mt-1.5 max-w-xs mx-auto leading-relaxed">
                Выберите отправление из левой таблицы, чтобы начать симуляцию прохождения контрольных точек и смены логистических статусов.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
