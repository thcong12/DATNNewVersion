import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import {
  BehaviorSubject,
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
import { AuthService } from 'src/app/service/auth.service';
import { CategloryService } from 'src/app/service/categlory.service';
import { DevelopersService } from 'src/app/service/developers.service';
import { ProductsService } from 'src/app/service/products.service';
import { StoreService } from 'src/app/service/store.service';
import { UserService } from 'src/app/service/user.service';

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
    listProduct: [] as Product.Product[],
    listCateglory: [] as Product.Categlory[],
    listDeveloper: [] as Product.Developer[],
  };
  public numberProduct: number = 16;
  public isLogin$: BehaviorSubject<boolean> = this.authsv.isLogin;
  public rangeValues: number[] = [20, 80];
  public sortOptions!: SelectItem[];
  public sortSelect: SelectItem = { label: 'All ', value: '-1' };

  @ViewChild('numberPage') numberPage!: ElementRef;
  constructor(
    private productSv: ProductsService,
    private categlorySv: CategloryService,
    private developerSv: DevelopersService,
    private userSv: UserService,
    private storeSv: StoreService,
    private renderer: Renderer2,
    private authsv: AuthService,
    private router: Router,
    private formBd: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    this.regisSearchEvent();
  }

  public getData() {
    forkJoin({
      products: this.productSv.getProducts(),
      categlory: this.categlorySv.getCateglorys(),
      developer: this.developerSv.getDevelopers(),
    })
      .pipe(
        map(({ products, categlory, developer }) => {
          this.dataInput.listProduct = [...products];
          this.dataInput.listCateglory = [...categlory];
          this.dataInput.listDeveloper = [...developer];
        })
      )
      .subscribe({ next: (_res) => {} });
  }
  private regisSearchEvent(): void {
    const me = this;
    fromEvent(me.inputElement?.nativeElement, 'keyup')
      .pipe(
        pluck('target', 'value'),
        debounceTime(400),
        distinctUntilChanged<any>(),
        filter((value: string) => value.length > 3),
        switchMap((keyword) => {
          return me.storeSv.search(keyword).pipe(
            map((res) => {
              this.dataInput.listProduct = res;
              console.log(keyword);
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
    console.log(data);
  }

  ngOnInit(): void {
    const me = this;
    me.getData();
    me.sortOptions = [
      { label: 'Release', value: 'updatedAt' },
      { label: 'Price High to Low', value: 'price' },
      { label: 'Price Low to High', value: '!price' },
      { label: 'Sort by Name', value: 'productName' },
    ];
  }
}
