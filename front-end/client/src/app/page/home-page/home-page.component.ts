import { Component, Injector, OnInit } from '@angular/core';
import { map, forkJoin, tap } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { GlobalVariable } from 'src/app/base/global-variable';

import { LayoutService } from 'src/app/service/app.layout.service';
import { ProductsService } from 'src/app/service/products.service';
import { StoreService } from 'src/app/service/store.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent extends BaseComponent {
  public productSlider: any = [];
  public selectedIndex = 3;
  public productList: any = [];
  public categorylist: any = [
    {
      title: 'Open world',
      image:
        'https://store.steampowered.com/categories/homepageimage/category/exploration_open_world?cc=us&l=english',
      color: 'red',
    },
    {
      title: 'Survival',
      color: 'blue',
      image:
        'https://store.steampowered.com/categories/homepageimage/category/survival?cc=us&l=english',
    },
    {
      title: 'Role-playing',
      color: 'yellow',
      image:
        'https://store.steampowered.com/categories/homepageimage/category/rpg?cc=us&l=english',
    },
    {
      title: 'Action',
      color: 'green',
      image:
        'https://store.steampowered.com/categories/homepageimage/category/action?cc=us&l=english',
    },
    {
      title: 'Anime',
      color: 'red',
      image:
        'https://store.steampowered.com/categories/homepageimage/category/anime?cc=us&l=english',
    },
    {
      title: 'Advanture',
      color: 'blue',
      image:
        'https://store.steampowered.com/categories/homepageimage/category/adventure?cc=us&l=english',
    },
    {
      title: 'Fighting',
      color: 'yellow',
      image:
        'https://store.steampowered.com/categories/homepage…ge/category/fighting_martial_arts?cc=us&l=english',
    },
    {
      title: 'Horror',
      color: 'green',
      image:
        'https://store.steampowered.com/categories/homepageimage/category/horror?cc=us&l=english',
    },
  ];
  constructor(
    protected injector: Injector,
    private storeSv: StoreService,
    private productSv: ProductsService
  ) {
    super(injector);
  }
  public getData() {
    const me = this;
    me.storeSv
      .getProductsSlider()
      .pipe(
        map((res) => {
          me.productSlider = [...res];
          // this.selectedIndex = 1;
        })
      )
      .subscribe();
  }
  public slideShow(index: number) {
    this.selectedIndex = index;
  }
  public getData1() {
    // const me = this;
    // me.productSv
    //   .getProducts()
    //   .pipe(
    //     tap((res) => {
    //       res.map((item: any) => {
    //         forkJoin({ detail: me.productSv.getProductDetail(item._id) })
    //           .pipe(
    //             map(({ detail }) => {
    //               item.detail = detail;
    //             })
    //           )
    //           .subscribe();
    //       });
    //       me.productList = [...res.slice(0, 4)];
    //     })
    //   )
    //   .subscribe();
  }
  override onInit(): void {
    const me = this;
    me.getData();
    me.getData1();
    // setInterval(() => {
    //   if (me.selectedIndex == me.productSlider.length - 1) {
    //     me.selectedIndex = 0;
    //   } else {
    //     me.selectedIndex++;
    //   }
    // }, 5000);
  }
}
