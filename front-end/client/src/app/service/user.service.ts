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

  public getAllUserOwner() {
    this.getRecommendProduct().subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    this.getCart().subscribe();
    this.getLibraries().subscribe();
    this.getWishlist().subscribe();
  }

  public getCart(): Observable<User.Cart> {
    const url = this.api + apiRouter.user.cart;
    return this.get(url, this.httpOption).pipe(
      tap((res: any) => {
        this.vms.globalVariable.setUserCart(res.body);
      })
    );
  }
  public addToCart(product: User.CartDetail) {
    const url = this.api + apiRouter.user.cart + apiRouter.user.add;
    return this.post(url, product, this.httpOption);
  }
  public removeFromCart(product: User.CartDetail) {
    const url = this.api + apiRouter.user.cart + apiRouter.user.remove;
    return this.post(url, product, this.httpOption);
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
  public getLibraries(): Observable<any> {
    const url = this.api + apiRouter.user.library;
    return this.get(url, this.httpOption).pipe(
      tap((_res) => {
        this.vms.globalVariable.setUserLiblary(_res.body);
      })
    );
  }
  public changeProfile(): Observable<any> {
    const me = this;
    const url = `/profile/user`;
    return me.get(url);
  }
  public getRecommendProduct(): Observable<any> {
    const url = this.api + apiRouter.user.recomend;
    return this.get(url, this.httpOption).pipe(
      tap((res) => {
        this.vms.globalVariable.setRecommendProduct(res.body);
      })
    );
  }
  public getWishlist(): Observable<any> {
    const url = this.api + apiRouter.user.wishlist;
    return this.get(url).pipe(
      tap((_res) => {
        this.vms.globalVariable.setUserWishList(_res);
      })
    );
  }
  public addToWishList(product: User.Wishlist) {
    const url = this.api + apiRouter.user.wishlist + apiRouter.user.add;
    return this.post(url, product, this.httpOption);
  }
  public removeFromWishList(product: User.Wishlist) {
    const url = this.api + apiRouter.user.wishlist + apiRouter.user.remove;
    return this.post(url, product, this.httpOption);
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
