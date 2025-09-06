import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { DataComposerService } from '@core/services/data-composer';
import { InstrumentVM } from '@core/services/models';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { StInstrumentComponent } from '@shared/ui/st-instrument/st-instrument.component';
import { StOrderSheetComponent } from '@shared/ui/st-order-sheet/st-order-sheet.component';

@Component({
  standalone: true,
  selector: 'app-invest',
  imports: [CommonModule, IonicModule, StInstrumentComponent],
  templateUrl: './invest.page.html',
  styleUrls: ['./invest.page.scss'],
})
export class InvestPage {
  selected = signal<InstrumentVM | null>(null);

  private modal = inject(ModalController);
  private toast = inject(ToastController);
  private dataComposer = inject(DataComposerService);

  holdings = computed(() =>
    this.dataComposer.instruments().filter((i) => (i.qty ?? 0) > 0)
  );
  trending = computed(() => this.dataComposer.instruments());

  constructor() {
    this.dataComposer.load();
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

    await m.present();

    const { data } = await m.onWillDismiss();
    if (data?.completed) {
      const t = await this.toast.create({
        message: `${vm.name ?? vm.symbol} successfully purchased`,
        duration: 1600,
        color: 'success',
        position: 'top',
        mode: 'ios'
      });
      t.present();
    }
  }
}
