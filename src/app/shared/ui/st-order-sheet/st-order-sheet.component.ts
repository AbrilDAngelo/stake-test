import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InstrumentVM } from '@core/services/models';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'st-order-sheet',
  imports: [IonicModule, CurrencyPipe],
  templateUrl: './st-order-sheet.component.html',
  styleUrls: ['./st-order-sheet.component.scss'],
  standalone: true,
})
export class StOrderSheetComponent {
  @Input({ required: true }) vm!: InstrumentVM;
  @Output() completed = new EventEmitter<{ qty: number; price: number }>();

  form = this.fb.group({ type: 'Market', amount: 0, shares: 0 });

  constructor(private fb: FormBuilder) { }

  submit() {
    const { shares, amount } = this.form.value;
    this.completed.emit({ qty: Number(shares) || 0, price: Number(amount) || 0 });
  }
}
