import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
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
export class TopNavComponent implements OnInit {
  items!: MenuItem[];
  listBox = [
    {
      label: 'View profile',
      eventClick: () => {
        return this.router.navigateByUrl('/profile');
      },
    },
    {
      label: 'Logut',
      eventClick: () => {
        return this.authSv.logout().subscribe();
      },
    },
  ];
  showListBox: boolean = false;
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    private authSv: AuthService,
    private userSv: UserService,
    private vms: ViewModelService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  public logOut() {
    this.authSv.logout().subscribe();
  }
  public removeCartItem() {
    console.log(this.userCart);
    // this.vms.globalVariable.setUserCart(cart);
    // this.userSv.removeFromCart(id).subscribe();
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
  showClick() {
    this.showListBox = !this.showListBox;
  }
}
