export interface City {
  name: string;
  lat: number;
  lng: number;
}

export interface Carrier {
  name: string;
  trucks_per_day: number;
}

export interface RouteSelection {
  from: City | null;
  to: City | null;
}