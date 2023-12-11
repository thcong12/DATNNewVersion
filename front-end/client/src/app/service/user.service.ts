import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, Subject, tap } from 'rxjs';
import { User } from '../model/account.model';
import { BaseService } from './base.service';
import { GlobalVariable } from '../base/global-variable';
import { Router } from '@angular/router';
import { ViewModelService } from '../base/viewModel.service';
import { apiRouter, routerURL } from '../shared/constant/router-const';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private api: String = apiRouter.user.user;
  private globalVariable: GlobalVariable;
  public cartList = new BehaviorSubject<any[]>([]);
  public userLibrary = new BehaviorSubject<any[]>([]);
  public total = new BehaviorSubject<number>(0);
  constructor(
    http: HttpClient,
    private router: Router,
    private vms: ViewModelService
  ) {
    super(http);
    this.globalVariable = this.vms.globalVariable;
  }
  public getCart(id: string): Observable<User.Cart> {
    const url = this.api + apiRouter.user.cart + id;
    return this.get(url).pipe(
      tap((res: any) => {
        this.vms.globalVariable.setUserCart(res);
      })
    );
  }
  public addToCart(product: User.CartDetail) {
    const url = this.api + apiRouter.user.cart;
    return this.post(url, product);
  }
  public removeFromCart(id: string) {
    const url = this.api + apiRouter.user.cart;
    return this.get(url);
  }

  public userDetail(id: string) {
    const me = this;
    const url = `/user/userDetail/${id}`;
    return me.get<any>(url).pipe(
      tap((_res) => {
        this.vms.globalVariable.setUserProfile(_res);
      })
    );
  }
  public getOrderUser() {
    const me = this;
    const url = `/order/userorder`;
    return me.get(url);
  }
  public getOrderDetail(id: string) {
    const me = this;
    const url = `/order/getorder/${id}`;
    return me.get(url);
  }
  public setDataRecomend(id: string): Observable<any> {
    const me = this;
    const url = `/dataset/click/${id}`;
    return me.get(url);
  }
  public getLibraries(): Observable<any> {
    const me = this;
    const url = `/profile/library`;
    return me.get(url).pipe(
      tap((_res) => {
        this.vms.globalVariable.setUserLiblary(_res);
      })
    );
  }
  public changeProfile(): Observable<any> {
    const me = this;
    const url = `/profile/user`;
    return me.get(url);
  }
  public getReCommendProduct() {
    const me = this;
    const url = `/recommend/data`;
    return me.get(url).pipe(
      tap((res) => {
        if (res) {
          this.vms.globalVariable.setRecommendProduct(res);
        }
      })
    );
  }
  public getWishlist() {
    const me = this;
    const url = `/profile/wishlist`;
    return me.get(url).pipe(
      tap((_res) => {
        this.vms.globalVariable.setUserWishList(_res);
      })
    );
  }
  public addToWishList(id: string) {
    const me = this;
    const url = `/profile/wishlist`;
    return me.post(url, id);
  }
  public postComment(
    id: string,
    comment: User.Comment
  ): Observable<User.Comment> {
    const me = this;
    const url = `/products/newcomment/${id}`;
    return me.put(url, comment);
  }
}
