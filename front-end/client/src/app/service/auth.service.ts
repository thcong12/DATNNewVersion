import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { AuthModule } from '../model/auth.model';
import { BaseService, OptionsRequest } from './base.service';
import { GlobalVariable } from '../base/global-variable';
import { ViewModelService } from '../base/viewModel.service';
import { AuthBaseService } from './auth-base.service';
import { routerURL } from '../shared/constant/router-const';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthBaseService {
  private authError: boolean = false;

  constructor(
    http: HttpClient,
    private router: Router,
    private vms: ViewModelService
  ) {
    super(http);
    // this.updateAuth();
  }
  public redirectUrl: string | null = null;
  public isLogin = new BehaviorSubject<boolean>(this.isAuth());
  public isAuth(): boolean {
    return this.globalVariable.getRefreshToken !== null;
  }
  public updateAuth() {
    if (this.globalVariable.getRefreshToken !== null)
      return this.isLogin.next(true);
    if (this.globalVariable.getRefreshToken === null) {
      return this.isLogin.next(false);
    }
  }
  public login(
    login: AuthModule.Login
  ): Observable<HttpResponse<AuthModule.Login>> {
    const url = this.authApi + routerURL.auth.login;
    return this.post(url, login, this.httpOption).pipe(
      shareReplay<any>(),
      tap(async (res: HttpResponse<any>) => {
        if (res.status === 200) {
          this.globalVariable.setLoginStage(String(true));
          const isLogin = this.globalVariable.getLoginStage;
          await this.setSession(res);
          if (isLogin) {
            this.router.navigateByUrl('/home');
          }
        } else {
          this.authError = true;
        }
      })
    );
  }
  public logout(): Observable<HttpResponse<any>> {
    const url = this.authApi + routerURL.auth.logout;
    return this.get(url, this.httpOption).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {
        // alert('Logout successful');
        this.globalVariable.removeSession();
      })
    );
  }
  public register(user: AuthModule.Register): Observable<HttpResponse<any>> {
    const url = this.authApi + routerURL.auth.login;
    return this.post(url, user, this.httpOption).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {
        if (res.status === 200) {
          alert(
            'Account have been create please check your email to active the account'
          );
        } else {
          alert('some thing wrong');
        }
      })
    );
  }
  public userActive(token: string): Observable<HttpResponse<any>> {
    const url = this.authApi + routerURL.auth.accActive(token);
    return this.get(url, this.httpOption).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {
        alert('account active successful');
      })
    );
  }
  public resetPassword(formInput: any): Observable<HttpResponse<any>> {
    const url = this.authApi + routerURL.auth.resetps;
    return this.post(url, formInput, this.httpOption).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {})
    );
  }
  public changePassword(
    token: string,
    password: any
  ): Observable<HttpResponse<any>> {
    const url = this.authApi + routerURL.auth.changePasswork(token);
    return this.post(url, password, this.httpOption).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {})
    );
  }
  public getNewAccessToken() {
    const url = this.authApi + routerURL.auth.refreshTk;
    return this.get(url, this.httpOption).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {
        this.globalVariable.setAccessToken(res);
      })
    );
  }
}
