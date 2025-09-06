import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-st-card',
  templateUrl: './st-card.component.html',
  styleUrls: ['./st-card.component.scss'],
  standalone: true,
})
export class StCardComponent {
  @Input() variant: 'full' | 'mini' | 'tile' = 'full';
  @Input() hasHeader = false;
}
