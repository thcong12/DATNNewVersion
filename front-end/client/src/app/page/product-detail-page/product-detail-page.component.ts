import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { shareReplay, tap } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { User } from 'src/app/model/account.model';
import { AuthService } from 'src/app/service/auth.service';
import { ProductsService } from 'src/app/service/products.service';
import { StoreService } from 'src/app/service/store.service';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
  providers: [MessageService],
})
export class ProductDetailPageComponent extends BaseComponent {
  public commentForm!: FormGroup;
  counter: number = 0;
  // public isLogin$: BehaviorSubject<boolean> = this.authSv.isLogin;
  public isInLybrary: boolean = false;

  constructor(
    protected injector: Injector,
    private prodSv: ProductsService,
    private userSv: UserService,
    private formBd: FormBuilder,
    private storeSv: StoreService,
    private authSv: AuthService,
    private messageSv: MessageService
  ) {
    super(injector);
  }
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
  public selectedIndex: number = 0;
  public product!: any;
  public listProductSimilar!: any[];
  public developerId!: any;
  public productId!: string;
  id: string = 'info';
  color: string = '';
  public display(ids: any) {
    this.id = ids;
    this.color = 'blue';
  }
  public controlName = {
    title: 'title',
    rating: 'rating',
    comment: 'comment',
  };
  private getProduct(): void {
    this.route.paramMap
      .pipe(
        tap((param) => {
          this.productId = param.get('id') as string;
        })
        // tap((param) => {
        //   this.productId = param.get('id') as string;
        // })
      )
      .subscribe({
        next: () => {
          console.log(this.productId);
          this.prodSv
            .getProductDetail(this.productId)
            .pipe(
              tap((res: any) => {
                console.log(res);
                this.product = res;
              })
            )
            .subscribe();
        },
      });
  }
  private getSameProduct(id: string) {
    // const me = this;
    // me.storeSv
    //   .findSameProduct(id)
    //   .pipe(
    //     tap((res) => {
    //       me.listProductSimilar = [...(res as any)];
    //       console.log(res);
    //     })
    //   )
    //   .subscribe();
  }
  public postComment() {
    const me = this;
    me.userSv.postComment(me.productId, me.commentForm.value).subscribe();
  }
  public addToCart(item: any) {
    const userCart = JSON.parse(String(this.vms.globalVariable.getUserCart));
    const isExist = userCart.findIndex((item: any) => {
      return String(item._id) == String(item._id);
    });
    if (isExist != -1) {
      this.messageSv.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product is exist ',
      });
      return;
    }

    this.userSv
      .addToCart(item)
      .pipe(
        shareReplay<any>(),
        tap((res: HttpResponse<any>) => {
          if (res.status == 201) {
            this.messageSv.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product has added',
            });
            userCart.push(item);
            this.vms.globalVariable.setUserCart(userCart);
          }
        })
      )
      .subscribe();
  }

  public addToWishList(item: any) {
    const userWishList = JSON.parse(
      String(this.vms.globalVariable.getUserWishList)
    );
    let dataFormat: User.Wishlist = {
      product: item,
    };
    const isExist = userWishList.findIndex((item: any) => {
      return String(dataFormat.product._id) == String(item._id);
    });
    if (isExist != -1) {
      this.messageSv.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product is exist ',
      });
      return;
    }

    this.userSv
      .addToWishList(item)
      .pipe(
        shareReplay<any>(),
        tap((res: HttpResponse<any>) => {
          if (res.status == 201) {
            this.messageSv.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product has added',
            });
            userWishList.push(dataFormat);
            this.vms.globalVariable.setUserWishList(userWishList);
          }
        })
      )
      .subscribe();
  }
  public removeFromWishList(item: any) {
    const userWishList = JSON.parse(
      String(this.vms.globalVariable.getUserWishList)
    );
    this.userSv
      .removeFromWishList(item)
      .pipe(
        shareReplay<any>(),
        tap((res: HttpResponse<any>) => {
          if (res.status == 201) {
            this.messageSv.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product has remove',
            });
            const wishList = userWishList.filter((product: any) => {
              return String(product.product._id) != String(item._id);
            });
            this.vms.globalVariable.setUserWishList(wishList);
          }
        })
      )
      .subscribe();
  }
  private formInit() {
    const me = this;
    me.commentForm = me.formBd.group({
      [me.controlName.title]: ['', Validators.required],
      [me.controlName.rating]: ['', Validators.required],
      [me.controlName.comment]: ['', Validators.required],
    });
  }
  override onInit(): void {
    const me = this;
    me.getProduct();

    me.formInit();
    // me.isLogin$.subscribe((result) => {
    //   if (result) {
    //     me.getLibraries();
    //     setTimeout(() => {
    //       me.userSv.setDataRecomend(me.productId).subscribe();
    //     }, 2000);
    //   }
    // });
  }
  onNext() {
    if (this.counter != this.listProductSimilar.length - 1) {
      this.counter++;
    }
  }

  onPrevious() {
    if (this.counter > 0) {
      this.counter--;
    }
  }
  @ViewChild('ádasd') aa!: ElementRef;
  private setDataRecommend() {
    if (this.productId) {
      this.userSv.setDataRecomend(this.productId).subscribe();
    }
  }

  get isInCart() {
    const isLogin = JSON.parse(String(this.vms.globalVariable.getLoginStage));
    if (isLogin) {
      const userCart = JSON.parse(String(this.vms.globalVariable.getUserCart));
      if (userCart.length > 0) {
        const combineArray: any[] = userCart?.map((data: any) => {
          return data._id;
        });
        return combineArray.includes(this.productId);
      }
      return false;
    }
    return;
  }

  get isInLibary() {
    const isLogin = JSON.parse(String(this.vms.globalVariable.getLoginStage));
    if (isLogin) {
      const Wishlist = JSON.parse(
        String(this.vms.globalVariable.getUserWishList)
      );
      if (Wishlist.length > 0) {
        const combineArray: any[] = Wishlist?.map((data: any) => {
          return data.product._id;
        });
        return combineArray.includes(this.productId);
      }
      return false;
    }
    return;
  }

  get priceAfterSale() {
    const finalPrice =
      this.product.product.price -
      (this.product.product.price * this.product.product.sale.salePersent) /
        100;
    return finalPrice;
  }
  // get categoryItem() {
  //   return this.product.detail?.categlory;
  // }

  // get isInWishList(){
  //   const userWishList= JSON.parse(String(this.vms.globalVariable.getUserWishList))
  //   const combineArray:any[] = userWishList.productId.map((data:any)=>{
  //     return data._id
  //   })

  //   return combineArray.includes(this.productId)
  // }
}
