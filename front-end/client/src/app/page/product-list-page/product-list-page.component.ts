import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SelectItem } from 'primeng/api';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  fromEvent,
  map,
  pluck,
  switchMap,
} from 'rxjs';
import { Product } from 'src/app/model/products.model';
import { CategloryService } from 'src/app/service/categlory.service';
import { DevelopersService } from 'src/app/service/developers.service';
import { ProductsService } from 'src/app/service/products.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit, AfterViewInit {
  @ViewChild('input') inputElement?: ElementRef;
  public selectedCountry: string = '';
  public aaa: any[] = [];
  public dataInput: any = {
    listProduct: [] as Product.ProductDisplay[],
    listCateglory: [] as Product.Categlory[],
    listDeveloper: [] as Product.Developer[],
  };
  public numberProduct: number = 16;
  // public isLogin$: BehaviorSubject<boolean> = this.authsv.isLogin;
  public rangeValues: number[] = [20, 80];
  public sortOptions!: SelectItem[];
  public sortSelect: SelectItem = { label: 'All ', value: '-1' };

  @ViewChild('numberPage') numberPage!: ElementRef;
  constructor(
    private productSv: ProductsService,
    private categlorySv: CategloryService,
    private developerSv: DevelopersService,
    private storeSv: StoreService
  ) {}
  ngAfterViewInit(): void {
    this.regisSearchEvent();
  }
  private getListOfProduct() {
    this.productSv.getProducts().subscribe({
      next: (products) => {
        this.dataInput.listProduct = [...products];
        this.dataInput.listProduct.reverse();
      },
    });
  }
  private getListOfCategory() {
    this.categlorySv.getCateglorys().subscribe({
      next: (categlorys) => {
        this.dataInput.listCateglory = [...categlorys];
      },
    });
  }
  private getListOfDeveloper() {
    this.developerSv.getDevelopers().subscribe({
      next: (developers) => {
        this.dataInput.listDeveloper = [...developers];
      },
    });
  }
  public getData() {}
  private regisSearchEvent(): void {
    const me = this;
    fromEvent(me.inputElement?.nativeElement, 'keyup')
      .pipe(
        pluck('target', 'value'),
        debounceTime(700),
        distinctUntilChanged<any>(),
        // filter((value: string) => value.length > 3),
        switchMap((keyword) => {
          return me.storeSv.search(keyword).pipe(
            map((res) => {
              this.dataInput.listProduct = res;
            })
          );
        })
      )
      .subscribe({ complete: () => {} });
  }
  public submitForm(data: any) {
    this.storeSv
      .filterProduct(data)
      .pipe(
        map((res) => {
          this.dataInput.listProduct = res;
        })
      )
      .subscribe({ complete: () => {} });
    // console.log(data);
  }

  ngOnInit(): void {
    this.getListOfProduct();
    this.getListOfCategory();
    this.getListOfDeveloper();
    this.sortOptions = [
      { label: 'Release', value: 'updatedAt' },
      { label: 'Price High to Low', value: 'price' },
      { label: 'Price Low to High', value: '!price' },
      { label: 'Sort by Name', value: 'productName' },
    ];
  }
}
