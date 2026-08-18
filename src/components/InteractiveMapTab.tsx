import React, { useState } from 'react';
import { CITY_TERMINALS } from '../data';
import { CityTerminal } from '../types';
import RoutePlanner from './RoutePlanner';
import { Map, MapPin, Building, Globe, Zap, ArrowRight } from 'lucide-react';

interface InteractiveMapTabProps {
  onPreFillBooking: (data: {
    origin: string;
    destination: string;
    weight: number;
    volume: number;
    cargoType: string;
    mode: 'road' | 'air' | 'sea' | 'rail';
    price: number;
  }) => void;
  setActiveTab: (tab: string) => void;
}

export default function InteractiveMapTab({ onPreFillBooking, setActiveTab }: InteractiveMapTabProps) {
  const [selectedTerminalName, setSelectedTerminalName] = useState('Москва');

  const selectedTerminal = CITY_TERMINALS.find((t) => t.name === selectedTerminalName) || CITY_TERMINALS[0];

  // Helper stats for each terminal to make them feel highly authentic and alive
  const getTerminalDetails = (name: string) => {
    switch (name) {
      case 'Москва':
        return {
          capacity: '85,000 м³/сутки',
          employees: 124,
          type: 'Региональный Распределительный Хаб А++',
          phone: '+7 (495) 555-01-01',
          rating: '9.9/10',
        };
      case 'Санкт-Петербург':
        return {
          capacity: '42,000 м³/сутки',
          employees: 78,
          type: 'Морской портовый терминал',
          phone: '+7 (812) 555-02-02',
          rating: '9.8/10',
        };
      case 'Екатеринбург':
        return {
          capacity: '30,000 м³/сутки',
          employees: 45,
          type: 'Транзитно-сортировочный узел Урала',
          phone: '+7 (343) 555-03-03',
          rating: '9.7/10',
        };
      case 'Новосибирск':
        return {
          capacity: '38,000 м³/сутки',
          employees: 56,
          type: 'Сибирский логистический центр',
          phone: '+7 (383) 555-04-04',
          rating: '9.8/10',
        };
      case 'Владивосток':
        return {
          capacity: '55,000 м³/сутки',
          employees: 92,
          type: 'Тихоокеанский мультимодальный хаб',
          phone: '+7 (423) 555-05-05',
          rating: '9.6/10',
        };
      case 'Краснодар':
        return {
          capacity: '25,000 м³/сутки',
          employees: 38,
          type: 'Южный распределительный узел',
          phone: '+7 (861) 555-06-06',
          rating: '9.7/10',
        };
      case 'Калининград':
        return {
          capacity: '12,000 м³/сутки',
          employees: 22,
          type: 'Балтийский анклавный терминал',
          phone: '+7 (401) 555-07-07',
          rating: '9.5/10',
        };
      case 'Минск':
        return {
          capacity: '18,000 м³/сутки',
          employees: 28,
          type: 'Европейский транзитный коридор',
          phone: '+375 (17) 555-08-08',
          rating: '9.7/10',
        };
      case 'Алматы':
        return {
          capacity: '28,000 м³/сутки',
          employees: 40,
          type: 'Центральноазиатский распределительный хаб',
          phone: '+7 (727) 555-09-09',
          rating: '9.6/10',
        };
      default:
        return {
          capacity: '15,000 м³/сутки',
          employees: 20,
          type: 'Грузовой терминал класса А',
          phone: '+7 (800) 555-35-35',
          rating: '9.5/10',
        };
    }
  };

  const details = getTerminalDetails(selectedTerminalName);

  const handleCreateRouteFromHere = (isOrigin: boolean) => {
    onPreFillBooking({
      origin: isOrigin ? selectedTerminalName : 'Москва',
      destination: isOrigin ? 'Новосибирск' : selectedTerminalName,
      weight: 150,
      volume: 1.0,
      cargoType: 'Генеральный груз',
      mode: 'road',
      price: 18500,
    });
    setActiveTab('calculator');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" id="interactive-map-view">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="font-serif italic text-gold text-base block mb-1">География хабов LEV&AV</span>
        <h1 className="font-serif text-3xl font-light text-white tracking-tight sm:text-4xl">
          География перевозок
        </h1>
        <p className="text-[#888] mt-2 text-xs sm:text-sm uppercase tracking-wider">
          Интерактивная топологическая схема наших ключевых логистических хабов, таможенных складов и транзитных коридоров.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Dynamic Vector Map (Left Panel) */}
        <div className="lg:col-span-8 glass-card rounded-none shadow-xl overflow-hidden relative flex flex-col min-h-[400px]">
          <div className="flex-1 min-h-[350px]">
            <RoutePlanner activeShipment={null} customOrigin={selectedTerminalName} customDestination={selectedTerminalName === 'Новосибирск' ? 'Москва' : 'Новосибирск'} />
          </div>
        </div>

        {/* Info Sidebar (Right Panel) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Terminals list dropdown/selection */}
          <div className="glass-card rounded-none p-5 shadow-xl">
            <label className="block text-xs font-semibold text-[#888] mb-2 uppercase tracking-wider">Выберите терминал</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
              {CITY_TERMINALS.map((terminal) => {
                const isSelected = selectedTerminalName === terminal.name;
                return (
                  <button
                    key={`map-sel-${terminal.name}`}
                    type="button"
                    onClick={() => setSelectedTerminalName(terminal.name)}
                    className={`rounded-none px-3.5 py-2 text-xs font-semibold transition text-left truncate flex items-center space-x-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-gold text-black shadow-md shadow-gold/10'
                        : 'border border-white/5 bg-dark-bg text-[#888] hover:bg-[#111] hover:text-white hover:border-white/10'
                    }`}
                  >
                    <MapPin className={`h-3 w-3 ${isSelected ? 'text-black' : 'text-[#444]'}`} />
                    <span>{terminal.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Terminal details board */}
          <div className="glass-card rounded-none p-6 shadow-xl flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-white/5 pb-4">
                <div>
                  <span className="font-mono text-[10px] font-bold text-gold uppercase tracking-widest">{selectedTerminal.country}</span>
                  <h3 className="font-serif text-xl font-light text-white mt-0.5">{selectedTerminal.name} Hub</h3>
                </div>
                <div className="bg-gold/5 border border-gold/20 rounded-none px-2.5 py-1 text-center font-mono">
                  <span className="block text-[8px] text-[#888] font-bold uppercase leading-none">РЕЙТИНГ</span>
                  <span className="text-sm font-extrabold text-gold leading-none block mt-1">{details.rating}</span>
                </div>
              </div>

              {/* Specs Rows */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2.5 text-[#888]">
                  <Building className="h-4.5 w-4.5 text-gold flex-shrink-0" />
                  <div>
                    <span className="block text-[10px] text-[#555] uppercase tracking-wider font-semibold">Категория центра</span>
                    <span className="font-semibold text-white">{details.type}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 text-[#888]">
                  <Zap className="h-4.5 w-4.5 text-gold flex-shrink-0" />
                  <div>
                    <span className="block text-[10px] text-[#555] uppercase tracking-wider font-semibold">Суточный грузооборот</span>
                    <span className="font-semibold text-white">{details.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 text-[#888]">
                  <Globe className="h-4.5 w-4.5 text-gold flex-shrink-0" />
                  <div>
                    <span className="block text-[10px] text-[#555] uppercase tracking-wider font-semibold">Обслуживающий персонал</span>
                    <span className="font-semibold text-white">{details.employees} специалистов</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hub Pre-fill actions */}
            <div className="pt-5 border-t border-white/5 space-y-2">
              <button
                onClick={() => handleCreateRouteFromHere(true)}
                className="w-full rounded-none bg-gold hover:bg-gold-hover text-black font-bold text-xs uppercase tracking-widest py-3.5 transition flex items-center justify-center space-x-1 hover:cursor-pointer"
              >
                <span>Отправить груз из г. {selectedTerminal.name}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handleCreateRouteFromHere(false)}
                className="w-full rounded-none border border-white/10 hover:border-white/20 bg-[#111] text-[#888] hover:text-white font-bold text-xs uppercase tracking-widest py-3.5 transition cursor-pointer"
              >
                Направить груз в г. {selectedTerminal.name}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
