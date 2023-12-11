import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  Optional,
  Type,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GlobalVariable } from './global-variable';
import { ViewModelService } from './viewModel.service';
import { LayoutService } from '../service/app.layout.service';

@Component({
  template: '',
})
export abstract class BaseComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  public destroy$ = new Subject<void>();
  protected route!: ActivatedRoute;
  protected router!: Router;
  protected vms!: ViewModelService;
  protected layout!: LayoutService;
  constructor(@Optional() protected Injector?: Injector) {
    if (this.Injector) {
      this.vms = this.Injector.get<ViewModelService>(
        ViewModelService as Type<ViewModelService>
      );
      this.route = this.Injector.get(ActivatedRoute);
      this.router = this.Injector.get(Router);
    }
  }
  ngAfterViewInit(): void {
    this.onAfterViewInit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
    this.onDestroy();
  }
  ngOnInit(): void {
    this.onInit();
  }
  protected onInit(): void {}
  protected onDestroy(): void {}
  protected onAfterViewInit(): void {}
  protected onAfterViewChecked(): void {}
}
