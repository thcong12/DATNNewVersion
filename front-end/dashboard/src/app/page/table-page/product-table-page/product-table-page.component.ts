import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { tap, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { Product } from 'src/app/model/products.model';
import { CategloryService } from 'src/app/service/categlory.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-product-table-page',
  templateUrl: './product-table-page.component.html',
  styleUrls: ['./product-table-page.component.scss'],
  providers: [MessageService],
})
export class ProductTablePageComponent extends BaseComponent {
  public isCreate: boolean = false;
  public categoryId: string = '';
  // @ContentChild(TemplateRef) customTemplateRef!: TemplateRef<any>;
  constructor(private formBd: FormBuilder, private productSv: ProductsService) {
    super();
  }
  public products!: any[];
  public categlory!: Product.Categlory;
  public createNew!: boolean;
  public option: string[] = [];
  public headerTable: string[] = [
    'Image',
    'Name',
    'Price',
    'IsActive',
    'Option',
  ];
  public displayField: string[] = ['imgX', 'productName', 'price', 'isActive'];
  public select: string = '';
  public displayModal!: boolean;
  public controlName = {
    cateName: 'cateName',
    description: 'description',
  };

  public categloryForm!: FormGroup;
  // public confirmCreate1?: Function;
  public createCateglory() {
    const me = this;
    me.displayModal = true;
    me.categloryForm.reset();
    me.createNew = true;
  }
  public getProduct(): void {
    this.productSv.getProducts().subscribe({
      next: (res) => {
        this.products = res.map((item) => {
          return {
            ...item.product,
            imgX: item.product.imgY.url,
          };
        });
      },
    });
  }
  public getCateglory(id: string): void {}
  public confirmCreate() {}
  public confirmUpdate() {}
  private initForm() {
    const me = this;
    me.categloryForm = me.formBd.group({
      [me.controlName.cateName]: ['', Validators.required],
      [me.controlName.description]: ['', Validators.required],
    });
  }
  override onInit(): void {
    this.getProduct();
  }
}
