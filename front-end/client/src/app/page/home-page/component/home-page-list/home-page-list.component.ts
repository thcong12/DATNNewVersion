import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, map, tap } from 'rxjs';

import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AuthService } from 'src/app/service/auth.service';
import { CategloryService } from 'src/app/service/categlory.service';
import { DevelopersService } from 'src/app/service/developers.service';
import { FeatureService } from 'src/app/service/feature.service';
import { ProductsService } from 'src/app/service/products.service';
import { StoreService } from 'src/app/service/store.service';

const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(-100%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(100%)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(100%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(-100%)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
];
@Component({
  selector: 'app-home-page-list',
  templateUrl: './home-page-list.component.html',
  styleUrls: ['./home-page-list.component.scss'],
  animations: [
    trigger('animImageSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class HomePageListComponent implements OnInit {
  public isLogin$: BehaviorSubject<boolean> = this.authsv.isLogin;
  counter: number = 0;
  public releaseseProducts = [] as any;
  public topSellerProducts = [] as any;
  public selectedIndex = 0;
  public listLink: any = [
    {
      id: '1',
      content: 'New update',
      products: [] as any,
    },
    {
      id: '2',
      content: 'Top seller',
      products: [] as any,
    },
    {
      id: '3',
      content: 'Recommend',
      products: [] as any,
    },
  ];
  public id = '1';
  constructor(
    private productSv: ProductsService,
    private devSv: DevelopersService,
    private cateSv: CategloryService,
    private feaSv: FeatureService,
    private storeSv: StoreService,
    private authsv: AuthService
  ) {}

  public display(id: any) {
    this.selectedIndex = 0;

    this.id = id;
  }
  public getData() {
    const me = this;
    me.productSv
      .getProducts()
      .pipe(
        map((releasese) => {
          let newArray = releasese.slice(0, 10);
          newArray.map((item: any) => {
            let idPr = String(item._id);
            return me.productSv
              .getProductDetail(idPr)
              .pipe(
                tap((res) => {
                  me.releaseseProducts.push(res);
                })
              )
              .subscribe();
          });
        })
      )
      .subscribe({
        complete: () => {
          me.listLink[0].products = me.releaseseProducts;
          console.log(me.listLink[0]);
          console.log(me.releaseseProducts);
        },
      });
  }
  public getData1() {
    const me = this;
    me.storeSv
      .getBestSeller()
      .pipe(
        tap((bestseller) => {
          bestseller.slice(0, 10).forEach((item) => {
            let id1 = item._id;
            if (id1 !== null) {
              me.productSv
                .getProductDetail(String(id1))
                .pipe(
                  tap((res) => {
                    me.listLink[1].products.push(res);
                  })
                )
                .subscribe();
            }
          });
        })
      )
      .subscribe({
        complete: () => {},
      });
  }
  public getData2() {
    const me = this;
    const productArray = JSON.parse(
      String(localStorage.getItem('recommendProduct'))
    );
    console.log(productArray);
    forkJoin(
      productArray.buy.map((item: any) => {
        return me.productSv.getProductDetail(item);
      })
    )
      .pipe(
        tap((res: any) => {
          me.listLink[2].products = [...res];
          console.log(res);
          console.log(me.listLink[2].products);
        })
      )
      .subscribe();
  }
  public slideShow(index: number) {
    this.selectedIndex = index;
  }
  ngOnInit(): void {
    const me = this;
    me.getData();
    me.getData1();
    if (me.isLogin$) {
      me.getData2();
    }
  }
  onNext(productList: any) {
    if (this.counter != productList - 1) {
      this.counter++;
    }
  }

  onPrevious() {
    if (this.counter > 0) {
      this.counter--;
    }
  }
}
