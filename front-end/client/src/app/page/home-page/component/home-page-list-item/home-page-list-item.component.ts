import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/products.model';

@Component({
  selector: 'app-home-page-list-item',
  templateUrl: './home-page-list-item.component.html',
  styleUrls: ['./home-page-list-item.component.scss'],
})
export class HomePageListItemComponent {
  @Input() productItem!: Product.ProductDisplay;
  @Input() selectedIndex!: number;
  constructor() {}
  get priceAfterSale() {
    const finalPrice =
      this.productItem.product.price -
      (this.productItem.product.price *
        this.productItem.product.sale.salePersent) /
        100;
    return finalPrice;
  }
  get categoryItem() {
    return this.productItem.detail.categlory;
  }
}
