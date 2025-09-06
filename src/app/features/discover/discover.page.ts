import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, computed, ViewChild } from '@angular/core';
import { InstrumentVM } from '@core/services/models';
import { IonicModule, ModalController, ToastController, IonSearchbar } from '@ionic/angular';
import { StCardComponent } from '@shared/ui/st-card/st-card.component';
import { StInstrumentComponent } from '@shared/ui/st-instrument/st-instrument.component';
import { DataComposerService } from '@core/services/data-composer';
import { StTypeChipComponent } from '@shared/ui/st-type-chip/st-type-chip.component';
import { StOrderSheetComponent } from '@shared/ui/st-order-sheet/st-order-sheet.component';

@Component({
  standalone: true,
  selector: 'app-discover',
  imports: [
    CommonModule,
    IonicModule,
    StCardComponent,
    StInstrumentComponent,
    StTypeChipComponent,
  ],
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  private dataComposer = inject(DataComposerService);
  private modal = inject(ModalController);
  private toast = inject(ToastController);

  q = signal('');
  items = computed(() => this.dataComposer.instruments());
  featured = this.dataComposer.featuredInstruments;

  @ViewChild(IonSearchbar) searchbar!: IonSearchbar;

  ngOnInit() {
    this.dataComposer.load();
  }

  filtered = computed(() => {
    const v = this.q().toLowerCase();
    return this.items().filter(
      (x) =>
        x.symbol.toLowerCase().includes(v) || x.name.toLowerCase().includes(v)
    );
  });

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

  clearSearch() {
    this.q.set('');
    if (this.searchbar) {
      this.searchbar.value = '';
    }
  }
}
