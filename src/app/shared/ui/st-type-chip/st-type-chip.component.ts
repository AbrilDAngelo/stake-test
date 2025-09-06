import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-st-type-chip',
  templateUrl: './st-type-chip.component.html',
  styleUrls: ['./st-type-chip.component.scss'],
  standalone: true,
})
export class StTypeChipComponent {
 @Input() type: 'Stock'|'ETF'|'Crypto'|'Fund' = 'Stock';
}
