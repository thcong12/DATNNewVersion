import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ViewModelService } from 'src/app/base/viewModel.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private vms: ViewModelService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    this.vms.globalVariable.screenName = (route.data as any).screenName;
    if (!this.vms.globalVariable.getLoginStage) {
      this.router.navigateByUrl('home');
      return false;
    }
    return true;
  }
}
