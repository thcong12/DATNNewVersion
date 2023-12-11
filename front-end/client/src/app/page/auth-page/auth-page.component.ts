import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent extends BaseComponent {
  isLoginPage: boolean = false;
  swicthPage() {
    this.isLoginPage = !this.isLoginPage;
  }
  public displayModal: boolean = false;
  // public isLogin$: BehaviorSubject<boolean> = this.authSv.isLogin;
  public formChangePassword!: FormGroup;
  public display: boolean = false;

  public showDialog() {
    this.display = true;
  }
  constructor(
    protected injector: Injector,
    private formBd: FormBuilder,
    private authSv: AuthService
  ) {
    super(injector);
  }

  public controlChangePassword = {
    userName: 'userName',
    email: 'email',
  };
  private formInit() {
    const me = this;
    me.formChangePassword = me.formBd.group({
      [me.controlChangePassword.userName]: ['', Validators.required],
      [me.controlChangePassword.email]: ['', Validators.required],
    });
  }

  public changePasswordSubmit() {
    const me = this;
    me.authSv
      .resetPassword(me.formChangePassword.value)
      .pipe(
        tap((res) => {
          alert('Please check your email');
        })
      )
      .subscribe();
  }
  override onInit(): void {
    const me = this;
    me.formInit();
    me.route.paramMap;
  }
}
