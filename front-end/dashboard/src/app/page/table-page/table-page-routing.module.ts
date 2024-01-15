import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryTablePageComponent } from './category-table-page/category-table-page.component';
import { DeveloperTablePageComponent } from './developer-table-page/developer-table-page.component';
import { ProductTablePageComponent } from './product-table-page/product-table-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductTablePageComponent,
    // children: [
    //   {
    //     path: '',
    //     component: ,
    //   },
    //   {
    //     path: 'detail/:id',
    //     component: ,
    //   },
    //   {
    //     path: 'create',
    //     component: ,
    //   },
    // ],
  },
  {
    path: 'category',
    component: CategoryTablePageComponent,
  },
  {
    path: 'developer',
    component: DeveloperTablePageComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailPageComponent,
  },
  {
    path: 'products/create',
    component: ProductDetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablePageRoutingModule {}
