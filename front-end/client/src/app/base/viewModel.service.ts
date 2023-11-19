import { Injectable, Injector } from '@angular/core';
import { GlobalVariable } from './global-variable';

@Injectable({
  providedIn: 'root',
})
export class ViewModelService {
  globalVariable!: GlobalVariable;
  constructor(protected injector: Injector) {
    if (!this.globalVariable) {
      this.globalVariable = new GlobalVariable();
    }
  }
}
