import { CommonModule, CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstrumentVM } from '@core/models/models';
import { IonicModule } from '@ionic/angular';
import { StTypeChipComponent } from '../st-type-chip/st-type-chip.component';

@Component({
  selector: 'st-instrument',
  imports: [
    IonicModule,
    CommonModule,
    CurrencyPipe,
    PercentPipe,
    StTypeChipComponent,
  ],
  templateUrl: './st-instrument.component.html',
  styleUrls: ['./st-instrument.component.scss'],
  standalone: true,
})
export class StInstrumentComponent {
  @Input({ required: true }) vm!: InstrumentVM;
  @Input() variant: 'row' | 'row-simple' | 'tile' = 'row';
  @Output() buy = new EventEmitter<InstrumentVM>();
}
