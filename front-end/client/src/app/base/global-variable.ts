export class GlobalVariable {
  constructor() {}
  public removeSession() {
    localStorage.clear();
  }

  //handle login stage
  setLoginStage(value: string) {
    localStorage.setItem('LOGIN_STAGE', value);
  }
  get getLoginStage() {
    return localStorage.getItem('LOGIN_STAGE');
  }

  //handle refresh token
  setRefreshToken(value: any) {
    localStorage.setItem('REFRESH_TOKEN', String(value));
  }
  get getRefreshToken() {
    return localStorage.getItem('REFRESH_TOKEN');
  }

  //handle access token
  get getAccessToken() {
    return localStorage.getItem('ACCESS_TOKEN');
  }
  setAccessToken(value: any) {
    localStorage.setItem('ACCESS_TOKEN', String(value));
  }

  //handle  user profile
  setUserProfile(value: any) {
    localStorage.setItem('USER_PROFILE', JSON.stringify(value));
  }

  get getUserProfile() {
    return localStorage.getItem('USER_PROFILE');
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
