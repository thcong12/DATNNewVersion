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
  protected httpOption!: OptionsRequest;
  protected globalVariable: GlobalVariable;
  constructor(http: HttpClient) {
    super(http);
    this.globalVariable = new GlobalVariable();
    this.setHttpOption();
  }
  protected async setSession(res: HttpResponse<any>) {
    this.globalVariable.setAccessToken(res);
    this.globalVariable.setRefreshToken(res);
    this.globalVariable.setUserProfile(res);
  }
  private setHttpOption() {
    this.httpOption = {
      observe: 'response',
      headers: {
        [header.refreshTK]: String(this.globalVariable.getRefreshToken) || '',
        [header.accessTK]: String(this.globalVariable.getRefreshToken) || '',
      },
    };
  }
}
