import { HttpResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, shareReplay, tap } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { GlobalVariable } from 'src/app/base/global-variable';
import { ViewModelService } from 'src/app/base/viewModel.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: { class: 'form-container sign-in-container' },
})
export class LoginComponent extends BaseComponent {
  private globalVariable: GlobalVariable = new GlobalVariable();
  isCorrectUser: boolean = false;
  private userId: string = '';
  @Output() displayModal = new EventEmitter<boolean>();
  constructor(
    private formBd: FormBuilder,
    private authSv: AuthService,
    private userSv: UserService,
    Injector: Injector
  ) {
    super(Injector);
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
    console.log(me.formLogin.value);
    me.authSv
      .login(me.formLogin.value)
      .pipe(
        shareReplay<any>(),
        tap((res: HttpResponse<any>) => {
          this.userSv.getAllUserOwner();
        })
      )
      .subscribe();
  }
  public openDialog(isDisplay: boolean) {
    this.displayModal.emit(isDisplay);
  }
}
