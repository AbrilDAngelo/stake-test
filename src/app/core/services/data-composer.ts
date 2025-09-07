import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import {
  DetailsModel,
  InstrumentVM,
  PositionsModel,
  PricingModel,
} from '@core/models/models';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataComposerService {
  instruments = signal<InstrumentVM[]>([]);
  holdings = computed(() => this.instruments().filter((x) => (x.qty ?? 0) > 0));
  featured = computed(() => this.instruments().filter((x) => x.low));
  totalEquity = signal<number>(0);
  cashBalance = signal<number>(0);
  baseCurrency = signal<string>('USD');

  constructor(private http: HttpClient) {}

  async load() {
    const [pricing, details, positions] = await Promise.all([
      firstValueFrom(this.http.get<PricingModel[]>('assets/data/pricing.json')),
      firstValueFrom(this.http.get<DetailsModel[]>('assets/data/details.json')),
      firstValueFrom(
        this.http.get<PositionsModel>('assets/data/positions.json')
      ),
    ]);

    this.cashBalance.set(positions.cashBalance);
    this.baseCurrency.set(positions.baseCurrency);

    const pMap = new Map(pricing.map((p) => [p.symbol, p]));
    const dMap = new Map(details.map((d) => [d.symbol, d]));
    const posMap = new Map(positions.positions.map((p) => [p.symbol, p]));

    const symbols = new Set<string>([
      ...pricing.map((p) => p.symbol),
      ...details.map((d) => d.symbol),
      ...positions.positions.map((p) => p.symbol),
    ]);

    const vms: InstrumentVM[] = [];

    symbols.forEach((symbol) => {
      const pr = pMap.get(symbol);
      const dt = dMap.get(symbol);
      const ps = posMap.get(symbol);

      const last = pr?.close ?? pr?.ask ?? 0;
      const open = pr?.open ?? 0;

      const dayChangePct = open > 0 ? (last - open) / open : 0;

      const vm: InstrumentVM = {
        symbol,
        name: dt?.fullName ?? symbol,
        type: dt?.type ?? 'stock',
        logoUrl: dt?.logo ?? '',
        last,
        dayChangePct,
        currency: ps?.currency ?? 'USD',
        qty: ps?.quantity,
        avgPrice: ps?.averageCost,
        volume: dt?.volume,
        marketCap: dt?.marketCap,
        low: pr?.low,
        high: pr?.high,
        open: open,
        close: pr?.close,
        ask: pr?.ask,
      };

      if (vm.qty && vm.last) vm.marketValue = vm.qty * vm.last;

      vms.push(vm);
    });

    // Sort for "Holdings" presentation (largest first)
    vms.sort((a, b) => (b.marketValue ?? 0) - (a.marketValue ?? 0));
    this.instruments.set(vms);

    // Total equity: sum(qty * last) + cash
    const positionsValue = vms.reduce((s, x) => s + (x.marketValue ?? 0), 0);
    this.totalEquity.set(positionsValue + this.cashBalance());
  }

  // Trending stocks: volume descending
  getTrending = (limit = 10) =>
    [...this.instruments()]
      .filter((x) => (x.volume ?? 0) > 0)
      .sort(
        (a, b) =>
          (b.volume ?? 0) - (a.volume ?? 0) ||
          (b.marketCap ?? 0) - (a.marketCap ?? 0)
      )
      .slice(0, limit);

  // Most traded of all time: highest marketCap (or fallback to volume)
  getMostTraded = () =>
    [...this.instruments()].sort(
      (a, b) =>
        (b.marketCap ?? 0) - (a.marketCap ?? 0) ||
        (b.volume ?? 0) - (a.volume ?? 0)
    )[0];

  addPurchase(vm: InstrumentVM, qty: number, totalPaid: number) {
    if (!qty || qty <= 0) return;
    const list = this.instruments();
    const idx = list.findIndex((x) => x.symbol === vm.symbol);

    if (idx >= 0) {
      const cur = list[idx];
      const newQty = (cur.qty ?? 0) + qty;
      const newTotalPaid = (cur.avgPrice ?? 0) * (cur.qty ?? 0) + totalPaid;
      const newAvg = newTotalPaid / newQty;

      const updated: InstrumentVM = {
        ...cur,
        qty: newQty,
        avgPrice: newAvg,
        last: vm.last,
        dayChangePct: vm.dayChangePct,
      };
      const next = [...list];
      next[idx] = updated;
      this.instruments.set(next);
    } else {
      const added: InstrumentVM = { ...vm, qty, avgPrice: totalPaid / qty };
      this.instruments.set([added, ...list]);
    }
  }
}
