import { Component, signal } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StCardComponent } from '@shared/ui/st-card/st-card.component';
import { StInstrumentComponent } from '@shared/ui/st-instrument/st-instrument.component';
import { InstrumentVM } from '@core/services/models';
import { StOrderSheetComponent } from '@shared/ui/st-order-sheet/st-order-sheet.component';

@Component({
  standalone: true,
  selector: 'app-invest',
  imports: [
    CommonModule,
    IonicModule,
    StCardComponent,
    StInstrumentComponent,
    StOrderSheetComponent,
  ],
  templateUrl: './invest.page.html',
  styleUrls: ['./invest.page.scss'],
})
export class InvestPage {
  holdings = signal<InstrumentVM[]>([]);
  trending = signal<InstrumentVM[]>([]);
  selected = signal<InstrumentVM | null>(null);

  constructor(private modal: ModalController, private toast: ToastController) {}

  ngOnInit() {
    const demo: InstrumentVM = {
      symbol: 'FIG',
      name: 'Figma Inc',
      last: 131.04,
      dayChangePct: 0.229,
      type: 'Stock',
      logoUrl: 'assets/icons/figma.svg',
      currency: 'USD',
    };
    this.holdings.set([
      demo,
      { ...demo, symbol: 'ABNB', name: 'Airbnb Pty Ltd', last: 125.03 },
    ]);
    this.trending.set([
      demo,
      { ...demo, symbol: 'ABNB' },
      { ...demo, symbol: 'BABA' },
    ]);
  }

  async openOrder(vm: InstrumentVM) {
    const presenting = document.getElementById('main') as HTMLElement | null;

    const m = await this.modal.create({
      component: StOrderSheetComponent,
      componentProps: { vm },
      breakpoints: [0, 0.45, 0.75],
      initialBreakpoint: 0.45,
      handle: true,
      mode: 'ios',
      presentingElement: presenting ?? undefined,
    });

    m.onWillDismiss().then(async (ev: any) => {
      if (ev?.data?.completed) {
        const t = await this.toast.create({
          message: `${vm.name ?? vm.symbol} successfully purchased`,
          duration: 1600,
          color: 'success',
          position: 'top',
          mode: 'ios',
        });
        t.present();
      }
    });

    await m.present();
  }
}
