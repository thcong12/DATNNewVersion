import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Product } from 'src/app/model/products.model';
import { CategloryService } from 'src/app/service/categlory.service';
import { DevelopersService } from 'src/app/service/developers.service';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.scss'],
})
export class DetailComponentComponent implements OnInit {
  @Input() set productDetail(data: Product.Detail) {
    this.initFormDetail();
    if (!!data) {
      this.productDetailForm.patchValue({
        ...data,
        [this.controlDetail.developer]: data.developer,
        [this.controlDetail.description]: data.description,
      });
      data.categlory.map((item: any) => {
        return this.categloryList.push(this.formBuilder.control(item));
      });
      data.imgList.map((img: any) => {
        const newImage = this.formBuilder.group({
          [this.controlDetail.url]: [img.url],
          [this.controlDetail.title]: [img.title],
        });
        return this.imgList.push(newImage);
      });
      console.log(this.productDetailForm.value);
    }
  }
  @Output() productData = new EventEmitter();
  public selectedValue: any;
  public productDetailForm!: FormGroup;
  public categorys: Product.Categlory[] = [];
  public developers: Product.Developer[] = [];
  public controlDetail = {
    developer: 'developer',
    categlory: 'categlory',
    description: 'description',
    systemrequiment: 'systemrequiment',
    rating: 'rating',
    imgList: 'imgList',
    url: 'url',
    title: 'title',
  };

  constructor(
    private formBuilder: FormBuilder,
    private deveSv: DevelopersService,
    private cateSv: CategloryService
  ) {}
  private initFormDetail() {
    const me = this;
    me.productDetailForm = me.formBuilder.group({
      [me.controlDetail.developer]: ['', Validators.required],
      [me.controlDetail.categlory]: me.formBuilder.array([]),
      [me.controlDetail.description]: ['', Validators.required],
      [me.controlDetail.systemrequiment]: me.formBuilder.array([]),
      [me.controlDetail.imgList]: me.formBuilder.array([]),
    });
  }

  get imgList(): FormArray {
    const me = this;
    return me.productDetailForm.get(me.controlDetail.imgList) as FormArray;
  }
  get categloryList(): FormArray {
    const me = this;
    return me.productDetailForm.get(me.controlDetail.categlory) as FormArray;
  }
  get developerValue() {
    return this.productDetailForm.get(this.controlDetail.developer);
  }
  public addCateglory(item: any) {
    const me = this;
    const cateId = me.categloryList.controls.map((cate) => {
      return cate.value._id;
    });
    console.log(item);
    if (cateId.includes(item._id)) {
      alert('asd');
    } else {
      me.categloryList.push(me.formBuilder.control(item));
    }
  }
  public removeCateglory(id: any) {
    const me = this;
    me.categloryList.removeAt(id);
  }
  getDevName(id: any) {
    return this.developers.find((item) => {
      return String(item._id) == String(id);
    });
  }
  testProduct() {
    console.log(this.productDetailForm.value);
  }
  public addImage() {
    let title = 'image' + (this.imgList.length + 1);
    const newImage = this.formBuilder.group({
      [this.controlDetail.url]: ['', Validators.required],
      [this.controlDetail.title]: [title],
    });
    this.imgList.push(newImage);
  }
  public removeImage(index: number) {
    this.imgList.removeAt(index);
  }
  private getData() {
    this.cateSv.getCateglorys().subscribe({
      next: (res) => {
        this.categorys = res;
      },
    });
    this.deveSv.getDevelopers().subscribe({
      next: (res) => {
        this.developers = res;
        const devId = this.developerValue?.value;
        this.developerValue?.patchValue(
          res.find((item) => {
            return String(item._id) == String(devId);
          })
        );
      },
    });
  }
  public submitData() {
    let categlory: string[];
    let developer: string;
    categlory = this.categloryList.value.map((item: any) => {
      if (item._id) {
        return item._id;
      } else {
        return item;
      }
    });
    console.log(this.productDetailForm.value);
    if (typeof this.developerValue?.value == 'object') {
      developer = this.developerValue?.value._id as any;
    } else {
      developer = this.developerValue?.value;
    }
    this.productData.emit({
      ...this.productDetailForm.value,
      developer: developer,
      categlory: categlory,
    });
  }
  ngOnInit() {
    this.getData();
    if (this.developers) {
      this.initFormDetail();
    }
  }
}
