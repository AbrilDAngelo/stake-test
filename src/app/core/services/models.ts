export type InstrumentType = 'Stock' | 'ETF' | 'Crypto' | 'Fund';

export interface Position {
  id: string;
  accountId: string;
  symbol: string;
  quantity: number;
  averageCost: number;
  currency: string;
}

export interface InstrumentVM {
  id?: string;
  symbol: string;
  name: string;
  last: number;
  dayChangePct: number;
  logoUrl?: string;
  type: 'Stock' | 'ETF' | 'Crypto' | 'Fund';
  currency?: string;
}

export interface Quote {
  id: string;
  symbol: string;
  last: number;
  change: number;
  changePct: number;
  asOf: string;
  currency: string;
}

export interface PositionVM {
  symbol: string;
  name: string;
  type: InstrumentType;
  quantity: number;
  averageCost: number;
  last: number;
  marketValue: number;
  dayChangePct: number;
  pnlTotal: number;
  logoUrl?: string;
  currency: string;
}
