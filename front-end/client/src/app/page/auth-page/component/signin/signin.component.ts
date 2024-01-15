import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  host: { class: 'form-container sign-up-container' },
  providers: [MessageService],
})
export class SignInComponent implements OnInit {
  error: boolean = false;
  public registerForm!: FormGroup;
  public controlRegister = {
    userName: 'userName',
    email: 'email',
    password: 'password',
    repassword: 'repassword',
    fullName: 'fullName',
    phoneNumber: 'phoneNumber',
  };

  constructor(
    private formBd: FormBuilder,
    private authSv: AuthService,
    private router: Router,
    private messageSv: MessageService
  ) {}

  private formInit() {
    const me = this;
    me.registerForm = me.formBd.group({
      [me.controlRegister.userName]: ['', Validators.required],
      [me.controlRegister.email]: ['', Validators.required],
      [me.controlRegister.password]: ['', Validators.required],
      [me.controlRegister.fullName]: ['', Validators.required],
      [me.controlRegister.phoneNumber]: ['', Validators.required],
    });
  }
  get userFullName() {
    return this.registerForm.get(this.controlRegister.fullName)?.value;
  }
  public registerSubmit() {
    const me = this;
    me.authSv
      .register(me.registerForm.value)
      .pipe(tap((res: HttpResponse<any>) => {}))
      .subscribe({
        complete: () => {
          this.messageSv.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Please check your email to active account',
          });
          this.registerForm.reset();
          // setTimeout(() => {
          //   this.router.navigateByUrl('home');
          // }, 5000);
        },
        error: () => {
          this.error = true;
        },
      });
  }
  ngOnInit(): void {
    const me = this;
    me.formInit();
  }
}
