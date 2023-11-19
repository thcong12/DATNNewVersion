import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { TabMenuModule } from 'primeng/tabmenu';
import { UserProfilePageComponent } from './user-profile-page.component';
import { UserProfilePageRoutingModule } from './user-profile-page-routing.module';
const declarations: any[] = [UserProfilePageComponent];
const imports: any[] = [
  SharedModule,
  UserProfilePageRoutingModule,
  TabMenuModule,
];
@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class UserProfilePageModule {}
