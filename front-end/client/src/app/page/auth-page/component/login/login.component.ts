import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: { class: 'form-container sign-in-container' },
})
export class LoginComponent extends BaseComponent {
  isCorrectUser: boolean = false;
  private userId: string = '';
  @Output() displayModal = new EventEmitter<boolean>();
  constructor(
    protected injector: Injector,
    private formBd: FormBuilder,
    private authSv: AuthService,
    private userSv: UserService
  ) {
    super(injector);
  }
  public formLogin!: FormGroup;
  public controlLogin = {
    userName: 'userName',
    password: 'password',
  };
  private formInit() {
    const me = this;
    me.formLogin = me.formBd.group({
      [me.controlLogin.userName]: ['', Validators.required],
      [me.controlLogin.password]: ['', Validators.required],
    });
  }
  override onInit(): void {
    this.formInit();
  }
  public loginSubmit() {
    const me = this;
    me.authSv
      .login(me.formLogin.value)
      .pipe(
        map((data: any) => {
          this.userId = data.body?.user._id as any;
        })
      )
      .subscribe({
        complete: () => {
          this.isCorrectUser = false;
          this.userSv.getCart(this.userId).subscribe();
          // this.userSv.getWishlist().subscribe();
          // this.userSv.getReCommendProduct().subscribe();
        },
        error: () => {
          this.isCorrectUser = true;
        },
      });
  }
  public openDialog(isDisplay: boolean) {
    this.displayModal.emit(isDisplay);
  }
}
