import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './base/guard/login.guard';
import { UserGuard } from './base/guard/user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./page/home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./page/product-page/product-page.module').then(
        (m) => m.ProductPageModule
      ),
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./page/auth-page/auth-page.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'profile',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./page/user-profile-page/user-profile-page.module').then(
        (m) => m.UserProfilePageModule
      ),
  },

  // {
  //   path: 'products',
  //   loadChildren: () =>
  //     import('./page/product-page/product-page.module').then(
  //       (m) => m.ProductPageModule
  //     ),
  // },
  // {
  //   path: 'auth',

  //   loadChildren: () =>
  //     import('./page/auth-page/auth-page.module').then((m) => m.AuthPageModule),
  // },
  {
    path: 'checkout',

    loadChildren: () =>
      import('./page/check-out-page/check-out-page.module').then(
        (m) => m.CheckOutPageModule
      ),
  },
  // {
  //   path: 'user',

  //   loadChildren: () =>
  //     import('./page/user-page/user-page.module').then((m) => m.UserPageModule),
  // },
  // {
  //   path: 'news',
  //   loadChildren: () =>
  //     import('./page/news-page/news-page.module').then((m) => m.NewsPageModule),
  // },
  // {
  //   path: 'categlory',
  //   loadChildren: () =>
  //     import('./page/categlory-page/categlory-page.module').then((m) => m.CategloryPageModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
