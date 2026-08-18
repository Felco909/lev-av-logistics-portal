import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Calculator, UserCheck, ShieldCheck, FileCheck, Check, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface CargoOwnersProps {
  setActiveTab: (tab: string) => void;
}

export default function CargoOwners({ setActiveTab }: CargoOwnersProps) {
  const [selectedDoc, setSelectedDoc] = useState<'contract' | 'receipt' | 'power_of_attorney'>('contract');
  const [docDate, setDocDate] = useState('2026-06-27');
  const [docCargo, setDocCargo] = useState('Коммерческое оборудование');
  const [docSender, setDocSender] = useState('ООО "Регион-Трейдинг"');
  const [docRecipient, setDocRecipient] = useState('АО "Сибирские технологии"');
  const [docWeight, setDocWeight] = useState('450');

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const triggerDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);

    // Create a mock download link
    const element = document.createElement("a");
    const docTitle = selectedDoc === 'contract' 
      ? 'Договор-Заявка на перевозку груза' 
      : selectedDoc === 'receipt' 
        ? 'Экспедиторская расписка' 
        : 'Доверенность на получение ТМЦ';
    
    const fileContent = `
========================================================================
                      ШАБЛОН ОФИЦИАЛЬНОГО ДОКУМЕНТА
                      ПОРТАЛ ГРУЗОПЕРЕВОЗОК LEV&AV
========================================================================
Тип документа:         ${docTitle}
Дата формирования:     ${docDate}
Экспедитор/Перевозчик: ООО «ЛЕВ ЭНД АВ» (LEV&AV LLC)
                       ИНН: 02248043
                       Банк: ЗАО «ЭВОКАБАНК» (Р/с: 1660002248043100)
                       Адрес: РА, 0046, г. Ереван, ул. С. Таронци 3/1, кв. 18
------------------------------------------------------------------------
Грузоотправитель:      ${docSender}
Грузополучатель:       ${docRecipient}
Наименование груза:    ${docCargo}
Масса груза:           ${docWeight} кг
========================================================================
Статус: Сформировано через официальный B2B-портал LEV&AV LOGISTICS. 
Документ соответствует всем требованиям международных соглашений КДПГ и 
гражданского законодательства Республики Армения и стран СНГ.
========================================================================
    `;
    const file = new Blob([fileContent], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `${selectedDoc === 'contract' ? 'Dogovor-Zayavka' : selectedDoc === 'receipt' ? 'Expeditorskaya-Raspiska' : 'Doverennost'}_LEV_AV_Logistics.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const docTemplates = {
    contract: {
      title: 'Договор-Заявка № ВЛ-2026/06',
      desc: 'Регулирует разовую автомобильную или мультимодальную поставку коммерческого груза.',
      standard: 'Утвержден АСМАП и Минтрансом РФ'
    },
    receipt: {
      title: 'Экспедиторская расписка Ф-3',
      desc: 'Подтверждает факт приема груза экспедитором от клиента для дальнейшей транспортировки.',
      standard: 'Приказ Минтранса РФ № 23'
    },
    power_of_attorney: {
      title: 'Доверенность на получение ТМЦ',
      desc: 'Необходима водителю для забора груза со склада отправителя.',
      standard: 'Типовая форма М-2'
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in" id="cargo-owners-view">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="font-serif italic text-gold text-base block mb-1">Корпоративным клиентам</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
          Грузовладельцам и B2B партнерам
        </h1>
        <p className="text-[#888] mt-3 text-sm sm:text-base leading-relaxed">
          Профессиональные логистические услуги для производственных, торговых и дистрибьюторских компаний. Цифровой документооборот, сквозной финансовый учет и собственный парк техники.
        </p>
      </div>

      {/* Main Grid: B2B services card and Callouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
        
        {/* Left column: Custom Services Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-none shadow-xl">
            <h2 className="font-serif text-xl font-light text-white mb-6 flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-gold" />
              <span>Комплексные B2B-сервисы</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="border border-white/5 bg-dark-bg/30 p-5 rounded-none hover:border-gold/30 transition">
                <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block mb-2">01. Отраслевые решения</span>
                <h4 className="text-sm font-bold text-white mb-1.5">Промышленное оборудование</h4>
                <p className="text-xs text-[#888] leading-relaxed">Перевозка сверхтяжелых грузов, крановые работы, проектная логистика.</p>
              </div>

              <div className="border border-white/5 bg-dark-bg/30 p-5 rounded-none hover:border-gold/30 transition">
                <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block mb-2">02. FMCG & Retail</span>
                <h4 className="text-sm font-bold text-white mb-1.5">Температурный режим</h4>
                <p className="text-xs text-[#888] leading-relaxed">Рефрижераторы класса A c постоянной телеметрией температуры (от -20°C до +12°C).</p>
              </div>

              <div className="border border-white/5 bg-dark-bg/30 p-5 rounded-none hover:border-gold/30 transition">
                <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block mb-2">03. Страхование</span>
                <h4 className="text-sm font-bold text-white mb-1.5">Гарантия сохранности</h4>
                <p className="text-xs text-[#888] leading-relaxed">Покрытие 100% стоимости груза через СПАО «Ингосстрах» по ставке от 0.08%.</p>
              </div>

              <div className="border border-white/5 bg-dark-bg/30 p-5 rounded-none hover:border-gold/30 transition">
                <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block mb-2">04. Личный кабинет</span>
                <h4 className="text-sm font-bold text-white mb-1.5">Прямая интеграция API</h4>
                <p className="text-xs text-[#888] leading-relaxed">Передача статусов и первичных финансовых документов в 1С / SAP / ERP.</p>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center gap-4 justify-between">
              <div>
                <span className="text-xs text-[#888] block">Нужен индивидуальный контракт?</span>
                <span className="text-xs font-bold text-white">Выделим персонального логиста-координатора</span>
              </div>
              <button 
                onClick={() => setActiveTab('calculator')}
                className="bg-gold hover:bg-gold-hover text-black px-5 py-3 text-xs uppercase tracking-widest font-bold transition flex items-center space-x-1 hover:cursor-pointer"
              >
                <span>В калькулятор</span>
                <Calculator className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* KPI Statistics Trust block */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4 text-center">
              <span className="block font-serif text-2xl text-gold">450+</span>
              <span className="text-[9px] uppercase tracking-wider text-[#888] font-semibold block mt-1">B2B Клиентов</span>
            </div>
            <div className="glass-card p-4 text-center">
              <span className="block font-serif text-2xl text-gold">200+</span>
              <span className="text-[9px] uppercase tracking-wider text-[#888] font-semibold block mt-1">Тягачей в парке</span>
            </div>
            <div className="glass-card p-4 text-center">
              <span className="block font-serif text-2xl text-gold">100%</span>
              <span className="text-[9px] uppercase tracking-wider text-[#888] font-semibold block mt-1">Белая отчетность</span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Document Preview */}
        <div className="lg:col-span-5 flex flex-col justify-between glass-card p-6 sm:p-8 shadow-xl">
          <div>
            <div className="border-b border-white/5 pb-4 mb-4">
              <span className="text-[10px] font-mono text-gold uppercase tracking-widest font-bold">БЕЗ РЕГИСТРАЦИИ</span>
              <h3 className="font-serif text-xl font-light text-white mt-1">Генератор B2B-Документов</h3>
              <p className="text-xs text-[#888] mt-1">
                Выберите тип документа, введите свои реквизиты и скачайте предзаполненный шаблон в текстовом формате.
              </p>
            </div>

            {/* Document Tabs selector */}
            <div className="grid grid-cols-3 gap-1.5 mb-5">
              {(['contract', 'receipt', 'power_of_attorney'] as const).map((docId) => (
                <button
                  key={docId}
                  onClick={() => setSelectedDoc(docId)}
                  className={`py-2 px-1 text-[10px] font-bold uppercase tracking-wider border transition-all text-center ${
                    selectedDoc === docId
                      ? 'border-gold bg-gold/5 text-gold'
                      : 'border-white/5 bg-dark-bg text-[#555] hover:text-[#888]'
                  }`}
                >
                  {docId === 'contract' ? 'Договор' : docId === 'receipt' ? 'Расписка' : 'Доверенность'}
                </button>
              ))}
            </div>

            {/* Form Fields inside Generator */}
            <div className="space-y-3.5 mb-6">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[9px] font-semibold text-[#888] uppercase tracking-wider mb-1">Дата составления</label>
                  <input 
                    type="date"
                    value={docDate}
                    onChange={(e) => setDocDate(e.target.value)}
                    className="w-full bg-dark-bg border border-white/10 text-xs px-2.5 py-1.5 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-[#888] uppercase tracking-wider mb-1">Масса груза (кг)</label>
                  <input 
                    type="number"
                    value={docWeight}
                    onChange={(e) => setDocWeight(e.target.value)}
                    className="w-full bg-dark-bg border border-white/10 text-xs px-2.5 py-1.5 text-white font-mono outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-semibold text-[#888] uppercase tracking-wider mb-1">Грузоотправитель (Ваша компания)</label>
                <input 
                  type="text"
                  value={docSender}
                  onChange={(e) => setDocSender(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 text-xs px-2.5 py-1.5 text-white outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[9px] font-semibold text-[#888] uppercase tracking-wider mb-1">Грузополучатель</label>
                <input 
                  type="text"
                  value={docRecipient}
                  onChange={(e) => setDocRecipient(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 text-xs px-2.5 py-1.5 text-white outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[9px] font-semibold text-[#888] uppercase tracking-wider mb-1">Характер груза</label>
                <input 
                  type="text"
                  value={docCargo}
                  onChange={(e) => setDocCargo(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 text-xs px-2.5 py-1.5 text-white outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>

          {/* Interactive Document Preview Box */}
          <div className="bg-[#111] border border-white/5 p-4 rounded-none mb-4 font-mono text-[9px] leading-relaxed text-[#888] select-none">
            <div className="text-white font-bold border-b border-white/10 pb-1.5 mb-2 flex items-center justify-between">
              <span>{docTemplates[selectedDoc].title}</span>
              <span className="text-gold text-[8px] uppercase tracking-widest">{docTemplates[selectedDoc].standard}</span>
            </div>
            <p className="text-gold mb-1">ООО «ЛЕВ ЭНД АВ» (Экспедитор) &harr; {docSender}</p>
            <p>Предмет: международная автоперевозка «{docCargo}» по СНГ.</p>
            <p>Масса: {docWeight} кг. Адрес выгрузки будет указан получателем ({docRecipient}).</p>
            <p className="text-[#444] mt-1.5 italic">Данные заверены электронной подписью ООО «ЛЕВ ЭНД АВ».</p>
          </div>

          <div>
            {downloadSuccess && (
              <div className="mb-3 bg-emerald-500/5 border border-emerald-500/20 px-3 py-2 text-center text-emerald-400 text-xs font-medium uppercase tracking-wider flex items-center justify-center space-x-1.5">
                <Check className="h-4 w-4" />
                <span>Шаблон сформирован и скачан!</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={triggerDownload}
                className="w-full bg-gold hover:bg-gold-hover text-black py-3.5 text-[10px] uppercase tracking-widest font-bold transition flex items-center justify-center space-x-1 px-2 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Скачать шаблон</span>
              </button>
              <button
                onClick={() => setActiveTab('request')}
                className="w-full bg-[#111] hover:bg-[#161616] text-[#888] hover:text-white border border-white/10 py-3.5 text-[10px] uppercase tracking-widest font-bold transition flex items-center justify-center space-x-1 px-2 cursor-pointer"
              >
                <span>Оформить груз</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Trust Blocks & Licenses */}
      <div className="glass-card p-6 sm:p-8 rounded-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-[10px] font-mono text-gold uppercase tracking-widest font-bold">Юридическая прозрачность</span>
            <h3 className="font-serif text-2xl font-light text-white">Страховое покрытие и государственные лицензии</h3>
            <p className="text-xs text-[#888] leading-relaxed">
              Компания ООО «ЛЕВ ЭНД АВ» действует в строгом соответствии с международным транспортным законодательством СНГ и имеет все необходимые допуски к международным автоперевозкам. Вся ответственность перевозчика/экспедитора застрахована в ведущих страховых компаниях. Мы предоставляем оригиналы закрывающих бухгалтерских документов через электронные системы ЭДО на следующий день после выгрузки.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row justify-center gap-4">
            <div className="glass-card p-4 flex items-center space-x-3 rounded-none shadow">
              <ShieldCheck className="h-10 w-10 text-gold flex-shrink-0" />
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wide">ИНГОССТРАХ</span>
                <span className="text-[9px] text-[#888] block">Страхование грузов на сумму до 25 млн ₽ по умолчанию</span>
              </div>
            </div>
            <div className="glass-card p-4 flex items-center space-x-3 rounded-none shadow">
              <FileCheck className="h-10 w-10 text-gold flex-shrink-0" />
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wide">Диадок / СБИС</span>
                <span className="text-[9px] text-[#888] block">100% безбумажный электронный документооборот</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
