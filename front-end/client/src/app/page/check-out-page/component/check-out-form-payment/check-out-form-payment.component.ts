import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-check-out-form-payment',
  templateUrl: './check-out-form-payment.component.html',
  styleUrls: ['./check-out-form-payment.component.scss'],
})
export class CheckOutFormPaymentComponent implements OnInit {
  public checkOutForm!: FormGroup;
  public data!: any;
  public paymentOption: any = null;
  public total!: BehaviorSubject<number>;
  @Input() userCart: any =[];
  public paymentMethod: any = [
    {
      name: 'Paypal',
      value: 'paypal',
      img: 'https://cdn-icons-png.flaticon.com/512/174/174861.png',
    },
    {
      name: 'Momo',
      value: 'momo',
      img: 'https://static.mservice.io/img/logo-momo.png',
    },
  ];
  public controlName = {
    address: 'address',
    paymentMethod: 'paymentMethod',
    disCountCode: 'disCountCode',
    totalPrice: 'totalPrice',
  };
  public optionPayment(option: any) {
    this.paymentOption = option;
    this.checkOutForm.get(this.controlName.paymentMethod)?.patchValue(option);
    console.log(this.userCart);
  }
  constructor(private formBd: FormBuilder) {}

  private formInit() {
    const me = this;

    me.checkOutForm = me.formBd.group({
      [me.controlName.address]: [
        { disabled: false, value: '' },
        Validators.required,
      ],
      [me.controlName.paymentMethod]: [
        { disabled: false, value: '' },
        Validators.required,
      ],
      [me.controlName.disCountCode]: [
        { disabled: false, value: '' },
        Validators.required,
      ],
      [me.controlName.totalPrice]: [
        { disabled: false, value: '' },
        Validators.required,
      ],
    });
  }
  private getTotalPrice() {
    let total = 0;
    this.userCart.map((item: any) => {
      total += item.price - (item.price * item.sale.salePersent) / 100;
    });
    total = total - this.checkOutForm.get(this.controlName.disCountCode)?.value;
    return this.totalprice?.patchValue(total);
  }
  public discountList = [
    {
      name: 'discout-0',
      discount: 0,
    },
  ];
  get totalprice() {
    return this.checkOutForm.get(this.controlName.totalPrice);
  }

  ngOnInit(): void {
    const me = this;
    me.formInit();
    setTimeout(() => {
      console.log(me.userCart);
    }, 2000);
    me.getTotalPrice();
  }
}
