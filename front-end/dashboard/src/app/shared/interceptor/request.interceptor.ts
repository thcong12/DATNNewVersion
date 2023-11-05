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
// import { UserService } from '../service/user.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/layout/service/loader.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private authSv: AuthService,
    private router: Router,
    private loader: LoaderService // private userSv: UserService,
  ) {}
  refreshingAccessToken!: boolean;
  accessTokenRefreshed: Subject<any> = new Subject();
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    this.loader.show();

    const accessToken = '';
    // this.authSv.getAccessToken() |
    if (!!accessToken) {
      request = request.clone({
        headers: request.headers.set('x-access-token', String(accessToken)),
      });
    }

    // call next() and handle the response
    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => {
          this.loader.hide();
        }, 2000);
      }),
      catchError((error: HttpErrorResponse) => {
        const status = error.status;
        switch (+status) {
          case 400:

          case 401: {
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
                console.log(err);
                alert('something wrong');
                return empty();
              })
            );
          }
          case 403: {
            alert(
              'You cant see this content, ask the admin for more infomation'
            );
            this.router.navigate(['/home']);
            break;
          }
          case 404:
          case 500:
        }

        return throwError(error);
      })
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
      return this.authSv.getAccessToken().pipe(
        tap((val) => {
          console.log('Access Token Refreshed!');
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next(val);
        })
      );
    }
  }
}
