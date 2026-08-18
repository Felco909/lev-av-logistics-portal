import React from 'react';
import { FlowDirection } from '../../data/logisticsData';

interface RouteAnimationProps {
  pathD: string;
  distanceKm: number;
  flowDirection: FlowDirection;
  isSelected: boolean;
  reduceMotion: boolean;
}

// One moving particle per selected/hovered route — cargo flow direction (export leaves Armenia,
// import arrives) is encoded via keyPoints, not a separate element, so the DOM stays flat.
export default function RouteAnimation({ pathD, distanceKm, flowDirection, isSelected, reduceMotion }: RouteAnimationProps) {
  if (reduceMotion) return null;

  const dur = isSelected ? '2.5s' : `${Math.max(3, Number((distanceKm / 1200).toFixed(1)))}s`;
  const keyPoints = flowDirection === 'import' ? '1;0' : '0;1';

  return (
    <circle r={isSelected ? 4 : 2.5} fill={isSelected ? '#fbbf24' : '#60a5fa'} filter="url(#glowEffect)">
      <animateMotion path={pathD} dur={dur} repeatCount="indefinite" keyPoints={keyPoints} keyTimes="0;1" rotate="auto" />
    </circle>
  );
}
