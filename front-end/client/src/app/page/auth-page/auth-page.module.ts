import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthPageRoutingModule } from './auth-page-routing.module';
import { LoginComponent } from './component/login/login.component';

import { AuthPageComponent } from './auth-page.component';
import { SignInComponent } from './component/signin/signin.component';
import { ActiveAccountComponent } from './component/active-account/active-account.component';

@NgModule({
  declarations: [SignInComponent, LoginComponent, AuthPageComponent, ActiveAccountComponent],
  imports: [AuthPageRoutingModule, SharedModule],
})
export class AuthPageModule {}
