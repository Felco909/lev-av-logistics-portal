import React from 'react';
import type { GeoPath, GeoProjection } from 'd3-geo';
import { ARMENIA_GEOJSON, LAKE_SEVAN_GEOJSON, ARMENIA_HIGHWAYS } from '../../data/geoService';
import { ARMENIA_HUB } from '../../data/logisticsData';
import type { MapPreset } from './types';

interface ArmeniaHubProps {
  pathGenerator: GeoPath;
  projection: GeoProjection;
  mapPreset: MapPreset;
  zoomK: number;
  reduceMotion: boolean;
}

export default function ArmeniaHub({ pathGenerator, projection, mapPreset, zoomK, reduceMotion }: ArmeniaHubProps) {
  const showDetail = mapPreset === 'armenia' || mapPreset === 'caucasus';
  const hubXY = projection([ARMENIA_HUB.lng, ARMENIA_HUB.lat]);
  const inv = 1 / zoomK;

  return (
    <g aria-hidden="true">
      {/* 1. Territory of the Republic of Armenia */}
      <path
        d={pathGenerator(ARMENIA_GEOJSON as any) || ''}
        fill="#172554"
        stroke="#f59e0b"
        strokeWidth={mapPreset === 'armenia' ? 2 : 1.2}
        vectorEffect="non-scaling-stroke"
        filter="url(#glowEffect)"
      />

      {showDetail && (
        <>
          {/* 2. Lake Sevan */}
          <path
            d={pathGenerator(LAKE_SEVAN_GEOJSON as any) || ''}
            fill="#0284c7"
            stroke="#38bdf8"
            strokeWidth={0.8}
            vectorEffect="non-scaling-stroke"
          />

          {/* 3. M1 / M2 / M4 / M6 national highways */}
          {ARMENIA_HIGHWAYS.map((hw) => (
            <path
              key={hw.id}
              d={pathGenerator(hw.feature as any) || ''}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={hw.isNorthSouthCorridor ? 2 : 1.2}
              strokeDasharray={hw.isNorthSouthCorridor ? undefined : '3 2'}
              vectorEffect="non-scaling-stroke"
              opacity={0.85}
            />
          ))}
        </>
      )}

      {/* HQ pulse marker at Yerevan */}
      {hubXY && (
        <g transform={`translate(${hubXY[0]}, ${hubXY[1]})`}>
          <circle r={16 * inv} fill="#f59e0b" fillOpacity={0.15} filter="url(#hubGlow)" className={reduceMotion ? '' : 'animate-pulse'} />
          {!reduceMotion && <circle r={10 * inv} fill="#f59e0b" fillOpacity={0.2} className="animate-ping" style={{ animationDuration: '3s' }} />}
          <circle r={4 * inv} fill="#fbbf24" stroke="#050b14" strokeWidth={1.5 * inv} filter="url(#glowEffect)" />
          {showDetail && (
            <text x={8 * inv} y={-8 * inv} fill="#fbbf24" fontSize={10 * inv} fontFamily="monospace" fontWeight="900" letterSpacing="0.05em">
              LEV&AV HUB
            </text>
          )}
        </g>
      )}
    </g>
  );
}
