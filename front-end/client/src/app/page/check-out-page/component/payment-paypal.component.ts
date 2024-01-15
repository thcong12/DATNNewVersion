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
    private userSv: UserService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.paypalPayment();
  }
  public formData() {}
  private paypalPayment() {
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          this.orderSv
            .createOrder({
              ...this.order.value,
              orderItem: this.userCart,
            })
            .subscribe((x: any) => {
              this.orderId = x._id;
            });
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: this.order.value.totalPrice as String,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          await actions.order.capture();
          this.orderSv.paid(this.orderId, this.order.value).subscribe({
            complete: () => {
              this.userSv.getAllUserOwner();
              this.router.navigateByUrl('/home');
            },
          });
        },

        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }

  ngOnInit(): void {
    const me = this;
    console.log(me.userCart);
  }
}
