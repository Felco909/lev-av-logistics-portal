import React from 'react';
import { RefreshCw, Maximize2, Minimize2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { MapPreset } from './types';

interface MapControlsProps {
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  mapPreset: MapPreset;
  onChangePreset: (preset: MapPreset) => void;
}

const PRESET_LABEL: Record<MapPreset, { ru: string; en: string }> = {
  world: { ru: 'Весь мир', en: 'World' },
  eurasia: { ru: 'Евразия', en: 'Eurasia' },
  caucasus: { ru: 'Кавказ', en: 'Caucasus' },
  armenia: { ru: 'Армения', en: 'Armenia' },
};

const PRESETS: MapPreset[] = ['world', 'eurasia', 'caucasus', 'armenia'];

export default function MapControls({ isAutoPlaying, onToggleAutoPlay, isFullscreen, onToggleFullscreen, mapPreset, onChangePreset }: MapControlsProps) {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div role="group" aria-label={lang === 'ru' ? 'Масштаб карты' : 'Map zoom preset'} className="flex items-center bg-black/50 border border-white/10 p-1">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            aria-pressed={mapPreset === preset}
            onClick={() => onChangePreset(preset)}
            className={`px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
              mapPreset === preset ? 'bg-orange-500 text-black font-extrabold shadow' : 'text-[#888] hover:text-white'
            }`}
          >
            {lang === 'ru' ? PRESET_LABEL[preset].ru : PRESET_LABEL[preset].en}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onToggleAutoPlay}
        aria-pressed={isAutoPlaying}
        aria-label={lang === 'ru' ? 'Переключить автопрокрутку маршрутов' : 'Toggle route auto-tour'}
        className={`px-3 py-2 text-xs font-mono font-bold uppercase border flex items-center space-x-1.5 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
          isAutoPlaying ? 'bg-orange-500/15 text-orange-400 border-orange-500/40' : 'bg-black/40 text-[#888] border-white/10 hover:text-white'
        }`}
      >
        <RefreshCw className={`h-3.5 w-3.5 ${isAutoPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
        <span>{isAutoPlaying ? (lang === 'ru' ? 'Авто-тур: ВКЛ' : 'Auto Tour: ON') : lang === 'ru' ? 'Авто-тур: ВЫКЛ' : 'Auto Tour: OFF'}</span>
      </button>

      <button
        type="button"
        onClick={onToggleFullscreen}
        aria-label={lang === 'ru' ? 'На весь экран' : 'Toggle fullscreen'}
        className="p-2 bg-black/40 hover:bg-orange-500 hover:text-black border border-white/10 text-[#aaa] transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
      >
        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
