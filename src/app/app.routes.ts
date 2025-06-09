// import { Routes } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';

// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full'
//   },
//   {
//     path: 'login',
//     loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
//   },
//   {
//     path: 'register',
//     loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
//   },
//   {
//     path: '**',
//     redirectTo: 'login'
//   },
//   {
//     path: 'ruleta',
//     loadComponent: () =>
//       import('./ruleta/ruleta/ruleta.component').then(m => m.RuletaComponent),
//     canActivate: [AuthGuard]
//   },
// ];
