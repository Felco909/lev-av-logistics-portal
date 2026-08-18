import React, { useMemo } from 'react';
import type { GeoProjection } from 'd3-geo';
import { Destination, LogisticsRoute } from '../../data/logisticsData';
import { generateCurvedPath } from '../../utils/geoArc';
import DestinationMarker from './DestinationMarker';
import RouteAnimation from './RouteAnimation';

interface RouteLayerProps {
  projection: GeoProjection;
  hubXY: [number, number];
  destinations: Destination[];
  getRoute: (destinationId: string) => LogisticsRoute | undefined;
  selectedDestId: string | null;
  hoveredDestId: string | null;
  zoomK: number;
  reduceMotion: boolean;
  onSelect: (destId: string) => void;
  onHover: (destId: string | null) => void;
}

export default function RouteLayer({
  projection,
  hubXY,
  destinations,
  getRoute,
  selectedDestId,
  hoveredDestId,
  zoomK,
  reduceMotion,
  onSelect,
  onHover,
}: RouteLayerProps) {
  const displayId = hoveredDestId || selectedDestId;

  const items = useMemo(() => {
    return destinations
      .map((dest) => {
        const coords = projection([dest.lng, dest.lat]);
        if (!coords) return null;
        const route = getRoute(dest.id);
        const d = generateCurvedPath(hubXY, [coords[0], coords[1]]);
        return { dest, coords: coords as [number, number], route, d };
      })
      .filter((v): v is { dest: Destination; coords: [number, number]; route: LogisticsRoute | undefined; d: string } => v !== null)
      .sort((a, b) => (a.dest.id === displayId ? 1 : b.dest.id === displayId ? -1 : 0));
  }, [destinations, projection, hubXY, getRoute, displayId]);

  const inv = 1 / zoomK;

  return (
    <>
      {items.map(({ dest, coords, route, d }) => {
        const isSelected = dest.id === selectedDestId;
        const isActive = dest.id === displayId;
        const strokeColor = isActive ? '#fbbf24' : '#60a5fa';

        return (
          <g key={dest.id}>
            {/* Wide invisible hit-path for comfortable hover/click without a bulky visible line */}
            <path
              d={d}
              fill="none"
              stroke="transparent"
              strokeWidth={14 * inv}
              className="cursor-pointer"
              onClick={() => onSelect(dest.id)}
              onMouseEnter={() => onHover(dest.id)}
              onMouseLeave={() => onHover(null)}
            />

            {isActive && (
              <path d={d} fill="none" stroke={strokeColor} strokeWidth={5 * inv} strokeOpacity={0.3} filter="url(#glowEffect)" vectorEffect="non-scaling-stroke" />
            )}

            <path
              d={d}
              fill="none"
              stroke={strokeColor}
              strokeWidth={isActive ? 3.5 * inv : 1.8 * inv}
              strokeOpacity={isActive ? 1 : 0.65}
              strokeDasharray={route?.primaryMode === 'air' ? '6 4' : undefined}
              vectorEffect="non-scaling-stroke"
              style={{ pointerEvents: 'none' }}
            />

            {isActive && route && (
              <RouteAnimation pathD={d} distanceKm={route.distanceKm} flowDirection={route.flowDirection} isSelected={isSelected} reduceMotion={reduceMotion} />
            )}

            <DestinationMarker
              dest={dest}
              coords={coords}
              isSelected={isSelected}
              isHovered={dest.id === hoveredDestId}
              zoomK={zoomK}
              onClick={() => onSelect(dest.id)}
              onHoverStart={() => onHover(dest.id)}
              onHoverEnd={() => onHover(null)}
            />
          </g>
        );
      })}
    </>
  );
}
