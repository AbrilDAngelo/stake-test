export type InstrumentType = 'stock' | 'etf' | 'otc';

export interface PricingModel {
  id: string;
  symbol: string;
  open?: number;
  close?: number;
  ask?: number;
  high?: number;
  low?: number;
}

export interface DetailsModel {
  id: string;
  symbol: string;
  type: InstrumentType;
  fullName: string;
  logo: string;
  volume?: number;
  marketCap?: number;
}

export interface PositionsModel {
  accountId: string;
  baseCurrency: string;
  cashBalance: number;
  positions: Array<{
    symbol: string;
    quantity: number;
    averageCost: number;
    currency: string;
  }>;
}

export interface InstrumentVM {
  symbol: string;
  name: string;
  type: InstrumentType;
  logoUrl: string;
  last: number;
  dayChangePct: number;
  currency: string;

  // from positions
  qty?: number;
  avgPrice?: number;
  marketValue?: number; // qty * last

  // from details
  volume?: number;
  marketCap?: number;

  // from pricing
  high?: number;
  low?: number;
  open?: number;
  close?: number;
  ask?: number;
}
