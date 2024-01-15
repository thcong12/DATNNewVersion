import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { Product } from 'src/app/model/products.model';
import { CategloryService } from 'src/app/service/categlory.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-category-table-page',
  templateUrl: './category-table-page.component.html',
  styleUrls: ['./category-table-page.component.scss'],
  providers: [MessageService],
})
export class CategoryTablePageComponent extends BaseComponent {
  public isCreate: boolean = false;
  public categoryId: string = '';
  // @ContentChild(TemplateRef) customTemplateRef!: TemplateRef<any>;
  constructor(
    private cateSV: CategloryService,
    private formBd: FormBuilder,
    private messageSv: MessageService
  ) {
    super();
  }
  public categlorys!: Product.Categlory[];
  public createNew!: boolean;
  public option: string[] = [];
  public headerTable: string[] = ['Name', 'Description', 'IsActive', 'Option'];
  public displayField: string[] = ['cateName', 'description', 'isActive'];
  public select: string = '';
  public displayModal!: boolean;
  public controlName = {
    cateName: 'cateName',
    description: 'description',
  };

  public categloryForm!: FormGroup;
  // public confirmCreate1?: Function;
  public getCateglorys(): void {
    const me = this;
    me.cateSV
      .getCateglorys()
      .pipe(
        takeUntil(this.destroy$),
        tap((data) => {
          me.categlorys = data;
        })
      )
      .subscribe();
  }
  public getCateglory(id: string): void {
    const cateDetail = this.categlorys.find((item) => {
      return String(id) == String(item._id);
    });

    if (cateDetail) {
      this.categoryId = cateDetail._id;
      this.categloryForm.patchValue({
        [this.controlName.cateName]: cateDetail.cateName,
        [this.controlName.description]: cateDetail.description,
      });
    }
  }
  public confirm(event: any) {
    if (this.isCreate) {
      this.cateSV
        .createCateglory(event.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (_req) => {
            this.messageSv.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category had created',
            });
            this.getCateglorys();
            this.displayModal = false;
          },
        });
    } else {
      this.cateSV
        .updateCateglory(this.categoryId, this.categloryForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (_req) => {
            this.messageSv.add({
              severity: 'success',
              summary: 'Success',
              detail: ' Category had updated',
            });
            this.getCateglorys();
            this.displayModal = false;
          },
        });
    }
  }
  private initForm() {
    const me = this;
    me.categloryForm = me.formBd.group({
      [me.controlName.cateName]: ['', Validators.required],
      [me.controlName.description]: ['', Validators.required],
    });
  }
  override onInit(): void {
    const me = this;
    me.getCateglorys();
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
