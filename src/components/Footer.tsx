import React from 'react';
import { Download, Facebook, Instagram, Flame, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, lang } = useLanguage();
  const t3 = (ru: string, en: string, hy: string) => (lang === 'ru' ? ru : lang === 'hy' ? hy : en);

  const handleDownloadCard = () => {
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}documents/LEV_AV_Company_Card.docx`;
    link.download = 'LEV_AV_Company_Card.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero-section', label: t.nav.about },
    { id: 'advantages-section', label: t.nav.advantages },
    { id: 'services-showcase', label: t.nav.services },
    { id: 'history', label: t.nav.history },
    { id: 'fleet', label: t.nav.fleet },
    { id: 'geography', label: t.nav.geography },
    { id: 'faq-section', label: t.nav.faq },
    { id: 'requisites', label: t.nav.requisites },
    { id: 'management-contacts-section', label: t.nav.contacts },
  ];

  return (
    <footer className="bg-[#050608] text-white border-t-2 border-orange-500/30" id="portal-footer">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif font-black text-2xl sm:text-3xl tracking-tight text-white uppercase leading-none">
                LEV<span className="text-orange-500">&</span>AV
              </span>
              <span className="font-mono text-[9px] tracking-[3px] text-orange-400 uppercase block mt-1 font-bold">
                HEAVY INDUSTRIAL LOGISTICS • EST. 2010
              </span>
            </div>
            
            <p className="text-xs text-[#aaa] max-w-md leading-relaxed font-light">
              {t.footer.aboutText}
            </p>
            
            <div className="text-[10px] font-mono text-[#777] space-y-1 bg-[#111318] p-3 border border-white/10">
              <div className="text-white font-bold">{t3('ИНН: 02248043', 'TIN: 02248043', 'ՀՎՀՀ. 02248043')}</div>
              <div className="truncate">
                {t3(
                  'РА, 0046, г. Ереван, ул. С. Таронци 3/1, кв. 18',
                  'RA, 0046, Yerevan, S. Tarontsi St. 3/1, Apt. 18',
                  'ՀՀ, 0046, ք. Երևան, Ս. Տարոնցու փող. 3/1, բն. 18'
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href="https://www.facebook.com/share/1EQXaY1RSt/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 flex items-center justify-center bg-[#111318] border border-white/10 text-[#888] hover:text-orange-400 hover:border-orange-500/50 transition"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/levandavtrucks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 flex items-center justify-center bg-[#111318] border border-white/10 text-[#888] hover:text-orange-400 hover:border-orange-500/50 transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400">{t.footer.navTitle}</h4>
            <ul className="space-y-2 text-xs font-mono text-[#888]">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="hover:text-orange-400 transition-colors text-left cursor-pointer uppercase font-semibold"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Management Contacts */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400">{t.footer.contactsTitle}</h4>
            <div className="space-y-3 text-xs font-mono text-[#aaa]">
              <div>
                <span className="text-[9px] font-mono text-orange-400 uppercase block font-bold">{t.footer.directorLabel}</span>
                <a href="tel:+37494902007" className="text-white hover:text-orange-400 transition font-mono font-bold text-sm">
                  +374 94 902007
                </a>
              </div>

              <div>
                <span className="text-[9px] font-mono text-[#666] uppercase block font-bold">{t.footer.salesLabel}</span>
                <a href="tel:+37499902007" className="text-white hover:text-orange-400 transition font-mono font-bold text-sm">
                  +374 99 902007
                </a>
              </div>

              <div>
                <span className="text-[9px] font-mono text-[#666] uppercase block font-bold">{t.footer.logisticsLabel}</span>
                <a href="tel:+37455902007" className="text-white hover:text-orange-400 transition font-mono font-bold text-sm">
                  +374 55 902007
                </a>
              </div>

              <div>
                <span className="text-[9px] font-mono text-[#666] uppercase block font-bold">{t.footer.adminLabel}</span>
                <a href="tel:+37495902007" className="text-white hover:text-orange-400 transition font-mono font-bold text-sm">
                  +374 95 902007
                </a>
              </div>

              <div>
                <span className="text-[9px] font-mono text-[#666] uppercase block font-bold">E-mail</span>
                <a href="mailto:levavlogistics@gmail.com" className="text-[#ccc] hover:text-orange-400 transition font-mono text-xs block">
                  levavlogistics@gmail.com
                </a>
              </div>

              <div>
                <span className="text-[9px] font-mono text-[#666] uppercase block font-bold">{t.footer.secondaryEmailLabel}</span>
                <a href="mailto:avet_avet83@mail.ru" className="text-[#ccc] hover:text-orange-400 transition font-mono text-xs block">
                  avet_avet83@mail.ru
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleDownloadCard}
                  className="inline-flex items-center space-x-2 text-[10px] text-black bg-orange-500 hover:bg-orange-600 px-3 py-1.5 font-mono font-bold transition uppercase tracking-wider cursor-pointer"
                >
                  <Download className="h-3 w-3 text-black" />
                  <span>{t.footer.downloadBtn}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#666] gap-4">
          <p>© {new Date().getFullYear()} LEV&AV LLC. {t.footer.rights}</p>
          <div className="flex space-x-6 text-[10px] font-mono">
            <span>{t.footer.location}</span>
            <span className="text-orange-400">{t.footer.portalType}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
