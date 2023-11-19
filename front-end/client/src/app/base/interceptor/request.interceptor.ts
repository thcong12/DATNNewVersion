import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  catchError,
  empty,
  finalize,
  Observable,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { UserService } from 'src/app/service/user.service';
import { GlobalVariable } from '../global-variable';
import { ViewModelService } from '../viewModel.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
  private globalVariable: GlobalVariable;
  constructor(
    private authSv: AuthService,
    private router: Router,
    private loader: LoaderService,
    private userSv: UserService,
    private vms: ViewModelService
  ) {
    this.globalVariable = this.vms.globalVariable;
  }
  refreshingAccessToken!: boolean;
  accessTokenRefreshed: Subject<any> = new Subject();
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    this.loader.show();

    const accessToken = this.globalVariable.getAccessToken;
    if (!!accessToken) {
      request = request.clone({
        headers: request.headers.set('x-access-token', String(accessToken)),
      });
    }

    // call next() and handle the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        switch (error.status) {
          case 401: {
            this.router.navigateByUrl('/auth/login');
            break;
          }
          case 404: {
            break;
          }
          case 403: {
            return this.refreshAccessToken().pipe(
              switchMap(() => {
                if (!!accessToken) {
                  request = request.clone({
                    headers: request.headers.set(
                      'x-access-token',
                      String(accessToken)
                    ),
                  });
                }
                return next.handle(request);
              }),
              catchError((err: any) => {
                return empty();
              })
            );
          }
          case 500: {
            break;
          }
        }
        return throwError(error);
      }),
      finalize(() =>
        setTimeout(() => {
          this.loader.hide();
        }, 2000)
      )
    );
  }
  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable((observer) => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshingAccessToken = true;
      // we want to call a method in the auth service to send a request to refresh the access token
      return this.authSv.getNewAccessToken().pipe(
        tap((val) => {
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next(val);
        })
      );
    }
  }
}
