import React from 'react';
import { Destination } from '../../data/logisticsData';
import { useLanguage } from '../../context/LanguageContext';

interface DestinationMarkerProps {
  dest: Destination;
  coords: [number, number];
  isSelected: boolean;
  isHovered: boolean;
  zoomK: number;
  onClick: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function DestinationMarker({ dest, coords, isSelected, isHovered, zoomK, onClick, onHoverStart, onHoverEnd }: DestinationMarkerProps) {
  const { lang } = useLanguage();
  const isChina = dest.countryCode === 'CN';
  const isRussia = dest.countryCode === 'RU';
  const inv = 1 / zoomK;

  const baseR = isSelected ? 6.5 : isChina ? 4.5 : 4;
  const fill = isSelected ? '#fbbf24' : isChina ? '#f97316' : isRussia ? '#38bdf8' : '#9ca7b4';

  return (
    <g
      transform={`translate(${coords[0]}, ${coords[1]})`}
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      role="button"
      tabIndex={0}
      aria-label={lang === 'ru' ? dest.name : dest.nameEn}
      aria-pressed={isSelected}
      className="cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-4"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {(isSelected || isHovered) && (
        <circle r={12 * inv} fill="none" stroke={fill} strokeOpacity={0.5} strokeWidth={1 * inv} vectorEffect="non-scaling-stroke" />
      )}

      <circle r={baseR * inv} fill={fill} stroke="#050b14" strokeWidth={1.8 * inv} vectorEffect="non-scaling-stroke" />

      <g transform={`translate(${8 * inv}, ${3 * inv})`}>
        <text fill="#ffffff" fontSize={9.5 * inv} fontWeight="600" style={{ paintOrder: 'stroke', stroke: '#050b14', strokeWidth: 3 * inv }}>
          {lang === 'ru' ? dest.name : dest.nameEn}
        </text>
      </g>
    </g>
  );
}
