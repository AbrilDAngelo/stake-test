import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstrumentVM } from '@core/models/models';
import { IonicModule, ModalController } from '@ionic/angular';
import { SwipeButtonComponent } from '@shared/ui/st-swipe-button/st-swipe-button.component';

@Component({
  selector: 'st-order-sheet',
  standalone: true,
  imports: [
    IonicModule,
    CurrencyPipe,
    ReactiveFormsModule,
    SwipeButtonComponent,
  ],
  templateUrl: './st-order-sheet.component.html',
  styleUrls: ['./st-order-sheet.component.scss'],
})
export class StOrderSheetComponent {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);

  @Input({ required: true }) vm!: InstrumentVM;

  form = this.fb.group({
    type: ['Market', { nonNullable: true }],
    amount: [null, { nonNullable: true, validators: [Validators.required] }],
    shares: [null, { nonNullable: true, validators: [Validators.required] }],
  });

  submit() {
    const { shares, amount } = this.form.value;
    this.modalCtrl.dismiss({
      completed: true,
      qty: Number(shares) || null,
      price: Number(amount) || null,
    });
  }
}
