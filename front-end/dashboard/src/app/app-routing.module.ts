import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivatedGuard } from './base/guard/can-activate.guard';
import { LoginGuard } from './base/guard/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    canActivate: [CanActivatedGuard],
    loadChildren: () =>
      import('./page/main-page/main-page.module').then((m) => m.MainModule),
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./page/auth-page/auth-page.module').then((m) => m.AuthPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
