import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CompanyHistory from './components/CompanyHistory';
import FleetSection from './components/FleetSection';
import GeographySection from './components/GeographySection';
import RequisitesSection from './components/RequisitesSection';
import Footer from './components/Footer';
import { Phone, X, Send, Check, MessageCircle, Mail, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';

function AppContent() {
  const { t, lang } = useLanguage();
  // Floating contact modal state
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactRoute, setContactRoute] = useState('');
  const [contactWeight, setContactWeight] = useState('');
  const [isContactSuccess, setIsContactSuccess] = useState(false);
  const [showMessengerMenu, setShowMessengerMenu] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim() && contactPhone.trim()) {
      setIsContactSuccess(true);
    }
  };

  const handleSendTelegram = () => {
    const text = encodeURIComponent(
      `🚚 Новая заявка с сайта LEV&AV Logistics:\n` +
      `👤 Имя / Компания: ${contactName || 'Не указано'}\n` +
      `📞 Телефон: ${contactPhone}\n` +
      `📍 Маршрут: ${contactRoute || 'Требуется консультация'}\n` +
      `⚖️ Вес / Объем: ${contactWeight || 'По запросу'}`
    );
    window.open(`https://t.me/+37499902007?text=${text}`, '_blank');
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Здравствуйте! Заявка на расчет перевозки LEV&AV:\n` +
      `Имя: ${contactName}\n` +
      `Телефон: ${contactPhone}\n` +
      `Маршрут: ${contactRoute || 'Консультация'}\n` +
      `Параметры груза: ${contactWeight || '-'}`
    );
    window.open(`https://wa.me/37499902007?text=${text}`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Заявка на грузоперевозку: ${contactRoute || 'Консультация'}`);
    const body = encodeURIComponent(
      `Имя / Компания: ${contactName}\n` +
      `Телефон: ${contactPhone}\n` +
      `Маршрут: ${contactRoute}\n` +
      `Вес / Объем: ${contactWeight}\n`
    );
    window.location.href = `mailto:levavlogistics@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#08090b] text-[#f0f0f0] flex flex-col justify-between" id="app-root-container">
      {/* Subtle Corporate Preloader */}
      <Preloader minDuration={900} />

      <div>
        {/* Navigation */}
        <Navbar onContactClick={() => setIsContactOpen(true)} />

        {/* Core Presentation Content */}
        <main className="flex-grow">
          {/* Main Hero Presentation */}
          <Hero onContactClick={() => setIsContactOpen(true)} />

          {/* Dedicated Company History & Milestones */}
          <CompanyHistory />

          {/* Vehicle Fleet & Equipment */}
          <FleetSection />

          {/* Geography & International Transport Corridors (Europe, China, CIS) */}
          <GeographySection
            onRequestRouteQuote={(routeName) => {
              setContactRoute(routeName);
              setIsContactOpen(true);
            }}
          />

          {/* Official Company Requisites Card */}
          <RequisitesSection />
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Multi-channel Floating Quick Connect Panel */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3" id="floating-cta-container">
        {showMessengerMenu && (
          <div className="bg-[#111318] border-2 border-orange-500 p-3 shadow-2xl space-y-2 text-xs font-mono animate-fade-in mb-1">
            <div className="text-[10px] text-orange-400 font-bold uppercase tracking-wider px-2 pb-1 border-b border-white/10">
              {lang === 'ru' ? 'Быстрая связь 24/7' : 'Quick Connect 24/7'}
            </div>
            <a
              href="https://t.me/+37499902007"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2.5 px-3 py-2 bg-white/5 hover:bg-orange-500 hover:text-black transition text-orange-400 font-bold"
            >
              <Send className="h-4 w-4" />
              <span>Telegram (+374 99 902007)</span>
            </a>
            <a
              href="https://wa.me/37494902007"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2.5 px-3 py-2 bg-white/5 hover:bg-emerald-500 hover:text-black transition text-emerald-400 font-bold"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp (+374 94 902007)</span>
            </a>
            <a
              href="tel:+37494902007"
              className="flex items-center space-x-2.5 px-3 py-2 bg-white/5 hover:bg-white/20 transition text-white font-bold"
            >
              <PhoneCall className="h-4 w-4 text-orange-500" />
              <span>{lang === 'ru' ? 'Позвонить директору' : 'Call Director'}</span>
            </a>
            <button
              onClick={() => {
                setShowMessengerMenu(false);
                setIsContactOpen(true);
              }}
              className="w-full text-left flex items-center space-x-2.5 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-black font-extrabold uppercase transition cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              <span>{lang === 'ru' ? 'Заявка на расчет' : 'Request Quote Form'}</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setShowMessengerMenu(!showMessengerMenu)}
          className="flex h-14 w-14 items-center justify-center bg-orange-500 hover:bg-orange-600 text-black shadow-2xl transition-transform duration-200 group cursor-pointer hover:scale-105 border-2 border-orange-400"
          title={t.modal.title}
          id="floating-cta-button"
        >
          <Phone className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300 fill-current" />
        </button>
      </div>

      {/* Contact & Route Quote Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4" id="callback-modal-overlay">
          <div className="relative w-full max-w-lg bg-[#111318] border-2 border-orange-500 p-6 sm:p-8 shadow-2xl animate-fade-in text-white">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setIsContactOpen(false);
                setIsContactSuccess(false);
              }}
              className="absolute top-4 right-4 text-[#888] hover:text-white transition cursor-pointer p-1"
              id="close-callback-modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="border-b border-white/10 pb-4 mb-5">
              <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest font-extrabold block">
                {lang === 'ru' ? 'ПРЯМОЙ РАСЧЕТ И ЭКСПЕДИРОВАНИЕ' : 'DIRECT QUOTE & DISPATCH'}
              </span>
              <h3 className="font-serif text-2xl font-bold uppercase text-white mt-1">
                {lang === 'ru' ? 'Запрос ставки на перевозку' : 'Freight Rate Request'}
              </h3>
              <p className="text-xs text-[#aaa] mt-1 font-mono">
                {lang === 'ru' 
                  ? 'Ответим за 10–15 минут с точной ставкой, графиком рейсов и условиями ЕАЭС / TIR.' 
                  : 'Fast response within 10–15 mins with exact quote, timetable and EAEU/TIR conditions.'}
              </p>
            </div>

            {isContactSuccess ? (
              <div className="space-y-5 py-3 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Check className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="text-base font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    {lang === 'ru' ? 'Заявка сформирована!' : 'Request Prepared!'}
                  </h4>
                  <p className="text-xs text-[#bbb] mt-2 leading-relaxed font-mono">
                    {lang === 'ru' 
                      ? 'Отправьте данные напрямую дежурному логисту в один клик для мгновенного ответа:' 
                      : 'Send directly to the dispatch officer in 1-click for immediate confirmation:'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleSendTelegram}
                    className="bg-[#1e2330] hover:bg-orange-500 hover:text-black border border-white/15 text-orange-400 py-3 px-3 text-xs font-mono font-bold uppercase flex items-center justify-center space-x-2 transition cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>Telegram (+374 99)</span>
                  </button>

                  <button
                    onClick={handleSendWhatsApp}
                    className="bg-[#1e2330] hover:bg-emerald-500 hover:text-black border border-white/15 text-emerald-400 py-3 px-3 text-xs font-mono font-bold uppercase flex items-center justify-center space-x-2 transition cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp (+374 94)</span>
                  </button>

                  <button
                    onClick={handleSendEmail}
                    className="bg-[#1e2330] hover:bg-white/20 border border-white/15 text-white py-3 px-3 text-xs font-mono font-bold uppercase flex items-center justify-center space-x-2 transition cursor-pointer sm:col-span-2"
                  >
                    <Mail className="h-4 w-4 text-orange-400" />
                    <span>Отправить на levavlogistics@gmail.com</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setIsContactOpen(false);
                    setIsContactSuccess(false);
                    setContactName('');
                    setContactPhone('');
                    setContactRoute('');
                    setContactWeight('');
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black text-xs font-mono uppercase tracking-widest py-3 font-black transition cursor-pointer mt-4"
                >
                  {lang === 'ru' ? 'Закрыть окно' : 'Close Window'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-mono font-bold text-[#888] uppercase tracking-wider mb-1.5">
                    {lang === 'ru' ? 'Ваше имя / Компания *' : 'Name / Company *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ru' ? 'Например: ООО «ТоргСнаб» / Армен' : 'e.g., Cargo Corp / John'}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#08090b] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-[#555] outline-none focus:border-orange-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-mono font-bold text-[#888] uppercase tracking-wider mb-1.5">
                      {lang === 'ru' ? 'Телефон / Мессенджер *' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 / +374 ..."
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-[#08090b] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-[#555] outline-none focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono font-bold text-[#888] uppercase tracking-wider mb-1.5">
                      {lang === 'ru' ? 'Вес / Объем груза' : 'Weight / Volume'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'ru' ? '20 тонн, 86 м³, 33 паллеты' : '20 tons, 86 m³'}
                      value={contactWeight}
                      onChange={(e) => setContactWeight(e.target.value)}
                      className="w-full bg-[#08090b] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-[#555] outline-none focus:border-orange-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono font-bold text-[#888] uppercase tracking-wider mb-1.5">
                    {lang === 'ru' ? 'Маршрут и тип груза' : 'Route & Cargo Type'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'ru' ? 'Ереван → Москва (Тент / Рефрижератор)' : 'Yerevan → Moscow (Reefer / Tent)'}
                    value={contactRoute}
                    onChange={(e) => setContactRoute(e.target.value)}
                    className="w-full bg-[#08090b] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-[#555] outline-none focus:border-orange-500 font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-black font-mono font-black text-xs uppercase tracking-widest py-3.5 transition flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{lang === 'ru' ? 'Рассчитать ставку за 15 минут' : 'Calculate Freight Rate'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-[#777] font-mono pt-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{lang === 'ru' ? 'Гарантируем сохранность данных и расчет без спама' : 'Strict NDA & direct carrier rates'}</span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
