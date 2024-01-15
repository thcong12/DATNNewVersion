import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';
import { apiRouter } from '../shared/constant/router-const';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends BaseService {
  private api: String = apiRouter.product;
  constructor(http: HttpClient) {
    super(http);
  }
  public getProductsSlider(): Observable<any> {
    const url = this.api + apiRouter.store.slide;
    return this.get(url);
  }
  public search(keyword: string): Observable<any> {
    const url = this.api + apiRouter.store.search;
    return this.post(url, { keyword: keyword });
  }
  public findSameProduct(cate: string) {
    const me = this;
    const url = `/tool/sameproduct/${cate}`;
    return me.get(url);
  }
  public getBestSeller(): Observable<any> {
    const url = this.api + apiRouter.store.bestseller;
    return this.get(url);
  }
  public getNewRelease(): Observable<any> {
    const url = this.api + apiRouter.store.release;
    return this.get(url);
  }
  public getSaleProduct(): Observable<any> {
    const url = this.api + apiRouter.store.sale;
    return this.get(url);
  }
  public filterProduct(value: any): Observable<any> {
    const url = this.api + apiRouter.store.filter;
    return this.post(url, value);
  }
}
