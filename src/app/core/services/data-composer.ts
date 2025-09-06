import { Injectable, signal } from '@angular/core';
import { InstrumentVM } from './models';

@Injectable({ providedIn: 'root' })
export class DataComposerService {
  instruments = signal<InstrumentVM[]>([]);

  load() {
    setTimeout(() => {
      this.instruments.set([
        {
          symbol: 'FIG',
          name: 'Figma Inc',
          last: 131.04,
          dayChangePct: 0.229,
          type: 'Stock',
          logoUrl: 'assets/icons/figma.svg',
          currency: 'USD',
        },
        {
          symbol: 'ABNB',
          name: 'Airbnb Pty Ltd',
          last: 125.03,
          dayChangePct: -0.031,
          type: 'Stock',
          logoUrl: 'assets/icons/airbnb.svg',
          currency: 'USD',
        },
      ]);
    }, 300);
  }
}
