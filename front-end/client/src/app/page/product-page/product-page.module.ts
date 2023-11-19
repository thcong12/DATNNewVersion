import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './product-page.component';


const declarations: any[] = [ProductPageComponent];
const imports: any[] = [
  ProductPageRoutingModule,
  SharedModule

];
@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class ProductPageModule {}
