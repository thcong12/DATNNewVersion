import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TablePageRoutingModule } from './table-page-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TablePageComponent } from './table-page.component';
import { CategoryTablePageComponent } from './category-table-page/category-table-page.component';
import { TableComponentComponent } from './component/table-component/table-component.component';
import { DialogComponentComponent } from './component/dialog-component/dialog-component.component';
import { DeveloperTablePageComponent } from './developer-table-page/developer-table-page.component';
import { ProductTablePageComponent } from './product-table-page/product-table-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { GeneralComponentComponent } from './product-detail-page/general-component/general-component.component';
import { DetailComponentComponent } from './product-detail-page/detail-component/detail-component.component';

const declarations: any[] = [
  TablePageComponent,
  CategoryTablePageComponent,
  TableComponentComponent,
  ProductTablePageComponent,
  DialogComponentComponent,
  DeveloperTablePageComponent,
  ProductDetailPageComponent,
  GeneralComponentComponent,
  DetailComponentComponent,
];
const imports: any[] = [
  TablePageRoutingModule,
  HttpClientModule,
  LayoutModule,
  SharedModule,
];
@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class TableModule {}
