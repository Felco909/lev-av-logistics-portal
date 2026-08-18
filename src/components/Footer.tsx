import React from 'react';
import { Download, Flame, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, lang } = useLanguage();
  const t3 = (ru: string, en: string, hy: string) => (lang === 'ru' ? ru : lang === 'hy' ? hy : en);

  const handleDownloadCard = () => {
    const cardText = t3(
      `========================================================================
             КАРТОЧКА ПРЕДПРИЯТИЯ / COMPANY PROFILE CARD
                    ООО «ЛЕВ ЭНД АВ» (LEV&AV LLC)
========================================================================

1. ЮРИДИЧЕСКИЕ СВЕДЕНИЯ / LEGAL DETAILS:
------------------------------------------------------------------------
Полное наименование:      Общество с ограниченной ответственностью «ЛЕВ ЭНД АВ»
                          (Limited Liability Company «LEV AND AV»)
Краткое наименование:     ООО «ЛЕВ ЭНД АВ» (LEV&AV LLC)
ИНН Компании / TIN:       02248043
Юридический адрес:        РА, 0046 г. Ереван, ул. С. Таронци 3/1. Кв. 18
                          (RA, 0046 Yerevan, S. Tarontsi St. 3/1, Apt. 18)
Фактический адрес:        РА, 0046 г. Ереван, ул. С. Таронци 3/1. Кв. 18

2. БАНКОВСКИЕ РЕКВИЗИТЫ / BANK DETAILS:
------------------------------------------------------------------------
Расчетный счет:           16600166153658
Банк:                     ЗАО "ЭВОКАБАНК" (CJSC "EVOCABANK")
Кор. счет:                30101810300000000765
БИК / SWIFT:              044525631
ИНН (Банка):              7718011918

3. РУКОВОДСТВО И КОНТАКТЫ / MANAGEMENT & CONTACTS:
------------------------------------------------------------------------
Генеральный директор / CEO: Аветик Зограбян Самвелович (Avetik Zohrabyan)
Директор (Аветик):        +374 94 902007
Менеджер по продажам (Саргис): +374 99 902007
Дополнительные контакты:  +374 55 902007, +374 95 902007
G-mail:                   levavlogistics@gmail.com
Доп. E-mail:              avet_avet83@mail.ru

========================================================================`,
      `========================================================================
                          COMPANY PROFILE CARD
                    LEV&AV LLC (ООО «ЛЕВ ЭНД АВ»)
========================================================================

1. LEGAL DETAILS:
------------------------------------------------------------------------
Full legal name:          Limited Liability Company «LEV AND AV»
                          (ООО «ЛЕВ ЭНД АВ»)
Short name:               LEV&AV LLC (ООО «ЛЕВ ЭНД АВ»)
Company TIN:              02248043
Legal address:            RA, 0046 Yerevan, S. Tarontsi St. 3/1, Apt. 18
Actual address:           RA, 0046 Yerevan, S. Tarontsi St. 3/1, Apt. 18

2. BANK DETAILS:
------------------------------------------------------------------------
Account:                  16600166153658
Bank:                     CJSC "EVOCABANK"
Corr. account:            30101810300000000765
BIC / SWIFT:              044525631
Bank TIN:                 7718011918

3. MANAGEMENT & CONTACTS:
------------------------------------------------------------------------
CEO:                      Avetik Zohrabyan
Director (Avetik):        +374 94 902007
Sales Manager (Sargis):   +374 99 902007
Backup contacts:          +374 55 902007, +374 95 902007
G-mail:                   levavlogistics@gmail.com
Additional email:         avet_avet83@mail.ru

========================================================================`,
      `========================================================================
                    ԸՆԿԵՐՈՒԹՅԱՆ ՔԱՐՏ / COMPANY PROFILE CARD
                    «ԼԵՎ ԵՎ ԱՎ» ՍՊԸ (LEV&AV LLC)
========================================================================

1. ԻՐԱՎԱԲԱՆԱԿԱՆ ՏՎՅԱԼՆԵՐ.
------------------------------------------------------------------------
Լրիվ անվանում:            Սահմանափակ պատասխանատվությամբ ընկերություն «ԼԵՎ ԵՎ ԱՎ»
                          (Limited Liability Company «LEV AND AV»)
Կրճատ անվանում:           «ԼԵՎ ԵՎ ԱՎ» ՍՊԸ (LEV&AV LLC)
Ընկերության ՀՎՀՀ / TIN:   02248043
Իրավաբանական հասցե:       ՀՀ, 0046 ք. Երևան, Ս. Տարոնցու փող. 3/1, բն. 18
Փաստացի հասցե:            ՀՀ, 0046 ք. Երևան, Ս. Տարոնցու փող. 3/1, բն. 18

2. ԲԱՆԿԱՅԻՆ ՌԵԿՎԻԶԻՏՆԵՐ.
------------------------------------------------------------------------
Հաշվարկային հաշիվ:        16600166153658
Բանկ:                     Էվոկաբանկ ՓԲԸ (CJSC "EVOCABANK")
Թղթակցային հաշիվ:         30101810300000000765
ԲԱԴԿ / SWIFT:              044525631
Բանկի ՀՎՀՀ:                7718011918

3. ՂԵԿԱՎԱՐՈՒԹՅՈՒՆ ԵՎ ԿՈՆՏԱԿՏՆԵՐ.
------------------------------------------------------------------------
Գլխավոր տնօրեն / CEO:     Ավետիք Զոհրաբյան Սամվելի (Avetik Zohrabyan)
Տնօրեն (Ավետիք):          +374 94 902007
Վաճառքի մենեջեր (Սարգիս): +374 99 902007
Լրացուցիչ կոնտակտներ:     +374 55 902007, +374 95 902007
G-mail:                   levavlogistics@gmail.com
Լրաց. էլ. փոստ:           avet_avet83@mail.ru

========================================================================`
    );

    const blob = new Blob([cardText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Requisites_LEV_AV_LLC.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
                <span className="text-[9px] font-mono text-[#666] uppercase block font-bold">E-mail</span>
                <a href="mailto:levavlogistics@gmail.com" className="text-[#ccc] hover:text-orange-400 transition font-mono text-xs block">
                  levavlogistics@gmail.com
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
