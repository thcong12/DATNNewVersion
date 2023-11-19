import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';

import { HomePageListComponent } from './home-page-list/home-page-list.component';
import { HomePageOnsaleComponent } from './home-page-onsale/home-page-onsale.component';
import { SharedModule } from 'src/app/shared/shared.module';

const declarations: any[] = [HomePageComponent,HomePageOnsaleComponent,HomePageListComponent];
const imports: any[] = [CommonModule,HomePageRoutingModule,SharedModule];
@NgModule({
  declarations: [...declarations, ],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class HomePageModule { }
