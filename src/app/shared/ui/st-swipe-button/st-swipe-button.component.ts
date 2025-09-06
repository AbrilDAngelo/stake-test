import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'st-swipe-button',
  templateUrl: './st-swipe-button.component.html',
  styleUrls: ['./st-swipe-button.component.scss'],
})
export class SwipeButtonComponent {
  @Input() disabled = false;
  @Output() completed = new EventEmitter<void>();

  isSwiping = false;
  startX = 0;
  currentX = 0;

  onDragStart(event: TouchEvent | MouseEvent) {
    if (this.disabled) return;
    this.isSwiping = true;
    this.startX = (event as TouchEvent).touches
      ? (event as TouchEvent).touches[0].clientX
      : (event as MouseEvent).clientX;
  }

  onDragMove(event: TouchEvent | MouseEvent) {
    if (!this.isSwiping) return;
    this.currentX = (event as TouchEvent).touches
      ? (event as TouchEvent).touches[0].clientX - this.startX
      : (event as MouseEvent).clientX - this.startX;
  }

  onDragEnd(container: HTMLElement) {
    if (!this.isSwiping) return;
    this.isSwiping = false;

    if (this.currentX > container.offsetWidth * 0.6) {
      // success
      this.completed.emit();
      this.currentX = container.offsetWidth - 60; // lock to right
    } else {
      // reset
      this.currentX = 0;
    }
  }
}
