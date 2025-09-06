import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs-shell',
  imports: [IonicModule, RouterModule],
  templateUrl: './tabs-shell.component.html',
  styleUrls: ['./tabs-shell.component.scss'],
  standalone: true,
})
export class TabsShellComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
