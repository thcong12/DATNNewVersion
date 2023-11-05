import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';
import { Order } from '../shared/model/store.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public createOrder(order: any): Observable<any> {
    const me = this;
    const url = `/order/neworder`;
    return me.post(url, order);
  }
  public paid(
    cartId: string,
    orderId: string,
    order: Order.Order
  ): Observable<Order.Order> {
    const me = this;
    const url = `/order/pay/${orderId}`;
    return me.put(url, order);
  }
}
