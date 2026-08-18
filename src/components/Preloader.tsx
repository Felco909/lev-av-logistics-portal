import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export default function Preloader({ onComplete, minDuration = 800 }: PreloaderProps) {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(15);
  const [stage, setStage] = useState(0);

  const statusMessages = {
    ru: [
      'Инициализация системы...',
      'Подключение логистических каналов...',
      'Загрузка автопарка и направлений...',
      'Подготовка интерфейса LEV&AV...',
      'Готово к работе'
    ],
    en: [
      'Initializing system...',
      'Connecting logistics channels...',
      'Loading fleet and transit corridors...',
      'Preparing LEV&AV interface...',
      'Ready'
    ],
    hy: [
      'Համակարգի նախաձեռնում...',
      'Լոգիստիկ ուղիների միացում...',
      'Ավտոպարկի և երթուղիների բեռնում...',
      'LEV&AV միջերեսի պատրաստում...',
      'Պատրաստ է աշխատանքի'
    ]
  };

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 40) {
          setStage(1);
          return prev + Math.floor(Math.random() * 15) + 5;
        } else if (prev < 80) {
          setStage(2);
          return prev + Math.floor(Math.random() * 12) + 6;
        } else if (prev < 96) {
          setStage(3);
          return prev + Math.floor(Math.random() * 5) + 2;
        }
        return prev;
      });
    }, 100);

    const handleLoadComplete = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsedTime);

      setTimeout(() => {
        setProgress(100);
        setStage(4);
        setTimeout(() => {
          setLoading(false);
          if (onComplete) {
            onComplete();
          }
        }, 300);
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      handleLoadComplete();
    } else {
      window.addEventListener('load', handleLoadComplete);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoadComplete);
    };
  }, [minDuration, onComplete]);

  const currentStatusText = statusMessages[lang][stage] || statusMessages[lang][0];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#08090b] select-none pointer-events-auto"
          id="portal-preloader"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm text-center px-6">
            
            {/* Bold Industrial Typography Brand */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-1 mb-8"
            >
              <div className="font-serif font-black text-4xl sm:text-5xl tracking-tight text-white uppercase leading-none">
                LEV<span className="text-orange-500">&</span>AV
              </div>
              <div className="flex items-center justify-center space-x-2 pt-2">
                <span className="h-[2px] w-6 bg-orange-500"></span>
                <span className="text-[9px] font-mono tracking-[3px] text-orange-400 uppercase font-bold">
                  HEAVY FREIGHT LOGISTICS
                </span>
                <span className="h-[2px] w-6 bg-orange-500"></span>
              </div>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2.5">
              <div className="h-1.5 w-full bg-white/10 overflow-hidden relative border border-white/10">
                <motion.div 
                  className="h-full bg-orange-500 relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-white shadow-[0_0_8px_#ffffff]" />
                </motion.div>
              </div>

              {/* Dynamic Status info */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#777]">
                <span className="truncate pr-2 uppercase">{currentStatusText}</span>
                <span className="text-orange-400 font-extrabold">{Math.min(100, Math.round(progress))}%</span>
              </div>
            </div>

            {/* Location tagline */}
            <div className="mt-8 text-[9px] font-mono text-[#555] tracking-widest uppercase">
              {lang === 'ru'
                ? 'СНГ • ЕВРОПА • КИТАЙ • С 2010 ГОДА'
                : lang === 'hy'
                  ? 'ԱՊՀ • ԵՎՐՈՊԱ • ՉԻՆԱՍՏԱՆ • 2010Թ-ԻՑ'
                  : 'CIS • EUROPE • CHINA • EST. 2010'}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
