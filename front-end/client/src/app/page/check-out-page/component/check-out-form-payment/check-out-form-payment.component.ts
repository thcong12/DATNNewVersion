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
  @Input() userCart: any = [];
  @Input() totalPrice: any;
  public paymentMethod: any = [
    {
      name: 'Paypal',
      value: 'paypal',
      img: 'https://cdn-icons-png.flaticon.com/512/174/174861.png',
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

  public discountList = [
    {
      name: 'discout-0',
      discount: 0,
    },
  ];
  get totalprice() {
    this.checkOutForm
      .get(this.controlName.totalPrice)
      ?.setValue(this.totalPrice);
    return this.checkOutForm.get(this.controlName.totalPrice);
  }

  ngOnInit(): void {
    const me = this;
    me.formInit();
  }
}
