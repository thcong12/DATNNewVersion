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
  public index: number = 0;
  public productList: any = [];
  public categorylist: any = [];
  public imgColor: any = [
    'rgba(0,0,0,0), rgb(139,0,0) 100%',
    'rgba(0,0,0,0), rgb(0,0,139) 100%',
    'rgba(0,0,0,0), rgb(184,134,11) 100%',
    'rgba(0,0,0,0), rgb(0,100,0) 100%',
    'rgba(0,0,0,0), rgb(0,139,139) 100%',
    'rgba(0,0,0,0), rgb(139,0,139) 100%',
  ];
  public responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
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
        })
      )
      .subscribe();
  }
  private getCategory() {
    this.productSv.getCategory().subscribe({
      next: (res) => {
        let count = res.length / 4;
        Math.floor(count);
        for (let i = 0; i < count; i++) {
          const inputData = (res as any[])
            .slice(4 * i, 4 * (i + 1))
            .map((item) => {
              return {
                ...item,
                color: this.imgColor[Math.floor(Math.random() * 5)],
              };
            });
          console.log(inputData);
          this.categorylist.push({
            index: i,
            category: inputData,
            color: '',
          });
        }
      },
    });
  }
  public slideShow(index: number) {
    this.selectedIndex = index;
  }
  onNext() {
    if (this.index != this.categorylist.length - 1) {
      this.index++;
    }
  }

  onPrevious() {
    if (this.index > 0) {
      this.index--;
    }
  }
  override onInit(): void {
    this.getData();
    this.getCategory();
    setInterval(() => {
      if (this.selectedIndex == this.productSlider.length - 1) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex++;
      }
    }, 5000);
  }
}
