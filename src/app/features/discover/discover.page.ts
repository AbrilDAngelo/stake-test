import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { InstrumentVM } from '@core/services/models';
import { IonicModule } from '@ionic/angular';
import { StCardComponent } from '@shared/ui/st-card/st-card.component';
import { StInstrumentComponent } from '@shared/ui/st-instrument/st-instrument.component';

@Component({
  standalone: true,
  selector: 'app-discover',
  imports: [CommonModule, IonicModule, StCardComponent, StInstrumentComponent],
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  q = signal('');
  items = signal<InstrumentVM[]>([]);

  ngOnInit() {
    const fig: InstrumentVM = {
      symbol: 'FIG',
      name: 'Figma Inc',
      last: 131.04,
      dayChangePct: 0.229,
      type: 'Stock',
      logoUrl: 'assets/icons/figma.svg',
      currency: 'USD',
    };
    this.items.set([
      fig,
      { ...fig, symbol: 'TIK', name: 'Tik Inc', last: 105.44 },
    ]);
  }

  get filtered() {
    const v = this.q().toLowerCase();
    return this.items().filter(
      (x) =>
        x.symbol.toLowerCase().includes(v) || x.name.toLowerCase().includes(v)
    );
  }
}
