import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
}
