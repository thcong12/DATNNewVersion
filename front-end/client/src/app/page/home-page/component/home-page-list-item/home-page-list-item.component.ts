import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/products.model';

@Component({
  selector: 'app-home-page-list-item',
  templateUrl: './home-page-list-item.component.html',
  styleUrls: ['./home-page-list-item.component.scss'],
})
export class HomePageListItemComponent {
  @Input() productItem!: Product.Product;
  @Input() selectedIndex!: number;
  @Input() products!: Product.Product[];
  constructor() {}
  get priceAfterSale() {
    const finalPrice =
      this.productItem.price -
      (this.productItem.price * this.productItem.sale.salePersent) / 100;
    return finalPrice;
  }
  get categoryItem() {
    return this.productItem.detail?.categlory;
  }
}
