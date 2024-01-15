import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/model/products.model';

@Component({
  selector: 'app-general-component',
  templateUrl: './general-component.component.html',
  styleUrls: ['./general-component.component.scss'],
})
export class GeneralComponentComponent implements OnInit {
  @Input() set product(data: Product.Product) {
    if (data) {
      this.initForm();
      this.productForm.patchValue({
        ...data,
        [this.controlProduct.imgX]: data?.imgX.url,
        [this.controlProduct.imgY]: data?.imgY.url,
        [this.controlProduct.salePersent]: data?.sale.salePersent,
        [this.controlProduct.saleEndDay]: new Date(String(data?.sale.endDay)),
        [this.controlProduct.saleStartDay]: new Date(
          String(data?.sale.startDay)
        ),
      });
      console.log(data);
    }
  }
  @Output() dataSubmit = new EventEmitter();
  public productForm!: FormGroup;
  public controlProduct = {
    productName: 'productName',
    shortDescription: 'shortDescription',
    price: 'price',
    salePersent: 'salePersent',
    saleStartDay: 'startDay',
    saleEndDay: 'endDay',
    imgX: 'imgX',
    imgY: 'imgY',
    title: 'title',
    url: 'url',
    isActive: 'isActive',
  };

  constructor(private formBuilder: FormBuilder) {}
  private initForm(): void {
    const me = this;
    me.productForm = me.formBuilder.group({
      [me.controlProduct.productName]: ['', Validators.required],
      [me.controlProduct.price]: [0, Validators.required],
      [me.controlProduct.salePersent]: [0, Validators.required],
      [me.controlProduct.saleStartDay]: ['', Validators.required],
      [me.controlProduct.saleEndDay]: ['', Validators.required],
      [me.controlProduct.shortDescription]: ['', Validators.required],
      [me.controlProduct.imgX]: ['', Validators.required],
      [me.controlProduct.imgY]: ['', Validators.required],
      [me.controlProduct.isActive]: [true, Validators.required],
    });
  }
  submitDataEvnet() {
    this.dataSubmit.emit(this.productForm.value);
  }
  ngOnInit(): void {
    this.initForm();
  }
}
