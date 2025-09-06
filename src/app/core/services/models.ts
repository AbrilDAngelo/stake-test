export type InstrumentType = 'Stock' | 'ETF' | 'Crypto' | 'Fund';

export interface Instrument {
  symbol: string;
  name: string;
  type: InstrumentType;
  logoUrl: string;
  featured?: boolean;
}

export interface Quote {
  symbol: string;
  last: number;
  dayChangePct: number;
  currency: string;
}

export interface Holding {
  symbol: string;
  qty: number;
  avgPrice: number;
}

export interface InstrumentVM {
  symbol: string;
  name: string;
  type: InstrumentType;
  logoUrl: string;
  last: number;
  dayChangePct: number;
  currency: string;
  qty?: number;
  avgPrice?: number;
  marketCapMillions?: number;
  revenueBillions?: number;
  priceRange?: string;
  featured?: boolean;
}
