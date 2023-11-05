import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { HomePageIntroComponent } from './component/home-page-intro/home-page-intro.component';
import { HomePageListComponent } from './component/home-page-list/home-page-list.component';
import { HomePageOnsaleComponent } from './component/home-page-onsale/home-page-onsale.component';
import { HomePageProductComponent } from './component/home-page-product/home-page-product.component';
import { HomePageSlideComponent } from './component/home-page-slide/home-page-slide.component';

const declarations: any[] = [
  HomePageSlideComponent,
  HomePageComponent,
  HomePageIntroComponent,
  HomePageProductComponent,
  HomePageListComponent,
  HomePageOnsaleComponent,
];
const imports = [
  CommonModule,
  SharedModule,
  HttpClientModule,
  HomePageRoutingModule,
  MegaMenuModule,
];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class HomePageModule {}
