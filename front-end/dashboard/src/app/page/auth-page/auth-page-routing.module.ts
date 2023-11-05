import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page.component';
// import { LoginGuard } from 'src/app/shared/guard/login.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    // canActivate: [LoginGuard],
    data: {
      screen: 'login',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
