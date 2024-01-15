import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/account.model';
import { Order } from '../model/store.model';
import { BaseService } from './base.service';
import { apiRouter } from '../shared/constant/router-const';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  private api: String = apiRouter.checkout.checkout;
  constructor(http: HttpClient) {
    super(http);
  }
  public createOrder(order: any): Observable<any> {
    const url = this.api + apiRouter.checkout.order;
    return this.post(url, order);
  }
  public paid(orderId: string, order: Order.Order): Observable<Order.Order> {
    const url = this.api + apiRouter.checkout.order + apiRouter.checkout.pay;
    order._id = orderId;
    return this.put(url, order);
  }
}
