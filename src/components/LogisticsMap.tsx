import React, { useEffect, useMemo, useRef, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, type ZoomBehavior } from 'd3-zoom';
import { useLanguage } from '../context/LanguageContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { DESTINATIONS, ROUTES, ARMENIA_HUB, LogisticsRoute, getRouteForDestination } from '../data/logisticsData';
import CountryLayer from './map/CountryLayer';
import ArmeniaHub from './map/ArmeniaHub';
import RouteLayer from './map/RouteLayer';
import RouteTooltip from './map/RouteTooltip';
import RouteCard from './map/RouteCard';
import DirectionFilter, { FilterValue } from './map/DirectionFilter';
import MapControls from './map/MapControls';
import type { MapPreset } from './map/types';

export interface LogisticsMapProps {
  onSelectRoute?: (routeLabel: string) => void;
  selectedCategory?: FilterValue;
}

export default function LogisticsMap({ onSelectRoute, selectedCategory = 'all' }: LogisticsMapProps) {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();

  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const zoomBehaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const [size, setSize] = useState({ width: 960, height: 520 });
  const [zoomK, setZoomK] = useState(1);
  const [mapPreset, setMapPreset] = useState<MapPreset>('caucasus');
  const [selectedDestId, setSelectedDestId] = useState<string>(DESTINATIONS[1]?.id ?? DESTINATIONS[0].id);
  const [hoveredDestId, setHoveredDestId] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(!reduceMotion);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<FilterValue>(selectedCategory);
  const [mobileCardOpen, setMobileCardOpen] = useState<boolean>(false);

  useEffect(() => setFilterCategory(selectedCategory), [selectedCategory]);

  // 1. Measure the map canvas (not the whole card, which also holds headers/filters) so the D3
  // projection is sized in the exact pixel box the SVG actually renders into.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) setSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { width, height } = size;

  // 1. D3 Mercator projection, switched per zoom preset.
  const projection = useMemo(() => {
    const proj = geoMercator();
    if (mapPreset === 'armenia') {
      proj.center([44.5152, 40.1872]).scale(width * 6.5).translate([width / 2, height / 2]);
    } else if (mapPreset === 'caucasus') {
      proj.center([44.0, 40.5]).scale(width * 1.8).translate([width / 2, height / 2]);
    } else if (mapPreset === 'eurasia') {
      proj.center([68.0, 44.0]).scale(width * 0.4).translate([width / 2, height / 2]);
    } else {
      proj.center([50.0, 32.0]).scale(width * 0.22).translate([width / 2, height / 2]);
    }
    return proj;
  }, [width, height, mapPreset]);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  // 6. D3 zoom / pan gesture binding.
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;
    const svg = select(svgRef.current);
    const g = select(gRef.current);

    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.6, 18])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
        setZoomK(event.transform.k);
      });

    svg.call(zoomBehavior);
    zoomBehaviorRef.current = zoomBehavior;

    return () => {
      svg.on('.zoom', null);
    };
  }, [width, height]);

  // Reset any active pan/zoom offset whenever the preset changes so it doesn't compound.
  // (Applied instantly, not via a d3 transition, to avoid pulling in the extra d3-transition
  // module for a single cosmetic tween — also keeps preset switches snappy per the performance brief.)
  useEffect(() => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    select(svgRef.current).call(zoomBehaviorRef.current.transform, zoomIdentity);
  }, [mapPreset]);

  const visibleDestinations = useMemo(
    () => DESTINATIONS.filter((d) => !d.isArmeniaHub && (filterCategory === 'all' || d.category === filterCategory)),
    [filterCategory]
  );

  useEffect(() => {
    if (visibleDestinations.length && !visibleDestinations.some((d) => d.id === selectedDestId)) {
      setSelectedDestId(visibleDestinations[0].id);
    }
  }, [visibleDestinations, selectedDestId]);

  useEffect(() => {
    if (!isAutoPlaying || hoveredDestId || reduceMotion || visibleDestinations.length < 2) return;
    const timer = setInterval(() => {
      setSelectedDestId((prevId) => {
        const idx = visibleDestinations.findIndex((d) => d.id === prevId);
        const next = (idx + 1) % visibleDestinations.length;
        return visibleDestinations[next]?.id || visibleDestinations[0].id;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, hoveredDestId, reduceMotion, visibleDestinations]);

  const activeDestId = hoveredDestId || selectedDestId;
  const activeDest = DESTINATIONS.find((d) => d.id === activeDestId) || visibleDestinations[0] || DESTINATIONS[1];
  const activeRoute: LogisticsRoute | undefined = activeDest ? getRouteForDestination(activeDest.id) : undefined;

  const hoveredDest = hoveredDestId ? DESTINATIONS.find((d) => d.id === hoveredDestId) : null;
  const hoveredRoute = hoveredDest ? getRouteForDestination(hoveredDest.id) : null;
  const hoveredCoords = hoveredDest ? projection([hoveredDest.lng, hoveredDest.lat]) : null;

  const hubXYRaw = projection([ARMENIA_HUB.lng, ARMENIA_HUB.lat]);
  const hubXY: [number, number] = hubXYRaw ? [hubXYRaw[0], hubXYRaw[1]] : [width / 2, height / 2];

  const routeLabel = (route: LogisticsRoute) => (lang === 'ru' ? route.labelRu : route.labelEn);

  const handleBooking = (route: LogisticsRoute) => {
    const title = lang === 'ru' ? route.labelRu : route.labelEn;
    if (onSelectRoute) {
      onSelectRoute(title);
    } else {
      const el = document.getElementById('management-contacts-section') || document.getElementById('floating-cta-button');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelect = (destId: string) => {
    setSelectedDestId(destId);
    setIsAutoPlaying(false);
    setMobileCardOpen(true);
  };

  return (
    <div
      className={`relative bg-[#0b0d13] border-2 border-white/15 overflow-hidden shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 p-4 sm:p-8 bg-[#08090b]' : 'p-4 sm:p-8 my-8'
      }`}
      id="interactive-logistics-map"
    >
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-white/10 pb-5 mb-6 gap-4 relative z-20">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 mb-2">
            <span className="h-2 w-2 bg-orange-500 rounded-full animate-ping" />
            <span className="font-mono text-[11px] font-bold text-orange-400 uppercase tracking-widest">
              {lang === 'ru' ? 'ИНТЕРАКТИВНАЯ КАРТА МАРШРУТОВ ИЗ АРМЕНИИ' : 'INTERACTIVE LOGISTICS MAP FROM ARMENIA'}
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-black uppercase text-white tracking-tight flex flex-wrap items-center gap-2">
            <span>{lang === 'ru' ? 'Центральный хаб:' : 'Central Hub:'}</span>
            <span className="text-orange-500">{lang === 'ru' ? 'Ереван ➔ Международные направления' : 'Yerevan ➔ Global Destinations'}</span>
          </h3>
          <p className="text-xs text-[#aaa] font-mono mt-1">
            {lang === 'ru'
              ? 'Перетаскивайте карту и крутите колесо для масштабирования, нажмите на город для деталей маршрута'
              : 'Drag to pan, scroll to zoom, click any city for route details'}
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-2">
          <MapControls
            isAutoPlaying={isAutoPlaying}
            onToggleAutoPlay={() => setIsAutoPlaying((v) => !v)}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen((v) => !v)}
            mapPreset={mapPreset}
            onChangePreset={setMapPreset}
          />
          <DirectionFilter routes={ROUTES} value={filterCategory} onChange={setFilterCategory} />
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        <div className="lg:col-span-8 bg-[#07080c] border border-white/15 relative overflow-hidden shadow-inner">
          <div
            ref={canvasRef}
            className={`relative w-full ${isFullscreen ? 'h-[75vh]' : 'h-[380px] sm:h-[460px] lg:h-[520px]'}`}
            style={{ minHeight: isFullscreen ? undefined : 380 }}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none industrial-grid" />

            {/* Rendered box comes purely from this wrapper's CSS (width/height above) — never from
                the viewBox numbers below — so there is no feedback loop between the ResizeObserver
                that measures this box and the SVG's own layout size. */}
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="none"
              className="block select-none relative z-10 cursor-grab active:cursor-grabbing"
              role="img"
              aria-label={lang === 'ru' ? 'Интерактивная карта международных маршрутов LEV&AV из Еревана' : 'Interactive LEV&AV international route map from Yerevan'}
            >
            <defs>
              <linearGradient id="armeniaGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#df7f3e" stopOpacity="1" />
                <stop offset="100%" stopColor="#ce6326" stopOpacity="1" />
              </linearGradient>
              <filter id="glowEffect" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="hubGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <rect x="0" y="0" width={width} height={height} fill="#07080c" />

            <g ref={gRef}>
              <CountryLayer pathGenerator={pathGenerator} mapPreset={mapPreset} />
              <ArmeniaHub projection={projection} pathGenerator={pathGenerator} mapPreset={mapPreset} zoomK={zoomK} reduceMotion={reduceMotion} />
              <RouteLayer
                projection={projection}
                hubXY={hubXY}
                destinations={visibleDestinations}
                getRoute={getRouteForDestination}
                selectedDestId={selectedDestId}
                hoveredDestId={hoveredDestId}
                zoomK={zoomK}
                reduceMotion={reduceMotion}
                onSelect={handleSelect}
                onHover={setHoveredDestId}
              />
            </g>
          </svg>

            {hoveredDest && hoveredRoute && hoveredCoords && (
              <RouteTooltip dest={hoveredDest} route={hoveredRoute} coords={[hoveredCoords[0], hoveredCoords[1]]} width={width} height={height} />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3 border-t border-white/10 text-[10px] font-mono text-[#aaa] relative z-10">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <span className="h-2.5 w-2.5 bg-amber-400 rounded-full inline-block" />
                <span className="text-white font-bold">{lang === 'ru' ? 'Главный хаб (Армения)' : 'HQ Hub (Armenia)'}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full border border-white bg-sky-400/70 inline-block" />
                <span>{lang === 'ru' ? 'Города и направления' : 'Cities & Destinations'}</span>
              </div>
            </div>
            <div className="text-orange-400 font-bold" aria-live="polite">
              {visibleDestinations.length}+ {lang === 'ru' ? 'международных направлений' : 'international destinations'}
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-4 self-stretch">
          {activeDest && activeRoute && <RouteCard dest={activeDest} route={activeRoute} onBook={handleBooking} />}
        </div>
      </div>

      <div className="lg:hidden mt-4">
        <button
          type="button"
          onClick={() => setMobileCardOpen(true)}
          className="w-full bg-black/40 border border-orange-500/40 text-orange-400 font-mono text-xs font-bold uppercase py-3 px-4 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          <span>{lang === 'ru' ? 'Открыть карточку маршрута' : 'Open route card'}</span>
          {activeRoute && <span className="text-white">{routeLabel(activeRoute)}</span>}
        </button>
      </div>

      {mobileCardOpen && activeDest && activeRoute && (
        <div className="lg:hidden fixed inset-0 z-[60] flex items-end" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileCardOpen(false)} />
          <div className="relative w-full">
            <RouteCard dest={activeDest} route={activeRoute} onBook={handleBooking} onClose={() => setMobileCardOpen(false)} variant="sheet" />
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-white/10">
        <span className="text-[10px] font-mono font-bold text-[#888] uppercase tracking-wider block mb-2">
          {lang === 'ru' ? 'БЫСТРЫЙ ПЕРЕХОД ПО НАПРАВЛЕНИЯМ:' : 'QUICK JUMP TO DESTINATIONS:'}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {visibleDestinations.map((dest) => {
            const isActive = activeDest?.id === dest.id;
            return (
              <button
                key={`chip-${dest.id}`}
                type="button"
                onClick={() => handleSelect(dest.id)}
                aria-pressed={isActive}
                className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase transition cursor-pointer border flex items-center space-x-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
                  isActive
                    ? 'bg-orange-500 text-black border-orange-400 font-extrabold shadow-md'
                    : 'bg-black/40 text-[#aaa] border-white/10 hover:border-orange-500/50 hover:text-white'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-black' : 'bg-orange-500'}`} />
                <span>{lang === 'ru' ? dest.name : dest.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
