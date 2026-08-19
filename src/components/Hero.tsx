import React, { useState } from 'react';
import { 
  Building2, 
  History, 
  Truck, 
  MapPin, 
  Award, 
  FileText, 
  Phone, 
  Mail, 
  MessageSquare, 
  Download, 
  Shield, 
  Clock, 
  Globe2, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  ChevronDown, 
  HelpCircle, 
  Compass, 
  Navigation, 
  Layers, 
  CheckCircle2, 
  Send, 
  MessageCircle, 
  ExternalLink,
  Flame,
  Zap,
  Gauge,
  Cpu,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

const DIRECTION_ICONS: Record<string, React.ElementType> = {
  cis: Truck,
  europe: Globe2,
  china: Compass,
  refrigerated: Sparkles,
  oversized: Shield,
  customs: FileText,
};

interface HeroProps {
  onContactClick?: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  const { t, lang } = useLanguage();
  const t3 = (ru: string, en: string, hy: string) => (lang === 'ru' ? ru : lang === 'hy' ? hy : en);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCard = () => {
    const vCardData = t3(
      `BEGIN:VCARD
VERSION:3.0
N:Avetisyan;Avetik;;;
FN:Avetik Avetisyan (LEV&AV LLC)
ORG:ООО «ЛЕВ ЭНД АВ» (LEV&AV LLC);
TITLE:Генеральный директор / CEO
TEL;TYPE=CELL,VOICE:+37494902007
TEL;TYPE=WORK,VOICE:+37499902007
EMAIL:levavlogistics@gmail.com
EMAIL:avet_avet83@mail.ru
ADR;TYPE=WORK:;;ул. Давид Бека 134/4;Ереван;;0087;Армения
URL:https://levav.am
NOTE:Международные грузоперевозки собственным автопарком по СНГ, Европе и Китаю с 2010 года.
END:VCARD`,
      `BEGIN:VCARD
VERSION:3.0
N:Avetisyan;Avetik;;;
FN:Avetik Avetisyan (LEV&AV LLC)
ORG:LEV&AV LLC (ООО «ЛЕВ ЭНД АВ»);
TITLE:CEO / General Director
TEL;TYPE=CELL,VOICE:+37494902007
TEL;TYPE=WORK,VOICE:+37499902007
EMAIL:levavlogistics@gmail.com
EMAIL:avet_avet83@mail.ru
ADR;TYPE=WORK:;;134/4 David Bek St.;Yerevan;;0087;Armenia
URL:https://levav.am
NOTE:International freight forwarding with our own fleet across the CIS, Europe and China since 2010.
END:VCARD`,
      `BEGIN:VCARD
VERSION:3.0
N:Avetisyan;Avetik;;;
FN:Avetik Avetisyan (LEV&AV LLC)
ORG:«ԼԵՎ ԸՆԴ ԱՎ» ՍՊԸ (LEV&AV LLC);
TITLE:Գլխավոր տնօրեն / CEO
TEL;TYPE=CELL,VOICE:+37494902007
TEL;TYPE=WORK,VOICE:+37499902007
EMAIL:levavlogistics@gmail.com
EMAIL:avet_avet83@mail.ru
ADR;TYPE=WORK:;;Դավիթ Բեկի փող. 134/4;Երևան;;0087;Հայաստան
URL:https://levav.am
NOTE:Միջազգային բեռնափոխադրումներ սեփական ավտոպարկով ԱՊՀ, Եվրոպա և Չինաստան ուղղություններով 2010 թվականից։
END:VCARD`
    );

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'LEV_AV_Logistics_Contacts.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
  };

  return (
    <div className="relative overflow-hidden text-[#f1f3f5] w-full min-h-screen m-0 p-0" id="hero-section">
      {/* Hero Background Image Layer (Positioned to show upper landscape, church & truck) */}
      <div
        // Capped at one viewport tall (not inset-0 / the full multi-section hero height) so
        // `background-size` scales against a sane box — left uncapped, the element stretched
        // to the whole hero block (thousands of px on mobile, everything through the
        // advantages/services/FAQ/contacts sections it contains), forcing an extreme zoom that
        // rendered as a blank color instead of the photo. `fixed` attachment is also unreliable
        // on mobile Safari, so the parallax effect is desktop-only via Tailwind's responsive variant.
        // `bg-contain` (not `bg-cover`) keeps the whole illustration in frame — with `cover` on
        // wide screens the image was scaled up and vertically cropped, cutting off the bottom of
        // the truck/ship row and making it read as too zoomed in. Any letterboxed edge just shows
        // the page's own dark background, which already matches the image. On desktop the plain
        // contain fit left a bit too much empty margin, so it's scaled to taste on desktop while
        // mobile (which looked right at plain contain) is untouched.
        // Position is class-based (not inline) so desktop can be nudged up independently of
        // mobile, which already sat correctly at plain top alignment.
        className="absolute inset-x-0 top-0 h-screen z-0 bg-contain lg:bg-[length:90%] bg-no-repeat bg-scroll lg:bg-fixed bg-top lg:[background-position:center_-60px] pointer-events-none transition-all duration-300"
        style={{
          // Lighter and flatter than the previous overlay (which ranged up to 0.65/0.98 near the
          // bottom) — the source photo is itself much dimmer in its upper/sky portion than in the
          // glowing truck/ship band lower down, and a steep gradient only widened that gap. A
          // near-flat overlay plus a brightness/saturation boost on the whole layer (below) lifts
          // the dim upper area so the image reads evenly instead of having a visible seam. Text
          // sits in its own opaque/semi-opaque boxes (cards, buttons) rather than directly on the
          // gradient, so contrast doesn't depend on this overlay being dark.
          backgroundImage: `linear-gradient(to bottom, rgba(8, 9, 11, 0.14) 0%, rgba(8, 9, 11, 0.18) 40%, rgba(8, 9, 11, 0.22) 70%, rgba(8, 9, 11, 0.26) 100%), url('${import.meta.env.BASE_URL}images/hero-bg-neon.jpg')`,
          filter: 'brightness(1.6) saturate(1.25) contrast(0.92)',
        }}
      />
      
      {/* Heavy Industrial Background Grid and Ambience */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none industrial-grid" />
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-orange-700/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-32 w-[400px] h-[400px] bg-amber-700/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full min-h-screen py-10 sm:py-16 md:py-20 flex flex-col justify-center relative">
        
        {/* Giant Industrial Background Watermark */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] sm:text-[220px] md:text-[280px] font-black text-white/[0.02] select-none pointer-events-none z-0 tracking-[12px] uppercase font-serif">
          LEV&AV
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>

            {/* Left Industrial Text Presentation */}
            <div className="max-w-3xl space-y-6">

              {/* Industrial System Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#111318] border border-orange-500/40 px-3.5 py-1.5 text-xs font-mono font-bold text-orange-400 shadow-lg">
                <span className="h-2 w-2 bg-orange-500 animate-pulse rounded-none" />
                <span className="uppercase tracking-widest text-[10px]">{t.hero.badge}</span>
                <span className="text-[#555]">//</span>
                <span className="text-[#aaa] text-[9px] uppercase tracking-widest">EST. 2010</span>
              </div>

              {/* Heavy Bold Headline */}
              <div className="space-y-3">
                <h1 
                  className="font-serif font-black text-4xl sm:text-6xl md:text-7xl uppercase text-white leading-[0.95] tracking-tight"
                >
                  <span className="block text-[#aaa] text-2xl sm:text-3xl font-mono tracking-widest mb-1 font-bold">
                    {t.hero.title1}
                  </span>
                  <span className="text-orange-500 block drop-shadow-[0_0_25px_rgba(249,115,22,0.3)]">
                    {t.hero.title2}
                  </span>
                  <span className="block text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mt-1">
                    {t.hero.title3}
                  </span>
                </h1>
                
                {/* Secondary Industrial Brand Line */}
                <div className="flex items-center space-x-3 pt-1">
                  <div className="h-[3px] w-12 bg-orange-500" />
                  <span className="font-mono text-xs text-orange-400/90 tracking-[4px] uppercase font-bold">
                    HEAVY FREIGHT CORRIDORS
                  </span>
                </div>
              </div>

              {/* Description Paragraph */}
              <p className="max-w-xl text-sm sm:text-base text-[#d1d5db] leading-relaxed font-light bg-black/40 p-4 border-l-2 border-orange-500 border-y border-r border-white/5">
                {t.hero.description}
              </p>

              {/* Quick Industrial Fleet & Management Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 max-w-xl">
                <div className="bg-[#111318] border border-white/10 p-3.5 flex items-center space-x-3 hover:border-orange-500/50 transition-colors">
                  <div className="p-2 bg-orange-500/10 border border-orange-500/20 text-orange-400">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-white font-mono font-bold text-xs uppercase block">{t.hero.highlight1Title}</span>
                    <span className="text-[#888] font-mono text-[10px] block">{t.hero.highlight1Sub}</span>
                  </div>
                </div>

                <div className="bg-[#111318] border border-white/10 p-3.5 flex items-center space-x-3 hover:border-orange-500/50 transition-colors">
                  <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-white font-mono font-bold text-xs uppercase block">{t.hero.highlight2Title}</span>
                    <span className="text-[#888] font-mono text-[10px] block">{t.hero.highlight2Sub}</span>
                  </div>
                </div>
              </div>

              {/* Heavy Action CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => scrollToSection('history')}
                  className="bg-orange-500 hover:bg-orange-600 text-black font-mono font-black text-xs uppercase tracking-widest px-6 py-4 transition flex items-center space-x-2 cursor-pointer shadow-xl shadow-orange-950/60"
                >
                  <span>{t.hero.btnHistory}</span>
                  <ChevronRight className="h-4 w-4 stroke-[3]" />
                </button>

                <button
                  onClick={() => scrollToSection('fleet')}
                  className="bg-[#111318] hover:bg-[#181b22] border border-white/20 hover:border-orange-500/60 text-white font-mono font-bold text-xs uppercase tracking-widest px-6 py-4 transition flex items-center space-x-2 cursor-pointer"
                >
                  <span>{t.hero.btnFleet}</span>
                </button>

                <button
                  onClick={onContactClick || (() => scrollToSection('management-contacts-section'))}
                  className="bg-transparent border-2 border-orange-500 hover:bg-orange-500 hover:text-black text-orange-400 font-mono font-black text-xs uppercase tracking-widest px-6 py-3.5 transition flex items-center space-x-2 cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  <span>{t.hero.btnContact}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Operational Telemetry Panel — kept out of the top row so it doesn't sit over the
              background artwork; now a full-width strip between the hero copy and Advantages. */}
          <div className="mt-12 lg:mt-16">
            <div className="border border-white/15 bg-[#0e1015] p-5 relative">
              {/* Decorative Industrial Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-orange-500" />
                  <span className="font-mono text-xs uppercase font-extrabold tracking-widest text-white">
                    OPERATIONAL TELEMETRY
                  </span>
                </div>
                <span className="font-mono text-[10px] text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 border border-orange-500/30">
                  LIVE • 24/7
                </span>
              </div>

              {/* Quick Stats Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                id="hero-stats-grid"
              >
                {/* Stat 1 */}
                <motion.div variants={itemVariants} className="bg-[#14171e] p-4 border border-white/10 hover:border-orange-500/50 transition-colors">
                  <div className="flex items-center justify-between text-orange-400 mb-2">
                    <Globe2 className="h-5 w-5" />
                    <span className="font-mono text-[9px] text-[#666] font-bold">[01]</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">{t.hero.stats.stat1Num}</div>
                  <div className="text-[10px] font-mono font-bold text-[#aaa] mt-1 uppercase tracking-wider">{t.hero.stats.stat1Label}</div>
                </motion.div>

                {/* Stat 2 */}
                <motion.div variants={itemVariants} className="bg-[#14171e] p-4 border border-white/10 hover:border-orange-500/50 transition-colors">
                  <div className="flex items-center justify-between text-amber-400 mb-2">
                    <Clock className="h-5 w-5" />
                    <span className="font-mono text-[9px] text-[#666] font-bold">[02]</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">{t.hero.stats.stat2Num}</div>
                  <div className="text-[10px] font-mono font-bold text-[#aaa] mt-1 uppercase tracking-wider">{t.hero.stats.stat2Label}</div>
                </motion.div>

                {/* Stat 3 */}
                <motion.div variants={itemVariants} className="bg-[#14171e] p-4 border border-white/10 hover:border-orange-500/50 transition-colors">
                  <div className="flex items-center justify-between text-orange-400 mb-2">
                    <Shield className="h-5 w-5" />
                    <span className="font-mono text-[9px] text-[#666] font-bold">[03]</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">{t.hero.stats.stat3Num}</div>
                  <div className="text-[10px] font-mono font-bold text-[#aaa] mt-1 uppercase tracking-wider">{t.hero.stats.stat3Label}</div>
                </motion.div>

                {/* Stat 4 */}
                <motion.div variants={itemVariants} className="bg-[#14171e] p-4 border border-white/10 hover:border-orange-500/50 transition-colors">
                  <div className="flex items-center justify-between text-amber-400 mb-2">
                    <Truck className="h-5 w-5" />
                    <span className="font-mono text-[9px] text-[#666] font-bold">[04]</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">{t.hero.stats.stat4Num}</div>
                  <div className="text-[10px] font-mono font-bold text-[#aaa] mt-1 uppercase tracking-wider">{t.hero.stats.stat4Label}</div>
                </motion.div>
              </motion.div>

              {/* Industrial bottom spec strip */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#777]">
                <span>CARRIER CODE: #LEV-2010</span>
                <span className="text-orange-400 font-bold">CMR / TIR / T1 READY</span>
              </div>
            </div>
          </div>

          {/* Advantages Industrial Grid */}
          <div className="mt-16 sm:mt-24 border border-white/15 bg-[#0d0f14] p-6 sm:p-8" id="advantages-section">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
              
              {/* 1 */}
              <div className="flex flex-col p-3 space-y-3">
                <div className="h-12 w-12 flex items-center justify-center bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono font-black text-xl">
                  01
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-mono font-extrabold tracking-wider text-white uppercase">
                    {t.hero.advantages.item1Title}
                  </h3>
                  <p className="text-xs text-[#999] font-light leading-relaxed">
                    {t.hero.advantages.item1Sub}
                  </p>
                </div>
              </div>

              {/* 2 */}
              <div className="flex flex-col p-3 space-y-3 pt-6 sm:pt-3 lg:pl-6">
                <div className="h-12 w-12 flex items-center justify-center bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono font-black text-xl">
                  02
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-mono font-extrabold tracking-wider text-white uppercase">
                    {t.hero.advantages.item2Title}
                  </h3>
                  <p className="text-xs text-[#999] font-light leading-relaxed">
                    {t.hero.advantages.item2Sub}
                  </p>
                </div>
              </div>

              {/* 3 */}
              <div className="flex flex-col p-3 space-y-3 pt-6 sm:pt-3 lg:pl-6">
                <div className="h-12 w-12 flex items-center justify-center bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono font-black text-xl">
                  03
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-mono font-extrabold tracking-wider text-white uppercase">
                    {t.hero.advantages.item3Title}
                  </h3>
                  <p className="text-xs text-[#999] font-light leading-relaxed">
                    {t.hero.advantages.item3Sub}
                  </p>
                </div>
              </div>

              {/* 4 */}
              <div className="flex flex-col p-3 space-y-3 pt-6 sm:pt-3 lg:pl-6">
                <div className="h-12 w-12 flex items-center justify-center bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono font-black text-xl">
                  04
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-mono font-extrabold tracking-wider text-white uppercase">
                    {t.hero.advantages.item4Title}
                  </h3>
                  <p className="text-xs text-[#999] font-light leading-relaxed">
                    {t.hero.advantages.item4Sub}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Transport Modes Showcase */}
          <div className="mt-16 sm:mt-24 border-t border-white/10 pt-12" id="services-showcase">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 mb-3">
                <Flame className="h-3.5 w-3.5 text-orange-400" />
                <span className="font-mono text-xs font-bold text-orange-400 uppercase tracking-widest">
                  {t.hero.servicesHeader}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">{t.hero.servicesTitle}</h2>
              <div className="h-1 w-16 bg-orange-500 mx-auto mt-3" />
              <p className="text-xs font-mono text-[#aaa] mt-4 uppercase tracking-wider">{t.hero.servicesSub}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {t.hero.directions.map((direction, idx) => {
                const IconComponent = DIRECTION_ICONS[direction.id] || Truck;
                const colSpanClass = idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
                return (
                  <div 
                    key={direction.id}
                    className={`bg-[#111318] hover:bg-[#171a22] border border-white/15 hover:border-orange-500 p-6 sm:p-7 transition-all duration-200 flex flex-col justify-between h-full group relative overflow-hidden ${colSpanClass}`}
                  >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                        <div className="flex h-11 w-11 items-center justify-center bg-orange-500/10 border border-orange-500/30 text-orange-400 group-hover:bg-orange-500 group-hover:text-black transition-colors">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-mono text-[#666] uppercase tracking-wider block font-bold">
                            {t3('Сроки доставки', 'Transit Time', 'Առաքման ժամկետ')}
                          </span>
                          <span className="font-mono text-xs font-extrabold text-orange-400 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 inline-block mt-0.5">
                            {direction.speed}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="font-serif text-xl font-bold uppercase text-white tracking-tight group-hover:text-orange-400 transition-colors">
                        {direction.name}
                      </h3>
                      <p className="text-xs text-[#aaa] mt-3 leading-relaxed font-light">
                        {direction.description}
                      </p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-orange-400 font-bold uppercase">
                      <span>{direction.footnote}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 sm:mt-24 border-t border-white/10 pt-16" id="faq-section">
            <div className="text-center max-w-2xl mx-auto mb-10">
              {t.hero.faqHeader && (
                <span className="font-mono text-xs font-bold text-orange-400 uppercase tracking-[3px] block mb-2">{t.hero.faqHeader}</span>
              )}
              <h2 className="font-serif text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">{t.hero.faqTitle}</h2>
              <div className="h-1 w-16 bg-orange-500 mx-auto mt-3" />
              <p className="text-xs font-mono text-[#aaa] mt-4 uppercase tracking-wider">{t.hero.faqSub}</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-3">
              {t.hero.faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-[#111318] border border-white/10 transition-colors hover:border-orange-500/40"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left px-6 py-4 sm:py-5 flex items-center justify-between gap-4 focus:outline-none group cursor-pointer"
                    >
                      <div className="flex items-center space-x-3.5">
                        <HelpCircle className="h-5 w-5 text-orange-500 shrink-0" />
                        <span className="font-mono font-bold text-sm sm:text-base text-white group-hover:text-orange-400 transition-colors uppercase">
                          {item.question}
                        </span>
                      </div>
                      <div className={`p-1.5 border border-white/10 bg-white/5 text-orange-400 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-orange-500 text-black' : ''}`}>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 py-4 text-xs sm:text-sm text-[#ccc] font-light leading-relaxed bg-black/40 border-t border-white/10 whitespace-pre-line">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Management & Contacts Industrial Panel */}
          <div 
            className="mt-16 sm:mt-24 relative overflow-hidden py-14 sm:py-20 border-t border-white/10" 
            id="management-contacts-section"
          >
            <div className="relative z-10 mx-auto max-w-7xl">
              <div className="text-center max-w-2xl mx-auto mb-12">
                {t.hero.contactsHeader && (
                  <span className="font-mono text-xs font-bold text-orange-400 uppercase tracking-[3px] block mb-2">{t.hero.contactsHeader}</span>
                )}
                <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">{t.hero.contactsTitle}</h2>
                <div className="h-1 w-16 bg-orange-500 mx-auto mt-3" />
                {t.hero.contactsSub && (
                  <p className="text-xs font-mono text-[#aaa] mt-4 uppercase tracking-wider">
                    {t.hero.contactsSub}
                  </p>
                )}
              </div>

              {/* Four B2B Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                {/* 1: CEO / Avetik (Руководитель) */}
                <div className="bg-[#111318] border-2 border-orange-500 p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl">
                  <div className="space-y-5">
                    <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
                      <div className="h-14 w-14 bg-orange-500 text-black flex items-center justify-center font-mono font-black text-xl shrink-0">
                        {t3('АЗ', 'AZ', 'ԱԶ')}
                      </div>
                      <div>
                        {t.hero.ceoRole && (
                          <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest font-extrabold block">{t.hero.ceoRole}</span>
                        )}
                        <h3 className="font-serif text-2xl font-bold uppercase text-white mt-0.5">{t.hero.ceoName}</h3>
                        <p className="text-[11px] text-[#aaa] font-mono">{t.hero.ceoDesc}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        {t.hero.ceoPhoneLabel && (
                          <p className="text-[9px] font-mono text-[#777] uppercase tracking-wider font-bold">{t.hero.ceoPhoneLabel}</p>
                        )}
                        <a
                          href="tel:+37494902007"
                          className="flex items-center space-x-2 text-xl font-mono font-extrabold text-white hover:text-orange-400 transition"
                        >
                          <Phone className="h-5 w-5 text-orange-500 shrink-0" />
                          <span>+374 94 902007</span>
                        </a>
                      </div>

                      <div className="space-y-1">
                        {t.hero.ceoEmailLabel && (
                          <p className="text-[9px] font-mono text-[#777] uppercase tracking-wider font-bold">{t.hero.ceoEmailLabel}</p>
                        )}
                        <a
                          href="mailto:avet_avet83@mail.ru"
                          className="flex items-center space-x-2 text-sm font-mono text-[#ccc] hover:text-orange-400 transition break-all"
                        >
                          <Mail className="h-4 w-4 text-orange-500 shrink-0" />
                          <span>avet_avet83@mail.ru</span>
                        </a>
                      </div>

                      <div className="space-y-2 pt-1 border-t border-white/10">
                        {t.hero.ceoMessengersLabel && (
                          <p className="text-[9px] font-mono text-[#777] uppercase tracking-wider font-bold">{t.hero.ceoMessengersLabel}</p>
                        )}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <a 
                            href="https://t.me/+37494902007" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center space-x-1.5 bg-white/5 hover:bg-orange-500 hover:text-black border border-white/15 text-orange-400 px-3 py-2 text-xs transition font-mono uppercase font-bold"
                          >
                            <Send className="h-3.5 w-3.5" />
                            <span>Telegram</span>
                          </a>
                          <a
                            href="https://wa.me/37494902007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1.5 bg-white/5 hover:bg-emerald-500 hover:text-black border border-white/15 text-emerald-400 px-3 py-2 text-xs transition font-mono uppercase font-bold"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href="viber://chat?number=%2B37494902007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1.5 bg-white/5 hover:bg-purple-500 hover:text-black border border-white/15 text-purple-400 px-3 py-2 text-xs transition font-mono uppercase font-bold"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>Viber</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2: Sales / Sargis */}
                <div className="bg-[#111318] border border-white/15 hover:border-orange-500/60 p-6 sm:p-8 flex flex-col justify-between relative shadow-xl transition-colors">
                  <div className="space-y-5">
                    <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
                      <div className="h-14 w-14 bg-[#1e222c] border border-white/20 text-white flex items-center justify-center font-mono font-black text-xl shrink-0">
                        {t3('СВ', 'SV', 'ՍՎ')}
                      </div>
                      <div>
                        {t.hero.salesRole && (
                          <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest font-extrabold block">{t.hero.salesRole}</span>
                        )}
                        <h3 className="font-serif text-2xl font-bold uppercase text-white mt-0.5">{t.hero.salesName}</h3>
                        {t.hero.salesDesc && (
                          <p className="text-[11px] text-[#aaa] font-mono">{t.hero.salesDesc}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        {t.hero.salesPhoneLabel && (
                          <p className="text-[9px] font-mono text-[#777] uppercase tracking-wider font-bold">{t.hero.salesPhoneLabel}</p>
                        )}
                        <a
                          href="tel:+37499902007"
                          className="flex items-center space-x-2 text-xl font-mono font-extrabold text-white hover:text-orange-400 transition"
                        >
                          <Phone className="h-5 w-5 text-orange-500 shrink-0" />
                          <span>+374 99 902007</span>
                        </a>
                      </div>

                      <div className="space-y-2">
                        {t.hero.messengersLabel && (
                          <p className="text-[9px] font-mono text-[#777] uppercase tracking-wider font-bold">{t.hero.messengersLabel}</p>
                        )}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <a 
                            href="https://t.me/+37499902007" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center space-x-1.5 bg-white/5 hover:bg-orange-500 hover:text-black border border-white/15 text-orange-400 px-3 py-2 text-xs transition font-mono uppercase font-bold"
                          >
                            <Send className="h-3.5 w-3.5" />
                            <span>Telegram</span>
                          </a>
                          <a
                            href="https://wa.me/37499902007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1.5 bg-white/5 hover:bg-emerald-500 hover:text-black border border-white/15 text-emerald-400 px-3 py-2 text-xs transition font-mono uppercase font-bold"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href="viber://chat?number=%2B37499902007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1.5 bg-white/5 hover:bg-purple-500 hover:text-black border border-white/15 text-purple-400 px-3 py-2 text-xs transition font-mono uppercase font-bold"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>Viber</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3: Logistics Department */}
                <div className="bg-[#111318] border border-white/15 hover:border-orange-500/60 p-6 sm:p-8 flex flex-col justify-between relative shadow-xl transition-colors">
                  <div className="space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="border-b border-white/10 pb-4">
                        {t.hero.logisticsRole && (
                          <span className="text-[9px] font-mono text-[#888] uppercase tracking-widest font-extrabold block">{t.hero.logisticsRole}</span>
                        )}
                        <h3 className="font-serif text-xl font-bold uppercase text-white mt-1 leading-snug">{t.hero.logisticsName}</h3>
                        {t.hero.logisticsDesc && (
                          <p className="text-[11px] text-[#aaa] font-mono mt-1 leading-snug">
                            {t.hero.logisticsDesc}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          {t.hero.logisticsPhoneLabel && (
                            <p className="text-[9px] font-mono text-[#777] uppercase tracking-wider font-bold">{t.hero.logisticsPhoneLabel}</p>
                          )}
                          <a
                            href="tel:+37455902007"
                            className="flex items-center space-x-2 text-sm font-mono font-bold text-white hover:text-orange-400 transition"
                          >
                            <Phone className="h-4 w-4 text-orange-500 shrink-0" />
                            <span>+374 55 902007</span>
                          </a>
                        </div>

                        <div className="space-y-1">
                          {t.hero.logisticsEmailLabel && (
                            <p className="text-[9px] font-mono text-[#777] uppercase tracking-wider font-bold">{t.hero.logisticsEmailLabel}</p>
                          )}
                          <div className="space-y-0.5">
                            <a
                              href="mailto:levavlogistics@gmail.com"
                              className="flex items-center space-x-2 text-sm font-mono text-[#ccc] hover:text-orange-400 transition break-all"
                            >
                              <Mail className="h-4 w-4 text-orange-500 shrink-0" />
                              <span>levavlogistics@gmail.com</span>
                            </a>
                            <a
                              href="mailto:avet_avet83@mail.ru"
                              className="flex items-center space-x-2 text-sm font-mono text-[#ccc] hover:text-orange-400 transition break-all"
                            >
                              <Mail className="h-4 w-4 text-orange-500 shrink-0" />
                              <span>avet_avet83@mail.ru</span>
                            </a>
                          </div>
                        </div>

                        <div className="space-y-1 pt-1 border-t border-white/10">
                          {t.hero.logisticsMessengersLabel && (
                            <p className="text-[9px] font-mono text-[#777] uppercase tracking-wider font-bold">{t.hero.logisticsMessengersLabel}</p>
                          )}
                          <div className="flex flex-wrap gap-2 pt-1">
                            <a
                              href="https://t.me/+37455902007"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1.5 bg-white/5 hover:bg-orange-500 hover:text-black border border-white/15 text-orange-400 px-3 py-2 text-xs transition font-mono uppercase font-bold"
                            >
                              <Send className="h-3.5 w-3.5" />
                              <span>Telegram</span>
                            </a>
                            <a
                              href="https://wa.me/37455902007"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1.5 bg-white/5 hover:bg-emerald-500 hover:text-black border border-white/15 text-emerald-400 px-3 py-2 text-xs transition font-mono uppercase font-bold"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href="viber://chat?number=%2B37455902007"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1.5 bg-white/5 hover:bg-purple-500 hover:text-black border border-white/15 text-purple-400 px-3 py-2 text-xs transition font-mono uppercase font-bold"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>Viber</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[10px] text-[#777] font-mono gap-1">
                      <span>{t.hero.workingHours}</span>
                      <span className="text-orange-400">{t.hero.timezone}</span>
                    </div>
                  </div>
                </div>

                {/* 4: Documents & General Inquiries (Administration) */}
                <div className="bg-[#111318] border border-white/15 hover:border-orange-500/60 p-6 sm:p-8 flex flex-col justify-between relative shadow-xl transition-colors">
                  <div className="space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="border-b border-white/10 pb-4">
                        {t.hero.adminRole && (
                          <span className="text-[9px] font-mono text-[#888] uppercase tracking-widest font-extrabold block">{t.hero.adminRole}</span>
                        )}
                        <h3 className="font-serif text-xl font-bold uppercase text-white mt-1 leading-snug">{t.hero.adminName}</h3>
                        {t.hero.adminDesc && (
                          <p className="text-[11px] text-[#aaa] font-mono mt-1 leading-snug">
                            {t.hero.adminDesc}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          {t.hero.adminPhonesLabel && (
                            <p className="text-[9px] font-mono text-[#777] uppercase tracking-wider font-bold">{t.hero.adminPhonesLabel}</p>
                          )}
                          <a
                            href="tel:+37495902007"
                            className="flex items-center space-x-2 text-sm font-mono font-bold text-white hover:text-orange-400 transition"
                          >
                            <Phone className="h-4 w-4 text-orange-500 shrink-0" />
                            <span>+374 95 902007</span>
                          </a>
                        </div>

                        <div className="space-y-1">
                          {t.hero.adminEmailLabel && (
                            <p className="text-[9px] font-mono text-[#777] uppercase tracking-wider font-bold">{t.hero.adminEmailLabel}</p>
                          )}
                          <div className="space-y-0.5">
                            <a
                              href="mailto:levavlogistics@gmail.com"
                              className="flex items-center space-x-2 text-sm font-mono text-[#ccc] hover:text-orange-400 transition break-all"
                            >
                              <Mail className="h-4 w-4 text-orange-500 shrink-0" />
                              <span>levavlogistics@gmail.com</span>
                            </a>
                            <a
                              href="mailto:avet_avet83@mail.ru"
                              className="flex items-center space-x-2 text-sm font-mono text-[#ccc] hover:text-orange-400 transition break-all"
                            >
                              <Mail className="h-4 w-4 text-orange-500 shrink-0" />
                              <span>avet_avet83@mail.ru</span>
                            </a>
                          </div>
                        </div>

                        <div className="space-y-1 pt-1 border-t border-white/10">
                          {t.hero.adminMessengersLabel && (
                            <p className="text-[9px] font-mono text-[#777] uppercase tracking-wider font-bold">{t.hero.adminMessengersLabel}</p>
                          )}
                          <div className="flex flex-wrap gap-2 pt-1">
                            <a
                              href="https://t.me/+37495902007"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1.5 bg-white/5 hover:bg-orange-500 hover:text-black border border-white/15 text-orange-400 px-3 py-2 text-xs transition font-mono uppercase font-bold"
                            >
                              <Send className="h-3.5 w-3.5" />
                              <span>Telegram</span>
                            </a>
                            <a
                              href="https://wa.me/37495902007"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1.5 bg-white/5 hover:bg-emerald-500 hover:text-black border border-white/15 text-emerald-400 px-3 py-2 text-xs transition font-mono uppercase font-bold"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href="viber://chat?number=%2B37495902007"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1.5 bg-white/5 hover:bg-purple-500 hover:text-black border border-white/15 text-purple-400 px-3 py-2 text-xs transition font-mono uppercase font-bold"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>Viber</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[10px] text-[#777] font-mono gap-1">
                      <span>{t.hero.workingHours}</span>
                      <span className="text-orange-400">{t.hero.timezone}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Download Profile Card Button */}
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleDownloadCard}
                  className="inline-flex items-center space-x-3 bg-orange-500 hover:bg-orange-600 text-black border border-orange-400 px-8 py-4 text-xs font-mono font-extrabold uppercase tracking-widest transition shadow-xl cursor-pointer"
                >
                  <Download className="h-4 w-4 text-black animate-bounce" />
                  <span>{t.hero.downloadCardBtn}</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
