import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home-page/home-page.module').then((m) => m.HomePageModule),
      },
      {
        path: 'table',
        loadChildren: () =>
          import('../table-page/table-page.module').then((m) => m.TableModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
