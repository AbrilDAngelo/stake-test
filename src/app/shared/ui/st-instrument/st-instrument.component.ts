import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-st-instrument',
  templateUrl: './st-instrument.component.html',
  styleUrls: ['./st-instrument.component.scss'],
  standalone: true,
})
export class StInstrumentComponent {
  @Input() variant: 'row' | 'tile' = 'row';
  @Output() buy = new EventEmitter<void>();
}




