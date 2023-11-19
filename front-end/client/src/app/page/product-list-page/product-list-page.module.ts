import { NgModule } from '@angular/core';

import { ProductListPageComponent } from './product-list-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductListPageRoutingModule } from './product-list-page-routing.module';
import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [ProductListPageComponent, ListComponent, FilterComponent],
  imports: [SharedModule, ProductListPageRoutingModule],
})
export class ProductListPageModule {}
