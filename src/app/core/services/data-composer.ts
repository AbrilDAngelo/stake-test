import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstrumentVM } from './models';

@Injectable({ providedIn: 'root' })
export class DataComposerService {
  instruments = signal<InstrumentVM[]>([]);
  featuredInstruments = computed(() =>
    this.instruments().filter((x) => x.featured)
  );

  constructor(private http: HttpClient) {}

  load() {
    this.http.get<any>('assets/db.json').subscribe((data) => {
      const merged = data.instruments.map((inst: any) => {
        const q = data.quotes.find((x: any) => x.symbol === inst.symbol);
        const h = data.holdings.find((x: any) => x.symbol === inst.symbol);

        return {
          ...inst,
          last: q?.last ?? 0,
          dayChangePct: q?.dayChangePct ?? 0,
          currency: q?.currency ?? 'USD',
          qty: h?.qty ?? 0,
          avgPrice: h?.avgPrice ?? undefined,
        } as InstrumentVM;
      });

      this.instruments.set(merged);
    });
  }
}
