import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfilePageComponent } from './user-profile-page.component';
import { LoginGuard } from 'src/app/shared/guard/login.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    component: UserProfilePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfilePageRoutingModule {}
