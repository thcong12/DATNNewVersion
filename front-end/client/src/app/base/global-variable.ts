import { HttpResponse } from '@angular/common/http';
import { LocalStoreConst } from '../shared/constant/local-const';
import { header } from '../shared/constant/router-const';

export class GlobalVariable {
  constructor() {}
  public removeSession() {
    localStorage.clear();
  }
  setLoginStage(value: string) {
    localStorage.setItem(LocalStoreConst.LOGIN_STAGE, value);
  }
  setAccessToken(res?: HttpResponse<any>) {
    const value = res?.headers.get(header.accessTK);
    localStorage.setItem(LocalStoreConst.ACCESS_TOKEN, String(value));
  }
  //handle  user profile
  setUserProfile(res: HttpResponse<any>) {
    const value = res.body?.userDetail;
    localStorage.setItem(LocalStoreConst.USER_PROFILE, JSON.stringify(value));
  }
  setRefreshToken(res: HttpResponse<any>) {
    const value = res?.headers.get(header.refreshTK);
    localStorage.setItem(LocalStoreConst.REFRESH_TOKEN, String(value));
  }
  get getLoginStage() {
    return localStorage.getItem(LocalStoreConst.LOGIN_STAGE);
  }

  //handle refresh token

  get getRefreshToken() {
    return localStorage.getItem(LocalStoreConst.REFRESH_TOKEN);
  }

  //handle access token
  get getAccessToken() {
    return localStorage.getItem(LocalStoreConst.ACCESS_TOKEN);
  }

  get getUserProfile() {
    return localStorage.getItem(LocalStoreConst.USER_PROFILE);
  }

  setUserCart(data: any) {
    localStorage.setItem('USER_CART', String(JSON.stringify(data)));
  }
  get getUserCart() {
    return localStorage.getItem('USER_CART');
  }

  setUserLiblary(data: any) {
    localStorage.setItem('USER_LIBRARY', String(JSON.stringify(data)));
  }
  get getUserLiblary() {
    return localStorage.getItem('USER_LIBRARY');
  }
  setRecommendProduct(data: any) {
    localStorage.setItem('USER_RECOMMEND', String(JSON.stringify(data)));
  }
  get getRecommendProduct() {
    return localStorage.getItem('USER_RECOMMEND');
  }
  setUserWishList(data: any) {
    localStorage.setItem('USER_WISH_LIST', String(JSON.stringify(data)));
  }
  get getUserWishList() {
    return localStorage.getItem('USER_WISH_LIST');
  }
  screenName: string = '';
}
