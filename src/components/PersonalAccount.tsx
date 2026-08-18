import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  User, Building2, TrendingUp, CreditCard, FileSpreadsheet, FileText, Download, CheckCircle, 
  MapPin, Plus, Trash2, ArrowRight, Bookmark, ShieldCheck, HelpCircle, Activity 
} from 'lucide-react';
import { Shipment, TransportMode } from '../types';

interface PersonalAccountProps {
  shipments: Shipment[];
  setActiveTab: (tab: string) => void;
  onPreFillBooking: (data: {
    origin: string;
    destination: string;
    weight: number;
    volume: number;
    cargoType: string;
    mode: TransportMode;
    price: number;
  }) => void;
}

interface AddressTemplate {
  id: string;
  name: string;
  senderName: string;
  origin: string;
  recipientName: string;
  destination: string;
  cargoType: string;
  weight: number;
  volume: number;
}

export default function PersonalAccount({ shipments, setActiveTab, onPreFillBooking }: PersonalAccountProps) {
  const [lkSubTab, setLkSubTab] = useState<'dashboard' | 'finances' | 'templates'>('dashboard');
  
  // State for user templates
  const [templates, setTemplates] = useState<AddressTemplate[]>([
    {
      id: 'tpl-1',
      name: 'Поставка на Урал (Регулярная)',
      senderName: 'ООО "Регион-Трейдинг"',
      origin: 'Москва',
      recipientName: 'ООО "УралТрейд"',
      destination: 'Екатеринбург',
      cargoType: 'Генеральный груз',
      weight: 1200,
      volume: 6.5,
    },
    {
      id: 'tpl-2',
      name: 'Филиал Сибирь (Оборудование)',
      senderName: 'ООО "Регион-Трейдинг"',
      origin: 'Санкт-Петербург',
      recipientName: 'АО "СибМаш"',
      destination: 'Новосибирск',
      cargoType: 'Негабаритный / Тяжеловесный',
      weight: 3500,
      volume: 18.0,
    }
  ]);

  // Form states to add new templates
  const [newTplName, setNewTplName] = useState('');
  const [newTplOrigin, setNewTplOrigin] = useState('Москва');
  const [newTplDest, setNewTplDest] = useState('Новосибирск');
  const [newTplWeight, setNewTplWeight] = useState(500);
  const [newTplVolume, setNewTplVolume] = useState(3.0);
  const [showAddTpl, setShowAddTpl] = useState(false);

  // Stats
  const activeCargoesCount = shipments.filter(s => s.status !== 'delivered' && s.status !== 'cancelled').length;
  const deliveredCargoesCount = shipments.filter(s => s.status === 'delivered').length;
  const totalSpend = shipments.reduce((sum, s) => sum + s.price, 0);

  // Financial Documents List
  const mockDocs = [
    { id: 'FIN-2026-881', type: 'Акт сверки взаимных расчетов', period: 'Май-Июнь 2026', status: 'Согласован', size: '142 КБ' },
    { id: 'INV-2026-902', type: 'Счет на оплату № 902 (Поставка Новосибирск)', period: '24.06.2026', status: 'Оплачен', size: '98 КБ' },
    { id: 'UPD-2026-441', type: 'Универсальный передаточный документ (УПД)', period: '18.06.2026', status: 'Подписан ЭЦП', size: '204 КБ' },
    { id: 'INV-2026-711', type: 'Счет на оплату № 711 (Поставка Владивосток)', period: '12.06.2026', status: 'Оплачен', size: '115 КБ' },
  ];

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTplName.trim()) return;

    const newTpl: AddressTemplate = {
      id: `tpl-${Date.now()}`,
      name: newTplName,
      senderName: 'ООО "Регион-Трейдинг"',
      origin: newTplOrigin,
      recipientName: 'Контрагент по умолчанию',
      destination: newTplDest,
      cargoType: 'Генеральный груз',
      weight: newTplWeight,
      volume: newTplVolume,
    };

    setTemplates([...templates, newTpl]);
    setNewTplName('');
    setShowAddTpl(false);
  };

  const handleDeleteTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTemplates(templates.filter(t => t.id !== id));
  };

  const handleUseTemplate = (tpl: AddressTemplate) => {
    // Fill the buffer
    onPreFillBooking({
      origin: tpl.origin,
      destination: tpl.destination,
      weight: tpl.weight,
      volume: tpl.volume,
      cargoType: tpl.cargoType,
      mode: 'road',
      price: Math.round((tpl.weight * 15 + tpl.volume * 120) * 1.2),
    });
    // Go to booking tab
    setActiveTab('request');
  };

  const triggerDocDownload = (docName: string) => {
    // Simulate downloading Excel/PDF
    const element = document.createElement("a");
    const fileContent = `
==================================================
LEV&AV LOGISTICS - КОРПОРАТИВНЫЙ ЛИЧНЫЙ КАБИНЕТ
Бухгалтерский реестр документов
Файл: ${docName}
==================================================
Статус верификации: Подтверждено ФНС (КЭП ООО "ЛЕВ ЭНД АВ")
Организация: ООО "Регион-Трейдинг" (ИНН: 7714829104)
Грузооборот за отчетный период: 1,450,000 руб.

Этот файл является юридически значимым отчетом.
    `;
    const file = new Blob([fileContent], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `${docName.replace(/\s+/g, '_')}_LEV_AV_Logistics.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in" id="personal-account-view">
      
      {/* Upper B2B User Profile block */}
      <div className="glass-card p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="h-14 w-14 bg-gold/5 border border-gold/20 flex items-center justify-center text-gold rounded-none">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 uppercase tracking-wider font-bold">B2B Партнер</span>
              <span className="text-[10px] font-mono text-[#555]">ID: 8829-LEVAV</span>
            </div>
            <h2 className="font-serif text-xl font-light text-white mt-1">ООО «Регион-Трейдинг»</h2>
            <p className="text-xs text-[#888] font-mono">Договор № ЛА-4829-B2B от 12.01.2025 (Действующий)</p>
          </div>
        </div>

        {/* Rapid summary metrics */}
        <div className="flex flex-wrap gap-4 sm:gap-6 text-xs" id="lk-metrics-bar">
          <div className="border-l border-white/10 pl-4 py-1">
            <span className="text-[#888] block uppercase tracking-wider text-[9px] font-semibold">Баланс ЭДО</span>
            <span className="text-sm font-bold text-white font-mono">14,200.00 ₽</span>
          </div>
          <div className="border-l border-white/10 pl-4 py-1">
            <span className="text-[#888] block uppercase tracking-wider text-[9px] font-semibold">Лимит овердрафта</span>
            <span className="text-sm font-bold text-gold font-mono">300,000 ₽</span>
          </div>
          <div className="border-l border-white/10 pl-4 py-1">
            <span className="text-[#888] block uppercase tracking-wider text-[9px] font-semibold">Активных грузов</span>
            <span className="text-sm font-bold text-white font-mono">{activeCargoesCount}</span>
          </div>
        </div>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="flex border-b border-white/10 mb-8" id="lk-tabs-nav">
        <button
          onClick={() => setLkSubTab('dashboard')}
          className={`py-3 px-5 text-xs font-bold uppercase tracking-widest border-b-2 transition ${
            lkSubTab === 'dashboard'
              ? 'border-gold text-gold'
              : 'border-transparent text-[#888] hover:text-white'
          }`}
        >
          Обзор и Отслеживание
        </button>
        <button
          onClick={() => setLkSubTab('finances')}
          className={`py-3 px-5 text-xs font-bold uppercase tracking-widest border-b-2 transition ${
            lkSubTab === 'finances'
              ? 'border-gold text-gold'
              : 'border-transparent text-[#888] hover:text-white'
          }`}
        >
          Бухгалтерия и Счета
        </button>
        <button
          onClick={() => setLkSubTab('templates')}
          className={`py-3 px-5 text-xs font-bold uppercase tracking-widest border-b-2 transition ${
            lkSubTab === 'templates'
              ? 'border-gold text-gold'
              : 'border-transparent text-[#888] hover:text-white'
          }`}
        >
          Шаблоны адресов ({templates.length})
        </button>
      </div>

      {/* Content Render Area */}
      <div>
        
        {/* SUBTAB 1: Dashboard & Active Shipments */}
        {lkSubTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="lk-dashboard-panel">
            
            {/* Active/Closed Deliveries list */}
            <div className="lg:col-span-8 glass-card p-6 shadow-xl">
              <h3 className="font-serif text-lg font-light text-white mb-6 flex items-center space-x-2">
                <Activity className="h-5 w-5 text-gold" />
                <span>Текущие и закрытые отправления</span>
              </h3>

              <div className="space-y-4">
                {shipments.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-white/10 text-xs text-[#888] uppercase tracking-wider font-light">
                    У вас пока нет оформленных заказов. Сделайте первый расчет в калькуляторе.
                  </div>
                ) : (
                  shipments.map((s) => (
                    <div 
                      key={s.id}
                      className="border border-white/5 bg-[#111]/40 p-4 hover:border-gold/30 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div>
                        <div className="flex items-center space-x-2.5">
                          <span className="font-mono text-sm font-bold text-white">{s.id}</span>
                          <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider ${
                            s.status === 'delivered' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : s.status === 'cancelled'
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : 'bg-gold/10 text-gold border border-gold/20 animate-pulse'
                          }`}>
                            {s.status === 'pending' && 'Ожидает'}
                            {s.status === 'sorting' && 'Сортировка'}
                            {s.status === 'in_transit' && 'В пути'}
                            {s.status === 'customs' && 'Таможня'}
                            {s.status === 'delivered' && 'Доставлен'}
                            {s.status === 'cancelled' && 'Отменен'}
                          </span>
                        </div>
                        <div className="text-xs text-white font-serif mt-1.5">{s.origin} &rarr; {s.destination}</div>
                        <div className="text-[10px] text-[#888] mt-1">Оформитель: <strong className="text-[#aaa]">{s.sender}</strong> | Груз: {s.cargoType} ({s.weight} кг, {s.volume} м³)</div>
                      </div>

                      <div className="flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-2.5 sm:pt-0">
                        <span className="text-xs text-[#888] font-mono">Тариф: <strong className="text-white font-bold">{s.price.toLocaleString('ru-RU')} ₽</strong></span>
                        <button
                          onClick={() => handleUseTemplate({
                            id: `tpl-${s.id}`,
                            name: `Копия ${s.id}`,
                            senderName: s.sender,
                            origin: s.origin,
                            recipientName: s.recipient,
                            destination: s.destination,
                            cargoType: s.cargoType,
                            weight: s.weight,
                            volume: s.volume
                          })}
                          className="text-[9px] uppercase tracking-widest font-bold text-gold hover:underline mt-1 cursor-pointer"
                        >
                          Повторить в 2 клика
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Side summary of corporate KPIs */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="glass-card p-5 shadow-xl space-y-4">
                <h4 className="text-[10px] font-mono text-gold uppercase tracking-widest font-bold">Статистика компании (ЛК)</h4>
                
                <div className="grid grid-cols-2 gap-3.5 text-center">
                  <div className="bg-[#111] p-3 border border-white/5">
                    <span className="text-[10px] text-[#888] block uppercase tracking-wider">Всего инвестировано</span>
                    <span className="text-sm font-bold text-white font-mono">{(totalSpend).toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="bg-[#111] p-3 border border-white/5">
                    <span className="text-[10px] text-[#888] block uppercase tracking-wider">Доставлено</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">{deliveredCargoesCount}</span>
                  </div>
                </div>

                <div className="text-xs text-[#888] leading-relaxed border-t border-white/5 pt-3.5 space-y-2">
                  <div className="flex justify-between">
                    <span>Уровень лояльности:</span>
                    <span className="text-gold font-bold">Бронзовый (Скидка 2%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Персональный логист:</span>
                    <span className="text-white">Константин В. (доб. 411)</span>
                  </div>
                </div>
              </div>

              {/* Direct secure TMS status block */}
              <div className="bg-gold/5 border border-gold/20 p-5 rounded-none text-xs text-[#888] leading-relaxed space-y-2.5">
                <div className="flex items-center space-x-1.5 text-gold font-bold">
                  <ShieldCheck className="h-4.5 w-4.5" />
                  <span className="uppercase tracking-wider text-[10px]">Интеграция с TMS активна</span>
                </div>
                <p>Ваш аккаунт полностью синхронизирован со складским терминалом 1С:WMS. Статусы обновляются в режиме реального времени.</p>
              </div>

            </div>

          </div>
        )}

        {/* SUBTAB 2: Finances Block */}
        {lkSubTab === 'finances' && (
          <div className="glass-card p-6 sm:p-8 shadow-xl" id="lk-finances-panel">
            <div className="border-b border-white/5 pb-4 mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h3 className="font-serif text-lg font-light text-white">Реестр закрывающих документов и счетов</h3>
                <p className="text-xs text-[#888] mt-1">Документы с электронной цифровой подписью (ЭЦП). Доступны для мгновенной выгрузки.</p>
              </div>
              <button 
                onClick={() => triggerDocDownload('Reconciliation_Report_Full_2026')}
                className="bg-gold hover:bg-gold-hover text-black px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition flex items-center space-x-1 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Полный сверка по всем ТС</span>
              </button>
            </div>

            <div className="divide-y divide-white/5">
              {mockDocs.map((doc) => (
                <div key={doc.id} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs font-mono">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-white/[0.02] border border-white/10 flex items-center justify-center text-gold flex-shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-gold font-bold block">{doc.id}</span>
                      <span className="text-white text-xs font-serif font-light mt-0.5 block">{doc.type}</span>
                      <span className="text-[#555] text-[10px] block mt-0.5">{doc.period} | Объем: {doc.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 justify-between sm:justify-end">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/20">
                      {doc.status}
                    </span>
                    <button 
                      onClick={() => triggerDocDownload(doc.type)}
                      className="border border-white/10 text-white hover:border-gold hover:text-gold p-1.5 rounded-none transition cursor-pointer"
                      title="Скачать в XML/TXT"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 3: Address Templates Database */}
        {lkSubTab === 'templates' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="lk-templates-panel">
            
            {/* Left list of address templates */}
            <div className="lg:col-span-8 glass-card p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-lg font-light text-white">Сохраненные шаблоны маршрутов</h3>
                <button
                  onClick={() => setShowAddTpl(!showAddTpl)}
                  className="bg-gold/5 border border-gold/20 hover:bg-gold/10 text-gold px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold transition flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                  <span>Новый шаблон</span>
                </button>
              </div>

              {/* Toggle Form to Add Template */}
              {showAddTpl && (
                <form onSubmit={handleAddTemplate} className="border border-gold/20 bg-gold/[0.02] p-4.5 mb-6 space-y-4">
                  <h4 className="text-[10px] font-mono text-gold uppercase tracking-widest font-bold">Конфигуратор нового шаблона</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[9px] text-[#888] uppercase tracking-wider mb-1">Название шаблона</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Например, Офис Спб"
                        value={newTplName}
                        onChange={(e) => setNewTplName(e.target.value)}
                        className="w-full bg-dark-bg border border-white/10 text-xs p-2 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-[#888] uppercase tracking-wider mb-1">Пункт отправки</label>
                      <select 
                        value={newTplOrigin}
                        onChange={(e) => setNewTplOrigin(e.target.value)}
                        className="w-full bg-dark-bg border border-white/10 text-xs p-2 text-white outline-none"
                      >
                        <option value="Москва">Москва</option>
                        <option value="Санкт-Петербург">Санкт-Петербург</option>
                        <option value="Екатеринбург">Екатеринбург</option>
                        <option value="Новосибирск">Новосибирск</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] text-[#888] uppercase tracking-wider mb-1">Пункт получения</label>
                      <select 
                        value={newTplDest}
                        onChange={(e) => setNewTplDest(e.target.value)}
                        className="w-full bg-dark-bg border border-white/10 text-xs p-2 text-white outline-none"
                      >
                        <option value="Москва">Москва</option>
                        <option value="Санкт-Петербург">Санкт-Петербург</option>
                        <option value="Екатеринбург">Екатеринбург</option>
                        <option value="Новосибирск">Новосибирск</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] text-[#888] uppercase tracking-wider mb-1">Примерный вес (кг)</label>
                      <input 
                        type="number"
                        value={newTplWeight}
                        onChange={(e) => setNewTplWeight(parseInt(e.target.value) || 100)}
                        className="w-full bg-dark-bg border border-white/10 text-xs p-2 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-[#888] uppercase tracking-wider mb-1">Объем (м³)</label>
                      <input 
                        type="number"
                        step="0.1"
                        value={newTplVolume}
                        onChange={(e) => setNewTplVolume(parseFloat(e.target.value) || 1)}
                        className="w-full bg-dark-bg border border-white/10 text-xs p-2 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs">
                    <button 
                      type="button" 
                      onClick={() => setShowAddTpl(false)}
                      className="px-3 py-1.5 text-[#888] hover:text-white uppercase tracking-wider text-[10px]"
                    >
                      Отмена
                    </button>
                    <button 
                      type="submit"
                      className="bg-gold text-black px-4 py-1.5 uppercase tracking-widest font-bold text-[10px]"
                    >
                      Сохранить шаблон
                    </button>
                  </div>
                </form>
              )}

              {/* Templates loop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {templates.map((tpl) => (
                  <div 
                    key={tpl.id}
                    onClick={() => handleUseTemplate(tpl)}
                    className="border border-white/10 bg-[#111]/30 p-5 cursor-pointer hover:border-gold/50 hover:bg-[#111]/60 transition flex flex-col justify-between group h-44 text-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-light text-white group-hover:text-gold transition">{tpl.name}</span>
                        <button 
                          onClick={(e) => handleDeleteTemplate(tpl.id, e)}
                          className="text-[#444] hover:text-red-400 p-1"
                          title="Удалить шаблон"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      
                      <div className="font-serif text-white mt-3.5 flex items-center space-x-1.5">
                        <MapPin className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                        <span>{tpl.origin} &rarr; {tpl.destination}</span>
                      </div>
                      
                      <div className="font-mono text-[10px] text-[#888] mt-1.5">
                        Отправитель: {tpl.senderName} <br />
                        Груз: {tpl.cargoType} ({tpl.weight} кг, {tpl.volume} м³)
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gold opacity-80 group-hover:opacity-100">
                      <span>Оформить в 2 клика</span>
                      <ArrowRight className="h-3 w-3 transition transform group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Helper block for Cargo templates */}
            <div className="lg:col-span-4 glass-card p-5 space-y-4">
              <h4 className="text-[10px] font-mono text-gold uppercase tracking-widest font-bold">Инструкция по работе</h4>
              <p className="text-xs text-[#888] leading-relaxed">
                Шаблоны позволяют B2B-клиентам минимизировать время на заполнение реквизитов доставки. Кликнув по любой плитке шаблона, вы автоматически предзаполняете параметры калькулятора и переходите к подтверждению накладной в 2 клика.
              </p>
              <div className="bg-[#111] p-3 border border-white/5 font-mono text-[10px] text-[#555] leading-relaxed">
                <Bookmark className="h-4 w-4 text-gold mb-1" />
                <span>Вы можете сохранять до 50 шаблонов частых адресов и привязывать к ним уникальные SKU ваших товаров.</span>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
