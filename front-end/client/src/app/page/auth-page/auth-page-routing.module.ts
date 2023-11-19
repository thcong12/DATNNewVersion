import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page.component';
import { ActiveAccountComponent } from './component/active-account/active-account.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
  },
  {
    path: 'active/:token',
    component: ActiveAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
