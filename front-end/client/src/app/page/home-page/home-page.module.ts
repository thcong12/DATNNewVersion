import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';

import { HomePageListComponent } from './home-page-list/home-page-list.component';
import { HomePageOnsaleComponent } from './home-page-onsale/home-page-onsale.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageListItemComponent } from './component/home-page-list-item/home-page-list-item.component';
import { HomePageListItemDetaiComponent } from './component/home-page-list-item-detai/home-page-list-item-detai.component';

const declarations: any[] = [
  HomePageComponent,
  HomePageOnsaleComponent,
  HomePageListComponent,
];
const imports: any[] = [CommonModule, HomePageRoutingModule, SharedModule];
@NgModule({
  declarations: [...declarations, HomePageListItemComponent, HomePageListItemDetaiComponent],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class HomePageModule {}
