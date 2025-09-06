import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-st-swipe-button',
  templateUrl: './st-swipe-button.component.html',
  styleUrls: ['./st-swipe-button.component.scss'],
  standalone: true,
})
export class StSwipeButtonComponent {
  @Input() state: 'open'|'submitting'|'success' = 'open';
  @Output() confirm = new EventEmitter<void>();
}