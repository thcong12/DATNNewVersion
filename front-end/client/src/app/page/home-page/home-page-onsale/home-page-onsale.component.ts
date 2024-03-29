import { AfterViewInit, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-home-page-onsale',
  templateUrl: './home-page-onsale.component.html',
  styleUrls: ['./home-page-onsale.component.scss'],
  host: { class: 'flex flex-column justify-content-between' },
})
export class HomePageOnsaleComponent implements OnInit, AfterViewInit {
  public data: any = [];

  public idPage: number = 1;
  constructor(private storeSv: StoreService) {}
  ngAfterViewInit(): void {}
  private getData() {
    this.storeSv
      .getSaleProduct()
      .pipe(
        tap((res: any) => {
          this.data = res;
          console.log(this.data);
        })
      )
      .subscribe();
  }
  public setIdPage(id: number) {
    this.idPage = id;
  }
  public aaaa() {
    this.idPage++;
  }
  public bbbb() {
    this.idPage--;
  }

  public priceDiscount(data: any) {
    const finalPrice = data.price - (data.price * data.sale.salePersent) / 100;
    return finalPrice;
  }
  ngOnInit(): void {
    this.getData();
  }
}
