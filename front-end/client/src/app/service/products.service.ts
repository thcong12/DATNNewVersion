import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/products.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getProducts(): Observable<Product.Product[]> {
    const me = this;
    const url = `/product`;
    return me.get(url);
  }
  public getProductDetail(id: String): Observable<any> {
    const me = this;
    const url = `/product/${id}`;
    return me.get(url);
  }
  public getProduct(id: String): Observable<Product.Product> {
    const me = this;
    const url = `/product/${id}`;
    return me.get(url);
  }

  public putProduct(
    id: String,
    prod: Product.Detail
  ): Observable<Product.Detail> {
    const me = this;
    const url = `/product/${id}`;
    return me.put(url, prod);
  }
  public createProduct(prod: Product.Detail): Observable<Product.Detail> {
    const me = this;
    const url = `/product`;
    return me.post(url, prod);
  }
}
