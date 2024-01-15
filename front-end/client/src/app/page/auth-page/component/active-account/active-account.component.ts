import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Product } from 'src/app/model/products.model';
import { LayoutService } from 'src/app/service/app.layout.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss'],
})
export class ActiveAccountComponent implements OnInit {
  private token: any;
  constructor(
    private layoutSv: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private authSv: AuthService
  ) {}
  private activeToken() {
    this.route.paramMap
      .pipe(
        tap((param) => {
          this.token = param.get('token') as string;
          console.log(this.token);
        })
      )
      .subscribe({
        next: () => {
          this.authSv.userActive(this.token).subscribe({
            next: () => {
              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 3000);
            },
          });
        },
      });
  }
  ngOnInit(): void {
    this.activeToken();
  }
}
