import { Component, Injector, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { User } from 'src/app/model/account.model';
import { ProductsService } from 'src/app/service/products.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-check-out-page',
  templateUrl: './check-out-page.component.html',
  styleUrls: ['./check-out-page.component.scss'],
})
export class CheckOutPageComponent extends BaseComponent implements OnInit {
  constructor(
    private userSv: UserService,
    private productSv: ProductsService,
    private injector: Injector
  ) {
    super(injector);
  }
  private getData() {
    const me = this;

    me.userSv
      .getCart()
      .pipe(
        takeUntil(me.destroy$),
        tap((res: any) => {})
      )
      .subscribe();
  }
  get userStageLogin(): boolean {
    const isLogin = this.vms.globalVariable.getLoginStage;
    if (isLogin) {
      return true;
    }
    return false;
  }
  get userDetail() {
    if (this.userStageLogin) {
      return JSON.parse(String(this.vms.globalVariable.getUserProfile));
    }
    return;
  }
  get userCart() {
    if (this.userStageLogin) {
      return JSON.parse(String(this.vms.globalVariable.getUserCart));
    }
    return;
  }
  public removeCartDetail(id: string) {
    // const me = this;
    // me.userSv.removeFromCart(id).subscribe({
    //   complete: () => {
    //     me.getData();
    //   },
    // });
  }
  override onInit(): void {}
  override onDestroy(): void {
    const me = this;
    me.destroy$.next();
    me.destroy$.complete();
    me.destroy$.unsubscribe();
  }
}
