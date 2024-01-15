import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { tap, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { Product } from 'src/app/model/products.model';
import { CategloryService } from 'src/app/service/categlory.service';
import { DevelopersService } from 'src/app/service/developers.service';

@Component({
  selector: 'app-developer-table-page',
  templateUrl: './developer-table-page.component.html',
  styleUrls: ['./developer-table-page.component.scss'],
  providers: [MessageService],
})
export class DeveloperTablePageComponent extends BaseComponent {
  public isCreate: boolean = false;
  public developerId: string = '';
  // @ContentChild(TemplateRef) customTemplateRef!: TemplateRef<any>;
  constructor(
    private devSV: DevelopersService,
    private formBd: FormBuilder,
    private messageSv: MessageService
  ) {
    super();
  }
  public developers!: Product.Developer[];
  public createNew!: boolean;
  public option: string[] = [];
  public headerTable: string[] = [
    'Image',
    'Developer Name',
    'Description',
    'Option',
  ];

  public displayField: string[] = ['devAvatar', 'devName', 'description'];
  public select: string = '';
  public displayModal!: boolean;
  public developerForm!: FormGroup;
  public controlName = {
    name: 'devName',
    devAvatar: 'devAvatar',
    description: 'description',
    devLinkSocialMedia: 'devLinkSocialMedia',
  };
  // public confirmCreate1?: Function;

  public getDevelopers(): void {
    const me = this;
    me.devSV
      .getDevelopers()
      .pipe(
        takeUntil(this.destroy$),
        tap((data) => {
          me.developers = data;
        })
      )
      .subscribe();
  }
  public getDeveloper(id: string): void {}
  public confirm(event: any) {
    if (this.isCreate) {
      this.devSV
        .createDeveloper(this.developerForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (_req) => {
            this.getDevelopers();
            this.displayModal = false;
          },
        });
    } else {
      this.devSV
        .updateDeveloper(this.developerId, this.developerForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (_req) => {
            this.getDevelopers();
            this.displayModal = false;
          },
        });
    }
  }
  private initForm() {
    this.developerForm = this.formBd.group({
      [this.controlName.name]: ['', Validators.required],
      [this.controlName.devAvatar]: ['', Validators.required],
      [this.controlName.devLinkSocialMedia]: this.formBd.array([]),
      [this.controlName.description]: ['', Validators.required],
    });
  }
  override onInit(): void {
    const me = this;
    this.getDevelopers();
    me.initForm();
    // this.confirmCreate1 = this.confirmCreate.bind(this);
  }
  // override onDestroy(): void {
  //   const me = this;
  //   me.destroy$.next();
  //   me.destroy$.complete();
  //   me.destroy$.unsubscribe();
  // }
}
