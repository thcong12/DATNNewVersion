import { Component, Injector, OnInit } from '@angular/core';
import { BehaviorSubject, map, tap, forkJoin } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { GlobalVariable } from 'src/app/base/global-variable';
import { AuthService } from 'src/app/service/auth.service';
import { CategloryService } from 'src/app/service/categlory.service';
import { DevelopersService } from 'src/app/service/developers.service';
import { FeatureService } from 'src/app/service/feature.service';
import { ProductsService } from 'src/app/service/products.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-home-page-list',
  templateUrl: './home-page-list.component.html',
  styleUrls: ['./home-page-list.component.scss'],
})
export class HomePageListComponent extends BaseComponent {
  public isLogin$: BehaviorSubject<boolean> = this.authsv.isLogin;
  private GlobalVariable: GlobalVariable = new GlobalVariable;
  counter: number = 0;
  public releaseseProducts = [] as any;
  public topSellerProducts = [] as any;
  public selectedIndex = 0;
  public listLink: any = [
    {
      id: '1',
      content: 'New update',
      products: [] as any,
    },
    {
      id: '2',
      content: 'Top seller',
      products: [] as any,
    },
    {
      id: '3',
      content: 'Recommend',
      products: [] as any,
    },
  ];
  public id = '1';
  constructor(
    private injector: Injector,
    private productSv: ProductsService,
    private storeSv: StoreService,
    private authsv: AuthService
  ) {
    super(injector);
  }

  public display(id: any) {
    this.selectedIndex = 0;

    this.id = id;
  }

  public getData() {
    const productRelease = JSON.parse(
      String(localStorage.getItem('USER_RELEASE'))
    );
    this.productSv
      .getProducts()
      .pipe(
        map((releasese) => {
          let newArray = releasese.slice(0, 10);
          newArray.map((item: any) => {
            let idPr = String(item._id);
            return this.productSv
              .getProductDetail(idPr)
              .pipe(
                tap((res) => {
                  this.releaseseProducts.push(res);
                })
              )
              .subscribe();
          });
        })
      )
      .subscribe({
        complete: () => {
          this.listLink[0].products = this.releaseseProducts;
        },
      });
  }

  public getData1() {
    const me = this;
    me.storeSv
      .getBestSeller()
      .pipe(
        tap((bestseller) => {
          bestseller.slice(0, 10).forEach((item: any) => {
            if (item._id !== null) {
              me.productSv
                .getProductDetail(String(item._id))
                .pipe(
                  tap((res) => {
                    me.listLink[1].products.push(res);
                    console.log(res);
                  })
                )
                .subscribe();
            }
          });
        })
      )
      .subscribe({
        complete: () => {},
      });
  }

  public getData2() {
    const me = this;
    const productRecommend = JSON.parse(
      String(localStorage.getItem('USER_RECOMMEND'))
    );
    const productBestseller = JSON.parse(
      String(localStorage.getItem('USER_RECOMMEND'))
    );

    forkJoin(
      productRecommend.buy.map((item: any) => {
        return me.productSv.getProductDetail(item);
      })
    )
      .pipe(
        tap((res: any) => {
          me.listLink[2].products = [...res];
        })
      )
      .subscribe();
  }
  public slideShow(index: number) {
    this.selectedIndex = index;
  }
  override onInit(): void {
    const me = this;
    me.getData();
    me.getData1();
    if (me.isLogin$) {
      me.getData2();
    }
  }
  onNext(productList: any) {
    if (this.counter != productList - 1) {
      this.counter++;
    }
  }

  onPrevious() {
    if (this.counter > 0) {
      this.counter--;
    }
  }
  get userStageLogin(): boolean {
    const isLogin = this.vms.globalVariable.getLoginStage;
    if (isLogin) {
      return true;
    }
    return false;
  }
}
