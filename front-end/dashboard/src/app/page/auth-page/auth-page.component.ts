import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap, catchError, EMPTY } from 'rxjs';
import { LayoutService } from 'src/app/service/app.layout.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  valCheck: string[] = ['remember'];

  password!: string;

  constructor(
    // public layoutService: LayoutService,
    private authSv: AuthService,
    private router: Router,
    private formBd: FormBuilder
  ) {}

  public formLogin!: FormGroup;

  public controlName = {
    userName: 'userName',
    password: 'password',
  };
  private formInit() {
    const me = this;
    me.formLogin = me.formBd.group({
      [me.controlName.userName]: ['', Validators.required],
      [me.controlName.password]: ['', Validators.required],
    });
  }
  public submitLogin() {
    this.authSv
      .login(this.formLogin.value)
      .pipe(
        tap((res) => {
          alert(`welcome back ${res.body.userName}`);
          // this.messageService.add({
          //   severity: 'info',
          //   summary: 'Rejected',
          //   detail: 'You have Rejected 123123',
          // });
          this.router.navigate(['/home']);
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.error('An error occurred:', err.error.message);
          } else {
            console.log(err);
          }
          return EMPTY;
        })
      )
      .subscribe();
  }

  get userNameValue() {
    return this.formLogin.get(this.controlName.userName);
  }
  get passwordValue() {
    return this.formLogin.get(this.controlName.password);
  }
  ngOnInit(): void {
    this.formInit();
  }
}
