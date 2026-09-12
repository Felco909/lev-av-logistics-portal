import React, { useState } from 'react';
import { Copy, Check, Download, Landmark, ShieldCheck, FileCheck, Flame, PhoneCall, Building2, CreditCard, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { downloadCompanyCard, downloadCommercialProposal } from '../utils/documents';

export default function RequisitesSection() {
  const { t, lang } = useLanguage();
  const t3 = (ru: string, en: string, hy: string) => (lang === 'ru' ? ru : lang === 'hy' ? hy : en);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setShowToast(true);
    setTimeout(() => {
      setCopiedField(null);
      setShowToast(false);
    }, 2500);
  };

  const handleCopyAll = () => {
    const allRequisites = t3(
      `ООО «ЛЕВ ЭНД АВ» (LEV&AV LLC)
ИНН: 02248043
Юр. адрес: РА, 0046 г. Ереван, ул. С. Таронци 3/1. Кв. 18
Расчетный счет: 16600166153658
Банк: ЗАО "ЭВОКАБАНК" (CJSC "EVOCABANK")
Кор. счет: 30101810300000000765
БИК / SWIFT: 044525631
Генеральный директор: Аветик Зограбян Самвелович (+374 94 902007)
Логистика и продажи: Саргис (+374 99 902007)
Email: levavlogistics@gmail.com / avet_avet83@mail.ru`,
      `LEV&AV LLC (ООО «ЛЕВ ЭНД АВ»)
TIN: 02248043
Legal address: RA, 0046 Yerevan, S. Tarontsi St. 3/1, Apt. 18
Account: 16600166153658
Bank: CJSC "EVOCABANK"
Corr. account: 30101810300000000765
BIC / SWIFT: 044525631
CEO: Avetik Zohrabyan (+374 94 902007)
Logistics & Sales: Sargis (+374 99 902007)
Email: levavlogistics@gmail.com / avet_avet83@mail.ru`,
      `«ԼԵՎ ԸՆԴ ԱՎ» ՍՊԸ (LEV&AV LLC)
ՀՎՀՀ: 02248043
Իրավաբանական հասցե: ՀՀ, 0046 ք. Երևան, Ս. Տարոնցու փող. 3/1, բն. 18
Հաշվարկային հաշիվ: 16600166153658
Բանկ: Էվոկաբանկ ՓԲԸ (CJSC "EVOCABANK")
Թղթակցային հաշիվ: 30101810300000000765
BIK / SWIFT: 044525631
Գլխավոր տնօրեն: Ավետիք Զոհրաբյան Սամվելի (+374 94 902007)
Լոգիստիկա և վաճառք: Սարգիս (+374 99 902007)
Էլ. փոստ: levavlogistics@gmail.com / avet_avet83@mail.ru`
    );

    handleCopy(allRequisites, 'all');
  };

  const handleDownloadCard = () => downloadCompanyCard(lang);
  const handleDownloadProposal = () => downloadCommercialProposal(lang);

  return (
    <section id="requisites" className="relative py-20 sm:py-28 border-t border-white/10 overflow-hidden bg-[#08090b]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 mb-3">
            <Landmark className="h-3.5 w-3.5 text-orange-400" />
            <span className="font-mono text-xs font-bold text-orange-400 uppercase tracking-widest">
              {t.requisites.header}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {t.requisites.title} <span className="text-orange-500">{t.requisites.titleAccent}</span>
          </h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4" />
          <p className="text-sm sm:text-base text-[#bbb] mt-5 leading-relaxed font-light">
            {t.requisites.subtitle}
          </p>

          {/* Quick Copy Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => handleCopy('02248043', 'tin-quick')}
              className="bg-[#111318] hover:bg-[#181b22] border border-orange-500/40 hover:border-orange-500 text-white px-4 py-2 text-xs font-mono font-bold flex items-center space-x-2 transition cursor-pointer shadow-md"
            >
              <CreditCard className="h-3.5 w-3.5 text-orange-400" />
              <span>{t3('Скопировать ИНН: 02248043', 'Copy TIN: 02248043', 'Պատճենել ՀՎՀՀ. 02248043')}</span>
              {copiedField === 'tin-quick' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-[#777]" />}
            </button>

            <button
              onClick={() => handleCopy('16600166153658', 'acc-quick')}
              className="bg-[#111318] hover:bg-[#181b22] border border-white/15 hover:border-orange-500 text-white px-4 py-2 text-xs font-mono font-bold flex items-center space-x-2 transition cursor-pointer shadow-md"
            >
              <Landmark className="h-3.5 w-3.5 text-amber-400" />
              <span>{t3('Р/С: 16600166153658', 'Account: 16600166153658', 'Հ/Հ. 16600166153658')}</span>
              {copiedField === 'acc-quick' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-[#777]" />}
            </button>

            <button
              onClick={handleCopyAll}
              className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 text-xs font-mono font-extrabold flex items-center space-x-2 transition cursor-pointer shadow-lg uppercase"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>{t3('Скопировать все реквизиты', 'Copy Full Requisites', 'Պատճենել բոլոր ռեկվիզիտները')}</span>
            </button>
          </div>
        </div>

        {/* Requisites Heavy Industrial Card */}
        <div className="bg-[#111318] p-6 sm:p-10 border-2 border-white/15 max-w-4xl mx-auto shadow-2xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6 mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 flex items-center justify-center bg-orange-500/10 border border-orange-500/30 text-orange-400 shrink-0">
                <Landmark className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-extrabold block">{t.requisites.legalBadge}</span>
                <h3 className="font-serif text-2xl font-bold uppercase text-white">{t.requisites.companyTitle}</h3>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 self-start sm:self-auto">
              <button
                onClick={handleDownloadCard}
                className="inline-flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-black px-5 py-3 text-xs font-mono uppercase tracking-wider font-extrabold transition cursor-pointer shadow-lg"
              >
                <Download className="h-4 w-4" />
                <span>{t.requisites.downloadBtn}</span>
              </button>

              <button
                onClick={handleDownloadProposal}
                className="inline-flex items-center justify-center space-x-2 bg-[#181b22] hover:bg-[#20242e] border border-white/15 hover:border-orange-500 text-white px-5 py-3 text-xs font-mono uppercase tracking-wider font-extrabold transition cursor-pointer shadow-lg"
              >
                <FileText className="h-4 w-4 text-orange-400" />
                <span>{t.requisites.downloadProposalBtn}</span>
              </button>
            </div>
          </div>

          <div className="divide-y divide-white/10 font-mono text-xs">
            {t.requisites.items.map((req) => (
              <div
                key={req.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 hover:bg-white/[0.03] px-3 transition group"
              >
                <span className="text-[#888] text-xs sm:w-1/3 shrink-0 font-mono uppercase font-bold">{req.label}:</span>
                <div className="flex items-center justify-between sm:justify-end space-x-3 sm:w-2/3">
                  <span className="text-white font-bold break-all text-left sm:text-right">{req.value}</span>
                  <button
                    onClick={() => handleCopy(req.value, req.id)}
                    className="text-[#666] hover:text-orange-400 p-1.5 transition shrink-0 cursor-pointer"
                    title={t3('Копировать', 'Copy', 'Պատճենել')}
                  >
                    {copiedField === req.id ? (
                      <span className="flex items-center text-emerald-400 text-[10px] space-x-1 font-mono font-bold">
                        <Check className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">{t.requisites.copied}</span>
                      </span>
                    ) : (
                      <Copy className="h-4 w-4 group-hover:text-orange-400" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-[#888] font-mono gap-4">
            <span className="flex items-center text-emerald-400 font-bold">
              <ShieldCheck className="h-4 w-4 mr-2 shrink-0" />
              {t.requisites.officialNotice}
            </span>
            <span className="text-orange-400 font-bold">{t.requisites.residentTag}</span>
          </div>
        </div>

        {/* Floating Toast Notification */}
        {showToast && (
          <div className="fixed bottom-24 right-6 z-50 bg-emerald-500 text-black px-4 py-3 font-mono text-xs font-bold shadow-2xl flex items-center space-x-2 animate-bounce">
            <Check className="h-4 w-4 stroke-[3]" />
            <span>{t3('Реквизиты скопированы в буфер обмена!', 'Copied to clipboard!', 'Ռեկվիզիտները պատճենվեցին սեղմատախտակին!')}</span>
          </div>
        )}

      </div>
    </section>
  );
}
