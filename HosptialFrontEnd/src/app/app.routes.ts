import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'department',
    loadComponent: () => import('./department/department.page').then((m) => m.DepartmentPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
