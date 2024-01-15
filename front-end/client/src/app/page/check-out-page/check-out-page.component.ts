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
    this.getData();
  }
  private getData() {
    this.userSv.getCart().subscribe();
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
  get totalPrice() {
    let total = 0;
    this.userCart.map((item: any) => {
      total += item.price - (item.price * item.sale.salePersent) / 100;
    });
    return total;
  }
  public salePersent(product: any) {
    if (product.sale.salePersent <= 0) {
      return false;
    } else {
      return true;
    }
  }
  public removeCartItem(item: any) {
    const userCart = JSON.parse(String(this.vms.globalVariable.getUserCart));

    const cart = userCart.filter((product: any) => {
      return String(product._id) != String(item._id);
    });

    this.vms.globalVariable.setUserCart(cart);
    this.userSv.removeFromCart(item).subscribe();
  }
  public toProductDetail(id: string) {
    this.router.navigate(['/product', id]);
  }
}
