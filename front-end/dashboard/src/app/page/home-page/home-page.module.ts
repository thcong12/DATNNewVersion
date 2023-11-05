import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageChartComponent } from './component/home-page-chart/home-page-chart.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { HomePageTableComponent } from './component/home-page-table/home-page-table.component';

const declarations: any[] = [
  HomePageComponent,
  HomePageChartComponent,
  HomePageTableComponent,
];
const imports = [CommonModule, SharedModule, HomePageRoutingModule];
@NgModule({
  declarations: [...declarations],
  exports: [...declarations, ...imports],
  imports: [...imports],
})
export class HomePageModule {}
