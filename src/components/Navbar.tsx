import React, { useState, useEffect } from 'react';
import {
  Building2,
  History,
  Truck,
  MapPin,
  Award,
  FileText,
  Phone,
  Menu,
  X,
  Send,
  MessageCircle,
  Globe2,
  ChevronRight,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const { t, lang, setLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero-section');

  const navItems = [
    { id: 'hero-section', label: t.nav.about, icon: Building2 },
    { id: 'advantages-section', label: t.nav.advantages, icon: Award },
    { id: 'services-showcase', label: t.nav.services, icon: Layers },
    { id: 'history', label: t.nav.history, icon: History },
    { id: 'fleet', label: t.nav.fleet, icon: Truck },
    { id: 'geography', label: t.nav.geography, icon: MapPin },
    { id: 'faq-section', label: t.nav.faq, icon: HelpCircle },
    { id: 'requisites', label: t.nav.requisites, icon: FileText },
    { id: 'management-contacts-section', label: t.nav.contacts, icon: Phone },
  ];

  // ScrollSpy to detect which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Must follow actual top-to-bottom document order: the loop below
      // walks it back-to-front and stops at the first section whose top has
      // been scrolled past, so an out-of-order list mis-highlights the nav.
      const sectionIds = [
        'hero-section',
        'advantages-section',
        'services-showcase',
        'faq-section',
        'management-contacts-section',
        'history',
        'fleet',
        'geography',
        'requisites',
      ];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'hero-section') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled 
            ? 'bg-[#08090b]/98 backdrop-blur-md border-b border-orange-500/30 shadow-2xl py-0' 
            : 'bg-[#08090b]/90 backdrop-blur-sm border-b border-white/10 py-1'
        }`}
        id="main-navbar"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Bold Industrial Brand Logo */}
          <div 
            onClick={() => scrollTo('hero')} 
            className="flex cursor-pointer items-center text-white transition hover:opacity-95 group"
            id="nav-logo"
          >
            <div className="flex flex-col">
              <span className="font-serif font-black text-2xl sm:text-[26px] tracking-tight text-white uppercase italic leading-none flex items-center">
                LEV<span className="text-orange-500 not-italic mx-0.5">&</span>AV
                <span className="text-[10px] font-mono font-normal text-orange-500/80 not-italic ml-1">[LOGISTICS]</span>
              </span>
              
              <div className="flex flex-col mt-0.5">
                <div className="h-[2px] bg-gradient-to-r from-orange-500 via-amber-500 to-transparent"></div>
                <span className="font-mono text-[7.5px] tracking-[2.8px] sm:tracking-[3px] text-[#bbb] uppercase py-0.5 font-bold">
                  HEAVY FREIGHT & LOGISTICS • EST. 2010
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative ${lang === 'hy' ? 'px-1.5 text-[10px]' : 'px-2 text-[11px]'} py-1.5 font-mono font-bold uppercase tracking-normal transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'text-orange-400 font-extrabold bg-orange-500/10' 
                      : 'text-[#aaa] hover:text-white hover:bg-white/[0.05]'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 shadow-[0_0_6px_rgba(206,99,38,0.4)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3" id="nav-actions">
            
            {/* Language Switcher (RU / EN / HY) */}
            <div
              className="flex items-center bg-[#111318] border border-white/15 p-0.5 font-mono text-xs"
              id="lang-switcher"
            >
              <button
                onClick={() => setLang('ru')}
                className={`px-2 sm:px-2.5 py-1 font-bold transition-all cursor-pointer ${
                  lang === 'ru'
                    ? 'bg-orange-500 text-black font-extrabold shadow-sm'
                    : 'text-[#888] hover:text-white hover:bg-white/5'
                }`}
                title="Русский язык"
                id="lang-btn-ru"
              >
                RU
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 sm:px-2.5 py-1 font-bold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-orange-500 text-black font-extrabold shadow-sm'
                    : 'text-[#888] hover:text-white hover:bg-white/5'
                }`}
                title="English language"
                id="lang-btn-en"
              >
                EN
              </button>
              <button
                onClick={() => setLang('hy')}
                className={`px-2 sm:px-2.5 py-1 font-bold transition-all cursor-pointer ${
                  lang === 'hy'
                    ? 'bg-orange-500 text-black font-extrabold shadow-sm'
                    : 'text-[#888] hover:text-white hover:bg-white/5'
                }`}
                title="Հայերեն"
                id="lang-btn-hy"
              >
                HY
              </button>
            </div>

            {/* Direct Phone Link — hidden for Armenian: its nav labels run noticeably
                longer than RU/EN, and dropping this (redundant with the CTA button
                right next to it) is what keeps the header from overflowing at 1440px. */}
            <a
              href="tel:+37494902007"
              className={`${lang === 'hy' ? 'hidden' : 'hidden lg:flex'} items-center space-x-2 text-xs font-mono font-bold text-white hover:text-orange-400 transition ml-1 px-3 py-2 bg-[#111318] border border-white/15 hover:border-orange-500/50`}
              title={lang === 'ru' ? 'Позвонить в офис' : lang === 'hy' ? 'Զանգահարել գրասենյակ' : 'Call Dispatch'}
            >
              <Phone className="h-3.5 w-3.5 text-orange-500" />
              <span>+374 94 902007</span>
            </a>

            {/* Quick Industrial CTA */}
            <button
              onClick={onContactClick}
              className="hidden sm:flex items-center space-x-1.5 bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 text-xs font-mono font-extrabold uppercase tracking-wider transition duration-150 cursor-pointer shadow-lg hover:shadow-orange-950/50"
              id="nav-contact-btn"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{t.nav.contactBtn}</span>
            </button>

            {/* Mobile / Tablet Menu Button (Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden flex items-center justify-center h-10 w-10 bg-[#111318] hover:bg-white/10 border border-white/15 text-white transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-orange-500" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 xl:hidden" id="mobile-nav-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Slide-out Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0a0c10] border-l border-orange-500/30 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-50"
              id="mobile-menu-drawer"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                  <div>
                    <span className="font-serif font-black text-xl tracking-tight text-white uppercase italic leading-none block">
                      LEV<span className="text-orange-500 not-italic">&</span>AV
                    </span>
                    <span className="text-[8px] font-mono text-orange-400 tracking-widest uppercase block mt-1 font-bold">
                      {lang === 'ru' ? '[ИНДУСТРИАЛЬНАЯ ЛОГИСТИКА]' : '[INDUSTRIAL FREIGHT]'}
                    </span>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#888] hover:text-white transition cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Navigation Links List */}
                <div className="space-y-1.5 mb-8">
                  <span className="text-[9px] font-mono uppercase tracking-[2.5px] text-[#666] px-3 block mb-2 font-bold">
                    {lang === 'ru' ? 'РАЗДЕЛЫ САЙТА' : 'NAVIGATION'}
                  </span>
                  {navItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`w-full flex items-center justify-between p-3 text-left transition-all duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-orange-500/15 border-l-4 border-orange-500 text-white font-bold'
                            : 'hover:bg-white/[0.04] text-[#ccc] border-l-4 border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className={`h-4 w-4 ${isActive ? 'text-orange-400' : 'text-[#777]'}`} />
                          <span className="text-sm font-mono tracking-wide uppercase">{item.label}</span>
                        </div>
                        <span className="text-[10px] font-mono text-orange-400/70 font-bold">
                          // 0{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Direct Contacts In Drawer */}
                <div className="space-y-3 p-4 bg-[#111318] border border-white/10 mb-6">
                  <span className="text-[9px] font-mono uppercase tracking-[2px] text-orange-400 font-bold block">
                    {lang === 'ru' ? 'ПРЯМАЯ СВЯЗЬ / ДИСПЕТЧЕР' : 'DIRECT DISPATCH'}
                  </span>
                  
                  <div className="space-y-2 text-xs">
                    <a
                      href="tel:+37494902007"
                      className="flex items-center justify-between text-white hover:text-orange-400 transition font-mono p-2 bg-black/40 border border-white/5"
                    >
                      <span className="text-orange-400 font-mono text-[10px] uppercase font-bold">{lang === 'ru' ? 'Дирекция:' : 'Director:'}</span>
                      <strong className="text-white font-extrabold">+374 94 902007</strong>
                    </a>

                    <a
                      href="tel:+37499902007"
                      className="flex items-center justify-between text-white hover:text-orange-400 transition font-mono p-2 bg-black/40 border border-white/5"
                    >
                      <span className="text-[#888] font-mono text-[10px] uppercase">{lang === 'ru' ? 'Отдел продаж:' : 'Sales:'}</span>
                      <strong className="text-orange-400">+374 99 902007</strong>
                    </a>
                  </div>

                  {/* Messengers */}
                  <div className="flex gap-2 pt-2">
                    <a
                      href="https://t.me/+37499902007"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 bg-white/5 border border-white/10 text-white text-xs font-mono uppercase font-bold hover:bg-orange-500/20 hover:border-orange-500/40 hover:text-orange-400 transition"
                    >
                      <Send className="h-3 w-3 text-orange-400" />
                      <span>Telegram</span>
                    </a>
                    <a
                      href="https://wa.me/37499902007"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 bg-white/5 border border-white/10 text-white text-xs font-mono uppercase font-bold hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:text-emerald-400 transition"
                    >
                      <MessageCircle className="h-3 w-3 text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Drawer Footer CTA */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onContactClick();
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs uppercase tracking-widest py-3.5 transition flex items-center justify-center space-x-2 cursor-pointer shadow-lg font-mono"
                >
                  <Phone className="h-4 w-4" />
                  <span>{t.nav.contactBtn}</span>
                </button>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#777] px-1">
                  <span>{lang === 'ru' ? 'ООО «ЛЕВ ЭНД АВ»' : 'LEV&AV LLC'}</span>
                  <span className="text-orange-500 font-bold">{lang === 'ru' ? 'С 2010 ГОДА' : 'SINCE 2010'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
