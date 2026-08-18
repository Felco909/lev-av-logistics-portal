export type TransportMode = 'road' | 'air' | 'sea' | 'rail';

export type ShipmentStatus = 'pending' | 'sorting' | 'in_transit' | 'customs' | 'delivered' | 'cancelled';

export interface TrackingCheckpoint {
  id: string;
  status: ShipmentStatus;
  location: string;
  timestamp: string;
  description: string;
}

export interface Shipment {
  id: string;
  sender: string;
  recipient: string;
  origin: string;
  destination: string;
  weight: number; // in kg
  volume: number; // in m³
  cargoType: string; // e.g. "Генеральный", "Опасный", "Хрупкий", "Температурный"
  mode: TransportMode;
  status: ShipmentStatus;
  currentLocation: string;
  estimatedDelivery: string;
  createdDate: string;
  price: number; // in Rubles
  history: TrackingCheckpoint[];
}

export interface FreightRate {
  mode: TransportMode;
  name: string;
  pricePerKg: number;
  pricePerM3: number;
  basePrice: number;
  speedDays: string;
  co2PerKgKm: number; // in grams
}

export interface CityTerminal {
  name: string;
  coordinates: { x: number; y: number }; // Relative percentage coordinates for route visualizer
  country: string;
}
