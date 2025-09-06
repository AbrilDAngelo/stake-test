import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TabsShellComponent } from "@layout/tabs-shell/tabs-shell.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, TabsShellComponent],
})
export class AppComponent {
  constructor() {}
}
