import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/model/products.model';

@Component({
  selector: 'app-home-page-list-item-detai',
  templateUrl: './home-page-list-item-detai.component.html',
  styleUrls: ['./home-page-list-item-detai.component.scss'],
})
export class HomePageListItemDetaiComponent {
  @Input() productItem!: Product.Product;
  count: number = 0;
  constructor() {}

  onNext(productList: any) {
    if (this.count != productList - 1) {
      this.count++;
    }
  }

  onPrevious() {
    if (this.count > 0) {
      this.count--;
    }
  }
  get productImg() {
    return this.productItem.detail?.imgList;
  }
  get productImgLength() {
    return this.productItem.detail?.imgList.length!;
  }
  get productCateGlory() {
    return this.productItem.detail?.categlory;
  }
}
