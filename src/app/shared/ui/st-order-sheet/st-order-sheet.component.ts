import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-st-order-sheet',
  templateUrl: './st-order-sheet.component.html',
  styleUrls: ['./st-order-sheet.component.scss'],
  standalone: true,
})
export class StOrderSheetComponent {
  @Input() title = '';
  @Output() completed = new EventEmitter<void>();
}
