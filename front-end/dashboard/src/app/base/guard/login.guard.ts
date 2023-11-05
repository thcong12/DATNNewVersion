import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GlobalVariable } from '../global-variable';
import { ViewModelService } from '../viewModel.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  private globalVariable: GlobalVariable;
  constructor(private vms: ViewModelService, private router: Router) {
    this.globalVariable = this.vms.globalVariable;
  }

  canActivate() {
    // Set screen name
    if (this.globalVariable.getLoginStage || undefined) {
      this.router.navigateByUrl(`/home`);
      return false;
    }

    return true;
  }
}
