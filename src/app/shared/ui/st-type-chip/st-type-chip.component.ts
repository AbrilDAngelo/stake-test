import { Component, Input } from '@angular/core';
import { InstrumentType } from '@core/services/models';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'st-type-chip',
  imports: [IonicModule],
  templateUrl: './st-type-chip.component.html',
  styleUrls: ['./st-type-chip.component.scss'],
  standalone: true,
})
export class StTypeChipComponent {
  @Input() type: InstrumentType = 'Stock';
}
