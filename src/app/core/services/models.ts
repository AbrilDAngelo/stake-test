export type InstrumentType = 'Equity' | 'ETF' | 'Crypto' | 'Fund';
export interface Position { id: string; accountId: string; symbol: string; quantity: number; averageCost: number; currency: string; }
export interface Instrument { id: string; symbol: string; name: string; type: InstrumentType; exchange: string; logoUrl?: string; }
export interface Quote { id: string; symbol: string; last: number; change: number; changePct: number; asOf: string; currency: string; }
export interface PositionVM {
    symbol: string; name: string; type: InstrumentType; quantity: number; averageCost: number;
    last: number; marketValue: number; dayChangePct: number; pnlTotal: number; logoUrl?: string; currency: string;
}
