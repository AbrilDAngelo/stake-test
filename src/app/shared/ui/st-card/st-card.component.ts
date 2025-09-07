import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstrumentVM } from '@core/models/models';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'st-card',
  imports: [IonicModule, CommonModule],
  templateUrl: './st-card.component.html',
  styleUrls: ['./st-card.component.scss'],
  standalone: true,
})
export class StCardComponent {
  @Input() variant: 'full' | 'mini' | 'tile' = 'full';
  @Input() hasHeader = false;
  @Input() hasFooter = false;
  @Input({ required: true }) vm!: InstrumentVM;
  @Output() buy = new EventEmitter<InstrumentVM>();
}
