import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InstrumentType } from '@core/models/models';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'st-type-chip',
  imports: [IonicModule, UpperCasePipe],
  templateUrl: './st-type-chip.component.html',
  styleUrls: ['./st-type-chip.component.scss'],
  standalone: true,
})
export class StTypeChipComponent {
  @Input() type: InstrumentType = 'stock';
}
