import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/products.model';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-home-page-table',
  templateUrl: './home-page-table.component.html',
  styleUrls: ['./home-page-table.component.scss'],
})
export class HomePageTableComponent implements OnInit {
  @Input() productData!: Product.Display[];
  constructor(private productSv: ProductsService) {}

  ngOnInit(): void {}
}
