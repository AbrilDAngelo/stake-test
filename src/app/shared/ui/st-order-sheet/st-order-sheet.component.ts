import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ModalController, IonicModule } from '@ionic/angular';
import { InstrumentVM } from '@core/services/models';

@Component({
  selector: 'st-order-sheet',
  standalone: true,
  imports: [IonicModule, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './st-order-sheet.component.html',
  styleUrls: ['./st-order-sheet.component.scss'],
})
export class StOrderSheetComponent {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);

  @Input({ required: true }) vm!: InstrumentVM;

  form = this.fb.group({ type: 'Market', amount: null, shares: null });

  submit() {
    const { shares, amount } = this.form.value;
    this.modalCtrl.dismiss({
      completed: true,
      qty: Number(shares) || null,
      price: Number(amount) || null,
    });
  }
}
