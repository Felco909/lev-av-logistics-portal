import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Truck, CheckCircle2, DollarSign, Calendar, Clock, Key, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';

interface CarriersProps {
  setActiveTab: (tab: string) => void;
}

export default function Carriers({ setActiveTab }: CarriersProps) {
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [truckType, setTruckType] = useState('tilt_20t');
  const [driverCity, setDriverCity] = useState('Москва');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (driverName.trim() && driverPhone.trim()) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setDriverName('');
        setDriverPhone('');
      }, 5000);
    }
  };

  const carrierTariffs = [
    { type: 'Тягач 20 тонн (Рефрижератор)', rate: '75-92 ₽ / км', routes: 'Мск - Спб, Мск - Сибирь', status: 'Высокий спрос' },
    { type: 'Тягач 20 тонн (Тент / Штора)', rate: '58-72 ₽ / км', routes: 'Екатеринбург - Новосибирск', status: 'Нормальный спрос' },
    { type: 'Малотоннажный 5-10 тонн (Будка)', rate: '42-55 ₽ / км', routes: 'Региональный развоз хабов', status: 'Срочный забор' },
    { type: 'Газель / Спринтер до 3.5 тонн', rate: '28-35 ₽ / км', routes: 'Внутригородская доставка', status: 'Умеренно' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in" id="carriers-view">
      
      {/* Hero Intro */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="font-serif italic text-gold text-base block mb-1">Транспортным компаниям и водителям</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
          Станьте партнером LEV&AV
        </h1>
        <p className="text-[#888] mt-3 text-sm sm:text-base leading-relaxed">
          Приглашаем собственников коммерческого транспорта и логистические компании к долгосрочному сотрудничеству. Обеспечиваем стабильный поток загрузок, быстрые выплаты без задержек и скидки на топливо.
        </p>
      </div>

      {/* Main Grid: Info Tariffs (Left) vs Application Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
        
        {/* Left column: Terms, Tariffs and regular routes */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-none shadow-xl">
            <h2 className="font-serif text-xl font-light text-white mb-6 flex items-center space-x-2">
              <Truck className="h-5 w-5 text-gold" />
              <span>Базовые тарифы на перевозку для владельцев ТС</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-[#888] uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Класс грузовика</th>
                    <th className="pb-3 font-semibold">Ставка за км</th>
                    <th className="pb-3 font-semibold">Приоритетные линии</th>
                    <th className="pb-3 font-semibold text-right">Потребность</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white">
                  {carrierTariffs.map((tariff, index) => (
                    <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-4 pr-3 text-sm font-serif font-light text-white">{tariff.type}</td>
                      <td className="py-4 text-gold font-bold">{tariff.rate}</td>
                      <td className="py-4 text-[#888]">{tariff.routes}</td>
                      <td className="py-4 text-right">
                        <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-none uppercase tracking-wider ${
                          tariff.status === 'Высокий спрос' || tariff.status === 'Срочный забор'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-gold/10 text-gold border border-gold/20'
                        }`}>
                          {tariff.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[10px] text-[#555] mt-4 font-mono leading-relaxed">
              * Тарифы указаны без учета НДС. Для перевозчиков на ОСНО действует повышающий коэффициент +20%. Оплата порожнего пробега до точки погрузки компенсируется по согласованию с координатором.
            </p>
          </div>

          {/* Benefits Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="glass-card p-5 rounded-none">
              <div className="flex h-9 w-9 items-center justify-center bg-gold/5 border border-gold/20 text-gold mb-3.5">
                <DollarSign className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Оплата за 3 дня</h4>
              <p className="text-xs text-[#888] leading-relaxed">Быстрый расчет сразу после предоставления оригиналов или скан-копий ТТН/ТН.</p>
            </div>

            <div className="glass-card p-5 rounded-none">
              <div className="flex h-9 w-9 items-center justify-center bg-gold/5 border border-gold/20 text-gold mb-3.5">
                <Calendar className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Топливные карты</h4>
              <p className="text-xs text-[#888] leading-relaxed">Скидка до 7% на ДТ на брендовых АЗС (Газпромнефть, Роснефть, Лукойл) по всей РФ.</p>
            </div>

            <div className="glass-card p-5 rounded-none">
              <div className="flex h-9 w-9 items-center justify-center bg-gold/5 border border-gold/20 text-gold mb-3.5">
                <Clock className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Диспетчер 24/7</h4>
              <p className="text-xs text-[#888] leading-relaxed">Круглосуточная поддержка водителей на маршруте, оперативная замена и помощь.</p>
            </div>

          </div>
        </div>

        {/* Right column: Partnership Application Form */}
        <div className="lg:col-span-5 glass-card p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="border-b border-white/5 pb-4 mb-5">
              <span className="text-[10px] font-mono text-gold uppercase tracking-widest font-bold">ОТДЕЛ ПРИВЛЕЧЕНИЯ ТРАНСПОРТА</span>
              <h3 className="font-serif text-xl font-light text-white mt-1">Анкета перевозчика</h3>
              <p className="text-xs text-[#888] mt-1.5 leading-relaxed">
                Заполните краткую заявку. Наш специалист перезвонит вам в течение 15 минут для обсуждения тарифов и проверки документов.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">ФИО / Название компании</label>
                <input
                  type="text"
                  required
                  placeholder="ИП Смирнов А.В. или Алексей Смирнов"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-[#444] outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Контактный телефон</label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-[#444] outline-none focus:border-gold font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Тип вашего транспортного средства</label>
                <select
                  value={truckType}
                  onChange={(e) => setTruckType(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-gold"
                >
                  <option value="tilt_20t" className="bg-dark-card text-white">Еврофура 20 тонн (Тент / Борт)</option>
                  <option value="ref_20t" className="bg-dark-card text-white">Рефрижератор 20 тонн (-20°C...+12°C)</option>
                  <option value="truck_10t" className="bg-dark-card text-white">Грузовик 5-10 тонн (Будка / Штора)</option>
                  <option value="light_3t" className="bg-dark-card text-white">Малотоннажный до 3.5 тонн (Газель)</option>
                  <option value="fleet" className="bg-dark-card text-white">Собственный парк машин (Транспортная компания)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#888] mb-1.5 uppercase tracking-wider">Базовый город стоянки</label>
                <input
                  type="text"
                  value={driverCity}
                  onChange={(e) => setDriverCity(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-gold"
                />
              </div>

              {success && (
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-3.5 rounded-none flex items-start space-x-2.5">
                  <UserCheck className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Заявка принята!</h5>
                    <p className="text-[10px] text-emerald-400/80 leading-relaxed mt-0.5">
                      Менеджер по привлечению транспорта свяжется с вами по номеру <strong className="text-white">{driverPhone}</strong> в течение 15 минут. Спасибо за интерес к LEV&AV LLC.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-hover text-black font-bold text-xs uppercase tracking-widest py-4 transition flex items-center justify-center space-x-1.5 hover:cursor-pointer"
              >
                <span>Отправить заявку на сотрудничество</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="mt-6 pt-5 border-t border-white/5 text-[10px] text-[#555] font-mono leading-relaxed flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
            <span>
              Для заключения договора потребуется базовый пакет документов (ОГРН/ОГРНИП, ИНН, ПТС/СТС на сцепку, водительское удостоверение, паспорт собственника). Все данные проходят проверку службой безопасности.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
