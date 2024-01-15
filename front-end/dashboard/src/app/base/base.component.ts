import {
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
import { LayoutService } from '../layout/service/layout.service';
import { ViewModelService } from './viewModel.service';

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
      this.layout = this.Injector.get<LayoutService>(
        LayoutService as Type<LayoutService>
      );
      this.route = this.Injector.get(ActivatedRoute);
      this.router = this.Injector.get(Router);
    }
  }
  ngAfterViewInit(): void {
    this.onAfterViewInit();
  }

  ngOnDestroy(): void {
    this.onDestroy();
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    this.onInit();
  }
  protected onInit(): void {}
  protected onDestroy(): void {}
  protected onAfterViewInit(): void {}
  protected onAfterViewChecked(): void {}
}
