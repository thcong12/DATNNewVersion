import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/products.model';
import { BaseService } from './base.service';
import { MessageService } from './messenger.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getProducts(): Observable<Product.Display[]> {
    const me = this;
    const url = `product`;
    return me.get(url);
  }
  public getBestSale(): Observable<Product.Display[]> {
    const me = this;
    const url = `product/bestsale`;
    return me.get(url);
  }
  public getOnSale(): Observable<Product.Display[]> {
    const me = this;
    const url = `product/onsale`;
    return me.get(url);
  }
  public getProduct(id: String): Observable<Product.Display> {
    const me = this;
    const url = `product/${id}`;
    return me.get(url);
  }
  public putProductDetail(
    id: String,
    prod: Product.Detail
  ): Observable<Product.Detail> {
    const me = this;
    const url = `product/detail/${id}`;
    return me.put(url, prod);
  }
  public putProduct(
    id: String,
    prod: Product.Product
  ): Observable<Product.Product> {
    const me = this;
    const url = `products/${id}`;
    return me.put(url, prod);
  }
  public createProduct(prod: Product.Product): Observable<Product.Product> {
    const me = this;
    const url = `product`;
    return me.post(url, prod);
  }
}
