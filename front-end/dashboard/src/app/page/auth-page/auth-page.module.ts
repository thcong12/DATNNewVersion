import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthPageRoutingModule } from './auth-page-routing.module';
import { AuthPageComponent } from './auth-page.component';

import { ReactiveFormsModule } from '@angular/forms';
// import { SharedModule } from '../shared/shared.module';
import { SharedModule } from 'src/app/shared/shared.module';
const declarations: any[] = [AuthPageComponent];
const imports = [AuthPageRoutingModule, ReactiveFormsModule, SharedModule];
@NgModule({
  declarations: [...declarations],
  exports: [...declarations, ...imports],
  imports: [...imports],
})
export class AuthPageModule {}
