import { Injectable } from '@angular/core';
import { GlobalVariable } from '../base/global-variable';
import { LocalStoreConst } from '../shared/constant/local-const';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { header, routerURL } from '../shared/constant/router-const';
import { BaseService, OptionsRequest } from './base.service';

@Injectable({
  providedIn: 'root',
})
export abstract class AuthBaseService extends BaseService {
  protected authApi: string = '/auth';
  constructor(http: HttpClient) {
    super(http);
  }
  protected setSession(res: HttpResponse<any>) {
    this.globalVariable.setAccessToken(res);
    this.globalVariable.setRefreshToken(res);
    this.globalVariable.setUserProfile(res);
    // this.globalVariable.setUserCart(res);
    // this.globalVariable.setUserLiblary(res);
    // this.globalVariable.setRecommendProduct(res);
    // this.globalVariable.setUserWishList(res);
  }
  protected removeSession() {
    this.globalVariable.removeSession();
  }
}
