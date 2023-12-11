import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mergeMap, tap } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { User } from 'src/app/model/account.model';
import { AuthService } from 'src/app/service/auth.service';
import { CategloryService } from 'src/app/service/categlory.service';
import { DevelopersService } from 'src/app/service/developers.service';
import { FeatureService } from 'src/app/service/feature.service';
import { ProductsService } from 'src/app/service/products.service';
import { StoreService } from 'src/app/service/store.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
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
    private authSv: AuthService
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
        mergeMap((param) =>
          this.prodSv.getProductDetail(String(param.get('id'))).pipe(
            tap((res: any) => {
              // let aaa = '';
              this.product = res;
              console.log(this.product);
              // me.productId = String(param.get('id'));
              // me.developerId = res.productDetail.developer._id;
              // res.productDetail.categlory.slice(0, 3).map((item: any) => {
              //   aaa += `${item._id}+`;
              // });
              // me.storeSv
              //   .findSameProduct(aaa)
              //   .pipe(
              //     tap((res) => {
              //       me.listProductSimilar = [...(res as any)];
              //       console.log(res);
              //     })
              //   )
              //   .subscribe();
              // console.log(res.productDetail.description);
            })
          )
        )
      )
      .subscribe();
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
  public getLibraries() {
    // const me = this;
    // me.userSv
    //   .getLibraries()
    //   .pipe(
    //     tap((res) => {
    //       res.map((item: any) => {
    //         if (item._id == me.productId) {
    //           me.isInLybrary = true;
    //         }
    //       });
    //     })
    //   )
    //   .subscribe();
  }
  public addToCart(item: any) {
    const me = this;
    const userCart = JSON.parse(String(this.vms.globalVariable.getUserCart));
    let dataFormat: User.CartDetail = {
      product: item._id,
      quantity: 1,
    };
    const combineArray: any[] = userCart[0].cartDetail.map((data: any) => {
      return data._id;
    });
    if (!combineArray.includes(item._id)) {
      console.log(userCart);
      me.userSv.addToCart(item).subscribe();
      userCart[0].cartDetail.push(item);
      this.vms.globalVariable.setUserCart(userCart);
    } else {
      alert('product asdasd');
    }
    //  userCart[0].cartDetail.map((data:any) =>{
    //   console.log(data._id == item._id)

    //     if( item._id != data._id ){
    //       me.userSv.addToCart(item).subscribe();
    //       userCart[0].cartDetail.push(item);
    //       this.vms.globalVariable.setUserCart(userCart)
    //     }else{
    //       alert('product asdasd')

    //     }
    //  })
  }
  public addToWishList(item: string) {
    const me = this;
    me.userSv.addToWishList(item).pipe().subscribe();
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
  aaaaa(image: any) {
    image.style.transform = 'translate(100%)';
  }
  private setDataRecommend() {
    if (this.productId) {
      this.userSv.setDataRecomend(this.productId).subscribe();
    }
  }

  get isInCart() {
    const isLogin = JSON.parse(String(this.vms.globalVariable.getLoginStage));
    if (isLogin) {
      // const userCart = JSON.parse(String(this.vms.globalVariable.getUserCart));
      // const combineArray: any[] = userCart[0].cartDetail.map((data: any) => {
      //   return data._id;
      // });
      // return combineArray.includes(this.productId);
      return true;
    }
    return;
  }
  get isInLibary() {
    // const isLogin = JSON.parse(String(this.vms.globalVariable.getLoginStage));
    // if (isLogin) {
    //   const userLibary = JSON.parse(
    //     String(this.vms.globalVariable.getUserLiblary)
    //   );
    //   const combineArray: any[] = userLibary.map((data: any) => {
    //     return data._id;
    //   });
    //   return combineArray.includes(this.productId);
    // }
    return;
  }
  // get isInWishList(){
  //   const userWishList= JSON.parse(String(this.vms.globalVariable.getUserWishList))
  //   const combineArray:any[] = userWishList.productId.map((data:any)=>{
  //     return data._id
  //   })

  //   return combineArray.includes(this.productId)
  // }
}
