import React, { useEffect, useState } from 'react';
import type { GeoPath } from 'd3-geo';
import { loadWorldLand } from '../../data/geoService';
import type { MapPreset } from './types';

interface CountryLayerProps {
  pathGenerator: GeoPath;
  mapPreset: MapPreset;
}

// The ~200KB world landmass silhouette is only relevant (and only visible) at the World/Eurasia
// zoom presets, so it is dynamically imported the first time one of those presets is selected —
// the default Armenia/Caucasus view never downloads it.
export default function CountryLayer({ pathGenerator, mapPreset }: CountryLayerProps) {
  const [land, setLand] = useState<GeoJSON.Feature | null>(null);
  const needsWorld = mapPreset === 'world' || mapPreset === 'eurasia';

  useEffect(() => {
    if (!needsWorld || land) return;
    let cancelled = false;
    loadWorldLand().then((feature) => {
      if (!cancelled) setLand(feature);
    });
    return () => {
      cancelled = true;
    };
  }, [needsWorld, land]);

  if (!needsWorld || !land) return null;

  return <path d={pathGenerator(land as any) || ''} fill="#232a34" stroke="#4a5568" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />;
}
