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
  const t3 = (ru: string, en: string, hy: string) => (lang === 'ru' ? ru : lang === 'hy' ? hy : en);
  // Floating contact modal state
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactRoute, setContactRoute] = useState('');
  const [contactWeight, setContactWeight] = useState('');
  const [isContactSuccess, setIsContactSuccess] = useState(false);
  const [autoSendBlocked, setAutoSendBlocked] = useState(false);
  const [showMessengerMenu, setShowMessengerMenu] = useState(false);

  const handleSendTelegram = () => {
    const text = encodeURIComponent(
      lang === 'ru'
        ? `🚚 Новая заявка с сайта LEV&AV Logistics:\n` +
          `👤 Имя / Компания: ${contactName || 'Не указано'}\n` +
          `📞 Телефон: ${contactPhone}\n` +
          `📍 Маршрут: ${contactRoute || 'Требуется консультация'}\n` +
          `⚖️ Вес / Объем: ${contactWeight || 'По запросу'}`
        : lang === 'hy'
          ? `🚚 Նոր հայտ LEV&AV Logistics կայքից.\n` +
            `👤 Անուն / Ընկերություն: ${contactName || 'Նշված չէ'}\n` +
            `📞 Հեռախոս: ${contactPhone}\n` +
            `📍 Երթուղի: ${contactRoute || 'Անհրաժեշտ է խորհրդատվություն'}\n` +
            `⚖️ Քաշ / Ծավալ: ${contactWeight || 'Ըստ պահանջի'}`
          : `🚚 New request from LEV&AV Logistics website:\n` +
            `👤 Name / Company: ${contactName || 'Not specified'}\n` +
            `📞 Phone: ${contactPhone}\n` +
            `📍 Route: ${contactRoute || 'Consultation needed'}\n` +
            `⚖️ Weight / Volume: ${contactWeight || 'On request'}`
    );
    return window.open(`https://t.me/+37499902007?text=${text}`, '_blank');
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      lang === 'ru'
        ? `Здравствуйте! Заявка на расчет перевозки LEV&AV:\n` +
          `Имя: ${contactName}\n` +
          `Телефон: ${contactPhone}\n` +
          `Маршрут: ${contactRoute || 'Консультация'}\n` +
          `Параметры груза: ${contactWeight || '-'}`
        : lang === 'hy'
          ? `Բարև Ձեզ! Հայտ՝ LEV&AV փոխադրման հաշվարկի համար.\n` +
            `Անուն: ${contactName}\n` +
            `Հեռախոս: ${contactPhone}\n` +
            `Երթուղի: ${contactRoute || 'Խորհրդատվություն'}\n` +
            `Բեռի պարամետրեր: ${contactWeight || '-'}`
          : `Hello! Freight quote request for LEV&AV:\n` +
            `Name: ${contactName}\n` +
            `Phone: ${contactPhone}\n` +
            `Route: ${contactRoute || 'Consultation'}\n` +
            `Cargo details: ${contactWeight || '-'}`
    );
    return window.open(`https://wa.me/37499902007?text=${text}`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(
      t3(
        `Заявка на грузоперевозку: ${contactRoute || 'Консультация'}`,
        `Freight request: ${contactRoute || 'Consultation'}`,
        `Հայտ բեռնափոխադրման համար: ${contactRoute || 'Խորհրդատվություն'}`
      )
    );
    const body = encodeURIComponent(
      lang === 'ru'
        ? `Имя / Компания: ${contactName}\n` +
          `Телефон: ${contactPhone}\n` +
          `Маршрут: ${contactRoute}\n` +
          `Вес / Объем: ${contactWeight}\n`
        : lang === 'hy'
          ? `Անուն / Ընկերություն: ${contactName}\n` +
            `Հեռախոս: ${contactPhone}\n` +
            `Երթուղի: ${contactRoute}\n` +
            `Քաշ / Ծավալ: ${contactWeight}\n`
          : `Name / Company: ${contactName}\n` +
            `Phone: ${contactPhone}\n` +
            `Route: ${contactRoute}\n` +
            `Weight / Volume: ${contactWeight}\n`
    );
    window.location.href = `mailto:levavlogistics@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim() && contactPhone.trim()) {
      // Fire both messenger deep links right away so the lead survives even if
      // the visitor only has one of the two apps, or never touches the manual
      // buttons on the success screen.
      const tgWindow = handleSendTelegram();
      const waWindow = handleSendWhatsApp();
      const bothBlocked = !tgWindow && !waWindow;

      // window.open silently returns null when the browser's pop-up blocker
      // kicks in — that used to fail without any trace. If it happens here,
      // fall back to mailto, which is a same-tab protocol navigation and
      // isn't subject to pop-up blocking, so the lead still goes out.
      if (bothBlocked) {
        handleSendEmail();
      }

      setAutoSendBlocked(bothBlocked);
      setIsContactSuccess(true);
    }
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
              {t3('Быстрая связь 24/7', 'Quick Connect 24/7', 'Արագ կապ 24/7')}
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
              <span>{t3('Позвонить директору', 'Call Director', 'Զանգահարել տնօրենին')}</span>
            </a>
            <button
              onClick={() => {
                setShowMessengerMenu(false);
                setIsContactOpen(true);
              }}
              className="w-full text-left flex items-center space-x-2.5 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-black font-extrabold uppercase transition cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              <span>{t3('Заявка на расчет', 'Request Quote Form', 'Հայտ հաշվարկի համար')}</span>
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
                setAutoSendBlocked(false);
              }}
              className="absolute top-4 right-4 text-[#888] hover:text-white transition cursor-pointer p-1"
              id="close-callback-modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="border-b border-white/10 pb-4 mb-5">
              <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest font-extrabold block">
                {t3('ПРЯМОЙ РАСЧЕТ И ЭКСПЕДИРОВАНИЕ', 'DIRECT QUOTE & DISPATCH', 'ՈՒՂԻՂ ՀԱՇՎԱՐԿ ԵՎ ԷՔՍՊԵԴԻՏՈՐԱԿԱՆ ԾԱՌԱՅՈՒԹՅՈՒՆ')}
              </span>
              <h3 className="font-serif text-2xl font-bold uppercase text-white mt-1">
                {t3('Запрос ставки на перевозку', 'Freight Rate Request', 'Փոխադրման սակագնի հարցում')}
              </h3>
              <p className="text-xs text-[#aaa] mt-1 font-mono">
                {t3(
                  'Ответим за 10–15 минут с точной ставкой, графиком рейсов и условиями ЕАЭС / TIR.',
                  'Fast response within 10–15 mins with exact quote, timetable and EAEU/TIR conditions.',
                  'Կպատասխանենք 10–15 րոպեում՝ ճշգրիտ սակագնով, երթերի գրաֆիկով և ԵԱՏՄ / TIR պայմաններով։'
                )}
              </p>
            </div>

            {isContactSuccess ? (
              <div className="space-y-5 py-3 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Check className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="text-base font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    {t3('Заявка сформирована!', 'Request Prepared!', 'Հայտը ձևավորված է!')}
                  </h4>
                  <p className="text-xs text-[#bbb] mt-2 leading-relaxed font-mono">
                    {autoSendBlocked
                      ? t3(
                          'Браузер заблокировал всплывающие окна, поэтому мы открыли черновик письма на levavlogistics@gmail.com — просто нажмите «Отправить» в почтовом клиенте. Либо разрешите всплывающие окна и нажмите одну из кнопок ниже:',
                          'Your browser blocked pop-ups, so we opened a draft email to levavlogistics@gmail.com instead — just hit "Send" in your mail app. Or allow pop-ups and use a button below:',
                          'Բրաուզերն արգելափակել է թռուցիկ պատուհանները, ուստի մենք բացեցինք նամակի սևագիրը levavlogistics@gmail.com հասցեով — պարզապես սեղմեք «Ուղարկել» ձեր փոստային ծրագրում։ Կամ թույլատրեք թռուցիկ պատուհանները և սեղմեք ստորև նշված կոճակներից մեկը՝'
                        )
                      : t3(
                          'Telegram и WhatsApp уже открылись в новых вкладках с вашей заявкой — просто нажмите «Отправить» в чате. Ни один не открылся? Выберите канал ниже:',
                          'Telegram and WhatsApp just opened in new tabs with your request — simply hit "Send" in the chat. Neither opened? Pick a channel below:',
                          'Telegram-ը և WhatsApp-ը արդեն բացվել են նոր ներդիրներում՝ ձեր հայտով — պարզապես սեղմեք «Ուղարկել» չաթում։ Ոչ մեկը չբացվե՞ց։ Ընտրեք ալիքը ստորև՝'
                        )}
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
                    <span>{t3('Отправить на levavlogistics@gmail.com', 'Send to levavlogistics@gmail.com', 'Ուղարկել levavlogistics@gmail.com հասցեին')}</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setIsContactOpen(false);
                    setIsContactSuccess(false);
                    setAutoSendBlocked(false);
                    setContactName('');
                    setContactPhone('');
                    setContactRoute('');
                    setContactWeight('');
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black text-xs font-mono uppercase tracking-widest py-3 font-black transition cursor-pointer mt-4"
                >
                  {t3('Закрыть окно', 'Close Window', 'Փակել պատուհանը')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-mono font-bold text-[#888] uppercase tracking-wider mb-1.5">
                    {t3('Ваше имя / Компания *', 'Name / Company *', 'Ձեր անունը / Ընկերությունը *')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t3('Например: ООО «ТоргСнаб» / Армен', 'e.g., Cargo Corp / John', 'Օրինակ՝ Արմեն («Ագրո-Էքսպորտ» ՍՊԸ)')}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#08090b] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-[#555] outline-none focus:border-orange-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-mono font-bold text-[#888] uppercase tracking-wider mb-1.5">
                      {t3('Телефон / Мессенджер *', 'Phone / WhatsApp *', 'Հեռախոս / Մեսենջեր *')}
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
                      {t3('Вес / Объем груза', 'Weight / Volume', 'Բեռի քաշը / Ծավալը')}
                    </label>
                    <input
                      type="text"
                      placeholder={t3('20 тонн, 86 м³, 33 паллеты', '20 tons, 86 m³', '20 տոննա, 86 մ³, 33 պալլետ')}
                      value={contactWeight}
                      onChange={(e) => setContactWeight(e.target.value)}
                      className="w-full bg-[#08090b] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-[#555] outline-none focus:border-orange-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono font-bold text-[#888] uppercase tracking-wider mb-1.5">
                    {t3('Маршрут и тип груза', 'Route & Cargo Type', 'Երթուղի և բեռի տեսակ')}
                  </label>
                  <input
                    type="text"
                    placeholder={t3('Ереван → Москва (Тент / Рефрижератор)', 'Yerevan → Moscow (Reefer / Tent)', 'Երևան → Մոսկվա (Թենտ / Սառնարան)')}
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
                    <span>{t3('Рассчитать ставку за 15 минут', 'Calculate Freight Rate', 'Հաշվարկել սակագինը 15 րոպեում')}</span>
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-[#777] font-mono pt-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{t3('Гарантируем сохранность данных и расчет без спама', 'Strict NDA & direct carrier rates', 'Երաշխավորում ենք տվյալների գաղտնիությունը և հաշվարկ առանց սպամի')}</span>
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
