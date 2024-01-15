import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { forkJoin, tap } from 'rxjs';
import { Product } from 'src/app/model/products.model';
import { ProductsService } from 'src/app/service/products.service';
// import { ProductsService } from 'src/app/shared/service/products.service';
// import { ReportService } from 'src/app/shared/service/report.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public items: MenuItem[] = [];
  public listCard: any = [];
  public element!: any;
  public bestSeller!: any;
  public listProduct!: any;
  public productBestSale!: Product.Display[];
  public productOnSale!: Product.Display[];
  constructor(private productSv: ProductsService) {} // private productSv: ProductsService // private reportSv: ReportService,
  public getAmount() {}

  private getProductOnSale() {
    this.productSv.getOnSale().subscribe({
      next: (data) => {
        this.productOnSale = [...data];
        console.log(this.productOnSale);
      },
    });
  }
  private getProductBestSale() {
    this.productSv.getBestSale().subscribe({
      next: (data) => {
        this.productBestSale = [...data];
        console.log(this.productBestSale);
      },
    });
  }
  public generateCard() {
    this.listCard = [
      { title: 'Amount', value: 0, icon: 'bi bi-cash-coin' },
      { title: 'Product', value: 0, icon: 'bi bi-controller' },
      { title: 'User', value: 0, icon: 'bi  bi-person' },
      { title: 'Amount', value: 0, icon: 'bi bi-cash-coin' },
    ];
  }
  ngOnInit(): void {
    this.generateCard();
    this.getProductBestSale();
    this.getProductOnSale();
  }
}
