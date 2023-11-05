import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, shareReplay, tap } from 'rxjs';
import { AuthModule } from '../model/auth.model';
import { BaseService } from './base.service';
// import { GlobalVariable } from 'src/app/base/global-variable';
import { ViewModelService } from 'src/app/base/viewModel.service';
import { environment } from 'src/environments/environment';
import { GlobalVariable } from '../base/global-variable';
import { header, routerURL } from '../constant/constant-router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogin!: boolean;
  private globalVariable: GlobalVariable;
  private url: string = environment.api + 'auth';
  constructor(
    private http: HttpClient,
    private router: Router,
    private vms: ViewModelService
  ) {
    this.globalVariable = this.vms.globalVariable;
  }

  public login(login: AuthModule.Login): Observable<HttpResponse<any>> {
    const me = this;
    const url = this.url + routerURL.auth.login;

    return me.http.post(url, login, { observe: 'response' }).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {
        console.log(res.status);
        if (res.status === 200) {
          this.progressAffterLogin(res);
        } else {
          console.log(res.status);
        }
      })
    );
  }

  public logout(): Observable<HttpResponse<any>> {
    const me = this;
    const url = this.url + routerURL.auth.logout;
    return me.http.get(url).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {
        this.progressAfterLogout();
      })
    );
  }

  public getAccessToken() {
    const url = this.url + routerURL.auth.refreshTk;
    return this.http
      .get(url, {
        headers: {
          [header.refreshTK]: String(this.globalVariable.getRefreshToken),
        },
        observe: 'response',
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.globalVariable.setAccessToken(res.headers.get(header.accessTK));
        })
      );
  }

  private progressAffterLogin(data: any) {
    this.globalVariable.setAccessToken(data.headers.get(header.accessTK));
    this.globalVariable.setRefreshToken(data.headers.get(header.refreshTK));
    this.globalVariable.setLoginStage('true');
  }
  private progressAfterLogout() {
    localStorage.clear();
    this.globalVariable.setLoginStage('false');
  }
}
