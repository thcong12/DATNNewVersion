import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product-page.component';
const routes: Routes = [
  {
    path: '',
    component: ProductPageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../product-list-page/product-list-page.module').then(
            (m) => m.ProductListPageModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../product-detail-page/product-detail-page.module').then(
            (m) => m.ProductPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}
