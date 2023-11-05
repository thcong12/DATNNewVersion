import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SharedModule } from 'src/app/shared/shared.module';
const declarations: any[] = [MainPageComponent];
const imports: any[] = [
  MainRoutingModule,
  HttpClientModule,
  LayoutModule,
  SharedModule,
];
@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class MainModule {}
