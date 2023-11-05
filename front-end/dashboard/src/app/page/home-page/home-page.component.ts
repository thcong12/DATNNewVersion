import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { forkJoin, tap } from 'rxjs';
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
  constructor() // private productSv: ProductsService // private reportSv: ReportService,
  {}
  public getAmount() {
    // const me = this;
    // forkJoin({
    //   besseller: me.reportSv.reportBestSeller(),
    //   amount: me.reportSv.getAmount(),
    //   productList: me.productSv.getProducts(),
    // })
    //   .pipe(
    //     tap(({ besseller, amount, productList }) => {
    //       me.element = amount;
    //       me.bestSeller = [...(besseller as any)];
    //       me.listProduct = [...productList];
    //       console.log(besseller);
    //     })
    //   )
    //   .subscribe();
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
    const me = this;
    this.generateCard();
    me.getAmount();
  }
}
