import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GlobalVariable } from '../global-variable';
import { ViewModelService } from '../viewModel.service';
// import { ViewModelService } from '@core/base/services/view-model.service';
// import { URLPages } from '@shared/constant/url-pages';

@Injectable({ providedIn: 'root' })
export class CanActivatedGuard implements CanActivate {
  private globalVariable: GlobalVariable;
  constructor(private vms: ViewModelService, private router: Router) {
    this.globalVariable = this.vms.globalVariable;
  }

  canActivate() {
    if (!this.globalVariable.getLoginStage) {
      this.router.navigateByUrl('/login');
      return false;
    }

    // Close all dialogs before navigate new components
    // this.vms.dynamicService.resetDialogStatus();

    return true;
  }
}
