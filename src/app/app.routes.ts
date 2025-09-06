import { Routes } from '@angular/router';
import { TabsShellComponent } from './layout/tabs-shell/tabs-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: TabsShellComponent,
    children: [
      { path: 'invest', loadComponent: () => import('@features/invest/invest.page').then(m => m.InvestPage) },
      { path: 'discover', loadComponent: () => import('@features/discover/discover.page').then(m => m.DiscoverPage) },
      { path: '', pathMatch: 'full', redirectTo: 'invest' }
    ]
  },
  { path: '**', redirectTo: '' }
];
