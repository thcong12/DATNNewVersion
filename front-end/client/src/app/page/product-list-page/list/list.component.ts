import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/model/products.model';
import { AuthService } from 'src/app/service/auth.service';
import { CategloryService } from 'src/app/service/categlory.service';
import { DevelopersService } from 'src/app/service/developers.service';
import { ProductsService } from 'src/app/service/products.service';
import { StoreService } from 'src/app/service/store.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  host: { class: 'col-9 productPage__products' },
})
export class ListComponent implements OnInit {
  public selectedCountry: string = '';
  sortOrder!: number;
  layout: string = 'list';
  @Input() listProduct: Product.Product[] = [];
  sortField!: string;
  public numberProduct: number = 16;
  public page: number = 1;
  // public isLogin$: BehaviorSubject<boolean> = this.authsv.isLogin;
  public rangeValues: number[] = [20, 80];
  public sortOptions!: SelectItem[];
  public sortSelect: SelectItem = { label: 'All ', value: '-1' };
  constructor(private authsv: AuthService, private router: Router) {}
  public getProductDetail(id: string): void {
    const me = this;
    me.router.navigateByUrl('/product/' + id);
  }
  public changePage(value: number) {
    const me = this;
    me.page = value;
  }
  first: number = 0;

  rows: number = 10;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
  }
}
