import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  forkJoin,
  fromEvent,
  map,
  mergeMap,
  takeUntil,
  tap,
  finalize,
} from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ProductsService } from 'src/app/service/products.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cart-nav',
  templateUrl: './cart-nav.component.html',
  styleUrls: ['./cart-nav.component.scss'],
})
export class CartNavComponent implements OnInit {
  public isLogin$!: BehaviorSubject<boolean>;
  public cart: any = this.userSv.cartList;
  public totalPrice: BehaviorSubject<number> = this.userSv.total;
  constructor(
    private userSv: UserService,
    private productSv: ProductsService,
    private authsv: AuthService,
    private router: Router
  ) {
    this.isLogin$ = this.authsv.isLogin;
  }
  cartButton: boolean = false;
  public cartMenu() {
    const me = this;
    me.cartButton = !this.cartButton;
  }
  private getData() {
    const me = this;
    me.userSv
      .getCart()
      .pipe(tap((res: any) => {}))
      .subscribe();
  }
  public checkOut() {
    const me = this;
    me.router.navigateByUrl('/checkout');
  }
  public removeCartDetail(id: string) {
    const me = this;
    me.userSv.removeFromCart(id).subscribe({
      complete: () => {
        me.getData();
      },
    });
  }
  ngOnInit(): void {
    const me = this;

    me.isLogin$.subscribe((result) => {
      if (result) {
        me.getData();
      }
    });
  }
}
