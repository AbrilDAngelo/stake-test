import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { InstrumentVM } from '@core/models/models';
import { DataComposerService } from '@core/services/data-composer';
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
export class InvestPage implements OnInit {
  private data = inject(DataComposerService);
  private modal = inject(ModalController);
  private toast = inject(ToastController);

  totalEquity = this.data.totalEquity;
  holdings = computed(() => this.data.getHoldings());
  trending = computed(() => this.data.getTrending(6));

  async ngOnInit() {
    await this.data.load();
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
      cssClass: 'st-modal',
      backdropDismiss: true,
      showBackdrop: true,
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
        mode: 'ios',
      });
      t.present();
    }
  }
}
