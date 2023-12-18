import { HttpResponse } from '@angular/common/http';
import { LocalStoreConst } from '../shared/constant/local-const';
import { header } from '../shared/constant/router-const';

export class GlobalVariable {
  constructor() {}
  public removeSession() {
    console.log('run2');
    localStorage.removeItem(LocalStoreConst.ACCESS_TOKEN);
    localStorage.removeItem(LocalStoreConst.REFRESH_TOKEN);
    localStorage.removeItem(LocalStoreConst.USER_PROFILE);
    localStorage.removeItem(LocalStoreConst.USER_CART);
    localStorage.removeItem(LocalStoreConst.LOGIN_STAGE);
    // localStorage.removeItem(LocalStoreConst.REFRESH_TOKEN);
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
    const value = res.body?.user;
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
    if (data) {
      localStorage.setItem(
        LocalStoreConst.USER_CART,
        String(JSON.stringify(data))
      );
    } else {
      localStorage.setItem(
        LocalStoreConst.USER_CART,
        String(JSON.stringify('[]'))
      );
    }
  }
  get getUserCart() {
    return localStorage.getItem(LocalStoreConst.USER_CART);
  }

  setUserLiblary(data: any) {
    if (data) {
      localStorage.setItem(
        LocalStoreConst.USER_LIBRARY,
        String(JSON.stringify(data))
      );
    } else {
      localStorage.setItem(
        LocalStoreConst.USER_LIBRARY,
        String(JSON.stringify('[]'))
      );
    }
  }
  get getUserLiblary() {
    return localStorage.getItem(LocalStoreConst.USER_LIBRARY);
  }
  setRecommendProduct(data: any) {
    if (data) {
      localStorage.setItem(
        LocalStoreConst.USER_RECOMMEND,
        String(JSON.stringify(data))
      );
    } else {
      localStorage.setItem(
        LocalStoreConst.USER_RECOMMEND,
        String(JSON.stringify('[]'))
      );
    }
  }
  get getRecommendProduct() {
    return localStorage.getItem(LocalStoreConst.USER_RECOMMEND);
  }
  setUserWishList(data: any) {
    if (data) {
      localStorage.setItem(
        LocalStoreConst.USER_WISH_LIST,
        String(JSON.stringify(data))
      );
    } else {
      localStorage.setItem(
        LocalStoreConst.USER_WISH_LIST,
        String(JSON.stringify('[]'))
      );
    }
  }
  get getUserWishList() {
    return localStorage.getItem(LocalStoreConst.USER_WISH_LIST);
  }
  screenName: string = '';
}
