import { NgModule } from '@angular/core';

import { ProductDetailPageComponent } from './product-detail-page.component';
import { ProductDetailPageRoutingModule } from './product-detail-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

const declarations: any[] = [ProductDetailPageComponent];
const imports: any[] = [ProductDetailPageRoutingModule, SharedModule];
@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class ProductPageModule {}
