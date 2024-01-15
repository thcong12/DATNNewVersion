import { HttpResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { GlobalVariable } from 'src/app/base/global-variable';
import { ViewModelService } from 'src/app/base/viewModel.service';
import { LayoutService } from 'src/app/service/app.layout.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent extends BaseComponent {
  private globalVariable: GlobalVariable = new GlobalVariable();
  private userCart1: any | undefined;
  items!: MenuItem[];
  listBox = [
    {
      label: 'View profile',
      eventClick: () => {
        return this.router.navigateByUrl('/profile');
      },
    },
    {
      label: 'Logout',
      eventClick: () => {
        this.logOut();
      },
    },
  ];
  showListBox: boolean = false;
  showCart: boolean = false;
  cartItem: any;
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  @ViewChild('cart') cart!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    private authSv: AuthService,
    private userSv: UserService,
    Injector: Injector
  ) {
    super(Injector);
  }
  override onInit(): void {}
  public logOut() {
    this.authSv
      .logout()
      .pipe()
      .subscribe({
        next: (res: HttpResponse<any>) => {
          this.vms.globalVariable.removeSession();
        },
      });
  }
  public removeCartItem(item: any) {
    const userCart = JSON.parse(String(this.vms.globalVariable.getUserCart));

    const cart = userCart.filter((product: any) => {
      return String(product._id) != String(item._id);
    });

    this.vms.globalVariable.setUserCart(cart);
    this.userSv.removeFromCart(item).subscribe();
  }
  get userStageLogin(): boolean {
    const isLogin = this.vms.globalVariable.getLoginStage;
    if (isLogin == 'true') {
      return true;
    }
    return false;
  }
  get userDetail() {
    if (this.userStageLogin) {
      return JSON.parse(String(this.vms.globalVariable.getUserProfile));
    }
    return [];
  }
  get userCart() {
    if (this.userStageLogin) {
      return JSON.parse(String(this.vms.globalVariable.getUserCart));
    }
    return [];
  }
  showClick() {
    this.showListBox = !this.showListBox;
  }
  showUserCart() {
    this.showCart = !this.showCart;
  }
  returnHomePage() {
    this.router.navigateByUrl('/home');
  }
  toCheckoutPage(op: OverlayPanel) {
    op.hide();
    this.router.navigateByUrl('/checkout');
  }
  toLoginPage() {
    this.router.navigate(['auth', 'login']);
  }
  onRowSelect(op: OverlayPanel) {
    // op.
    // console.log('asdasd');
  }
}
