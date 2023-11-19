import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { UserService } from 'src/app/service/user.service';

declare const paypal: any;
@Component({
  selector: 'checkoutPaypal',
  template: `<div #paypal></div>`,
})
export class PaymentPaypalComponent implements OnInit, AfterViewInit {
  @Input() order!: FormGroup;
  @Input() userCart!: any;

  private orderId!: string;
  @Output() orderChange = new EventEmitter();
  @ViewChild('paypal')
  paypalElement!: ElementRef;
  constructor(
    private formBd: FormBuilder,
    private orderSv: OrderService,
    private cartSv: UserService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.paypalPayment();
  }
  public formData() {}
  private paypalPayment() {
    const me = this;

    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          me.orderSv
            .createOrder({
              ...me.order.value,
              orderItem: me.userCart,
            })
            .subscribe((x: any) => {
              me.orderId = x._id;
            });
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: me.order.value.totalPrice as String,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          me.orderSv.paid(me.userCart, me.orderId, me.order.value).subscribe({
            complete: () => {
              alert('payment success');
              me.router.navigateByUrl('/home');
            },
          });
        },

        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(me.paypalElement.nativeElement);
  }

  ngOnInit(): void {
    const me = this;
    console.log(me.userCart);
  }
}
