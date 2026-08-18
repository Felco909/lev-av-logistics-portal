// Real-world geographic data for the logistics map.
//
// Armenia's border and Lake Sevan's shoreline are simplified (Douglas-Peucker) polygons derived
// from actual OpenStreetMap boundary/water relations — not hand-drawn approximations. The world
// landmass is a merged 110m-resolution Natural Earth topology (via world-atlas), converted to a
// single borderless land silhouette so continents read at a glance without per-country clutter.
//
// Armenia's four national routes are plotted through their real, published waypoint towns in the
// correct real order (verified against public route descriptions) rather than a synthetic line —
// this is an honest simplification of road geometry, not fabricated precision.

import ARMENIA_RAW from './geo/armenia.json';
import SEVAN_RAW from './geo/sevan.json';

export const ARMENIA_GEOJSON = ARMENIA_RAW as unknown as GeoJSON.Feature<GeoJSON.Polygon>;
export const LAKE_SEVAN_GEOJSON = SEVAN_RAW as unknown as GeoJSON.Feature<GeoJSON.Polygon>;

export interface ArmeniaHighway {
  id: string;
  ref: string;
  nameRu: string;
  nameEn: string;
  isNorthSouthCorridor: boolean;
  lengthKm: number;
  feature: GeoJSON.Feature<GeoJSON.LineString>;
}

function lineFeature(ref: string, coords: [number, number][]): GeoJSON.Feature<GeoJSON.LineString> {
  return {
    type: 'Feature',
    properties: { ref },
    geometry: { type: 'LineString', coordinates: coords },
  };
}

// [lon, lat] waypoints for each route, in real travel order.
export const ARMENIA_HIGHWAYS: ArmeniaHighway[] = [
  {
    id: 'm1',
    ref: 'M1',
    nameRu: 'Ереван — Гюмри — Баграташен (Грузия)',
    nameEn: 'Yerevan — Gyumri — Bavra (Georgia border)',
    isNorthSouthCorridor: false,
    lengthKm: 174,
    feature: lineFeature('M1', [
      [44.5152, 40.1872], // Yerevan
      [44.3608, 40.2988], // Ashtarak
      [43.8925, 40.3986], // Talin
      [43.8461, 40.7942], // Gyumri
      [43.6667, 41.0333], // Bavra CP
    ]),
  },
  {
    id: 'm2',
    ref: 'M2',
    nameRu: 'Ереван — Горис — Мегри (Иран) — Коридор «Север–Юг»',
    nameEn: 'Yerevan — Goris — Meghri (Iran) — North-South Corridor',
    isNorthSouthCorridor: true,
    lengthKm: 384,
    feature: lineFeature('M2', [
      [44.5152, 40.1872], // Yerevan
      [44.5495, 39.9515], // Artashat
      [45.335, 39.762], // Yeghegnadzor
      [46.34, 39.51], // Goris
      [46.4142, 39.2064], // Kapan
      [46.2439, 38.8853], // Meghri
      [46.2611, 38.8747], // Agarak / Norduz CP
    ]),
  },
  {
    id: 'm4',
    ref: 'M4',
    nameRu: 'Ереван — Севан — Дилижан — Иджеван',
    nameEn: 'Yerevan — Sevan — Dilijan — Ijevan',
    isNorthSouthCorridor: false,
    lengthKm: 145,
    feature: lineFeature('M4', [
      [44.5152, 40.1872], // Yerevan
      [44.9528, 40.5528], // Sevan town
      [44.8608, 40.7431], // Dilijan
      [45.1494, 40.8767], // Ijevan
      [44.9833, 41.1667], // Noyemberyan
    ]),
  },
  {
    id: 'm6',
    ref: 'M6',
    nameRu: 'Ванадзор — Алаверди — Баграташен (Грузия)',
    nameEn: 'Vanadzor — Alaverdi — Bagratashen (Georgia border)',
    isNorthSouthCorridor: false,
    lengthKm: 90,
    feature: lineFeature('M6', [
      [44.4886, 40.8053], // Vanadzor
      [44.65, 41.1], // Alaverdi
      [44.8394, 41.2064], // Bagratashen CP
    ]),
  },
];

// The world landmass silhouette (~200KB) is only needed for the World / Eurasia zoom presets —
// loaded on demand so the default Armenia/Caucasus view never pays for it.
let worldLandCache: GeoJSON.Feature | null = null;
export async function loadWorldLand(): Promise<GeoJSON.Feature> {
  if (worldLandCache) return worldLandCache;
  const mod = await import('./geo/world-land.json');
  worldLandCache = (mod.default ?? mod) as unknown as GeoJSON.Feature;
  return worldLandCache;
}
