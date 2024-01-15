import { Component, Injector, OnInit } from '@angular/core';
import { BehaviorSubject, map, tap, forkJoin } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { GlobalVariable } from 'src/app/base/global-variable';
import { Product } from 'src/app/model/products.model';
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
  // public isLogin$: BehaviorSubject<boolean> = this.authsv.isLogin;
  private GlobalVariable: GlobalVariable = new GlobalVariable();
  counter: number = 0;
  public releaseseProducts = [] as any;
  public topSellerProducts = [] as any;
  public selectedIndex = 0;
  public listLink: any = [
    {
      id: '1',
      content: 'New update',
      products: [] as Product.ProductDisplay[],
    },
    {
      id: '2',
      content: 'Top seller',
      products: [] as Product.ProductDisplay[],
    },
    {
      id: '3',
      content: 'Recommend',
      products: [] as Product.ProductDisplay[],
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

  private getDataRelease() {
    this.storeSv
      .getNewRelease()
      .pipe(
        map((releasese) => {
          releasese.map((item: any) => {
            this.releaseseProducts.push(item);
          });
        })
      )
      .subscribe({
        complete: () => {
          this.releaseseProducts.map((item: any) => {
            this.listLink[0].products.push(item);
          });
        },
      });
  }

  private getDataBestSeller() {
    this.storeSv
      .getBestSeller()
      .pipe(
        map((bestSeller) => {
          bestSeller.map((item: any) => {
            this.topSellerProducts.push(item);
          });
        })
      )
      .subscribe({
        complete: () => {
          this.topSellerProducts.map((item: any) => {
            this.listLink[1].products.push(item);
          });
        },
      });
  }

  get getDataRecommend() {
    if (this.userStageLogin) {
      this.listLink[2].products = JSON.parse(
        String(this.vms.globalVariable.getRecommendProduct)
      );
      return this.listLink[2].products;
    } else {
      return (this.listLink[2].products = []);
    }
  }
  public slideShow(index: number) {
    this.selectedIndex = index;
  }
  override onInit(): void {
    this.getDataBestSeller();
    this.getDataRelease();
    this.getDataRecommend();
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
    if (isLogin === null) {
      return false;
    } else if (isLogin) {
      return true;
    }
    return false;
  }
}
