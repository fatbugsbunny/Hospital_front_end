import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'department',
    loadComponent: () => import('./departments/departments.page').then((m) => m.DepartmentsPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'patient',
    loadComponent: () => import('./patients/patients.page').then(m => m.PatientsPage)
  },
  {
    path: 'admissions/:patientId',
    loadComponent: () => import('./admissions/admissions.page').then( m => m.AdmissionsPage)
  },
];
