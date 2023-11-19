import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { AuthModule } from '../model/auth.model';
import { BaseService } from './base.service';
import { GlobalVariable } from '../base/global-variable';
import { ViewModelService } from '../base/viewModel.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authError: boolean = false;
  private globalVariable: GlobalVariable;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private vms: ViewModelService
  ) {
    this.globalVariable = this.vms.globalVariable;
    this.updateAuth();
  }
  public redirectUrl: string | null = null;

  public isLogin = new BehaviorSubject<boolean>(this.isAuth());
  private async setSession(
    accessToken?: string,
    refreshToken?: string,
    userInfo?: string
  ) {
    this.globalVariable.setAccessToken(accessToken);
    this.globalVariable.setRefreshToken(refreshToken);
    this.globalVariable.setUserProfile(userInfo);
  }
  private removeSession() {
    this.globalVariable.removeSession();
  }
  public isAuth(): boolean {
    return this.getRefreshToken() !== null;
  }
  public updateAuth() {
    if (this.getRefreshToken() !== null) return this.isLogin.next(true);
    if (this.getRefreshToken() === null) {
      return this.isLogin.next(false);
    }
  }
  public login(login: AuthModule.Login): Observable<HttpResponse<any>> {
    const me = this;
    const url = `http://localhost:5000/api/store/user/login`;
    return me.httpClient.post(url, login, { observe: 'response' }).pipe(
      shareReplay<any>(),
      tap(async (res: HttpResponse<any>) => {
        if (res.status === 200) {
          this.globalVariable.setLoginStage(String(true));
          const isLogin = this.globalVariable.getLoginStage;
          await this.setSession(
            res.headers?.get('x-access-token') || '',
            res.headers?.get('x-refresh-token') || '',
            res.body?.userDetail
          );
          if (isLogin) {
            this.router.navigateByUrl('/home');
          }
        } else {
          this.authError = true;
        }
      })
    );
  }
  public getRefreshToken() {
    return localStorage.getItem('REFRESH_TOKEN');
  }
  public getAccessToken() {
    return localStorage.getItem('ACCESS_TOKEN');
  }
  public logout(): Observable<HttpResponse<any>> {
    const me = this;
    const url = `http://localhost:5000/api/store/user/logout`;
    return me.httpClient
      .get(url, {
        headers: { 'x-refresh-token': String(this.getRefreshToken()) },
        observe: 'response',
      })
      .pipe(
        shareReplay<any>(),
        tap((res: HttpResponse<any>) => {
          alert('Logout successful');
          me.removeSession();
        })
      );
  }
  public register(user: AuthModule.Register): Observable<HttpResponse<any>> {
    const me = this;
    const url = `http://localhost:5000/api/store/user/signup`;
    return me.httpClient.post(url, user, { observe: 'response' }).pipe(
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
    const me = this;
    const url = `http://localhost:5000/api/store/user/useractice/${token}`;
    return me.httpClient
      .get(url, {
        headers: {},
        observe: 'response',
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          alert('account active successful');
        })
      );
  }
  public forgotPassword(formInput: any): Observable<HttpResponse<any>> {
    const me = this;
    const url = `http://localhost:5000/api/store/user/forgotpassword`;
    return me.httpClient.post(url, formInput, { observe: 'response' }).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {})
    );
  }
  public changePassword(
    token: string,
    password: any
  ): Observable<HttpResponse<any>> {
    const url = `http://localhost:5000/api/store/user/changepassword/${token}`;
    return this.httpClient.post(url, password, { observe: 'response' }).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {})
    );
  }
  public setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }
  getNewAccessToken() {
    const url = `http://localhost:5000/api/store/user/refresh`;
    return this.httpClient
      .get(url, {
        headers: { 'x-refresh-token': String(this.getRefreshToken()) },
        observe: 'response',
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.globalVariable.setAccessToken(res.headers.get('x-access-token'));
        })
      );
  }
}
