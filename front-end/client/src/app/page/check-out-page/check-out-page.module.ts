import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { TabMenuModule } from 'primeng/tabmenu';
import { CheckOutPageComponent } from './check-out-page.component';
import { CheckOutFormPaymentComponent } from './component/check-out-form-payment/check-out-form-payment.component';
import { PaymentPaypalComponent } from './component/payment-paypal.component';
import { CheckOutPageRoutingModule } from './check-out-page-routing.module';
const declarations: any[] = [
  CheckOutPageComponent,
  PaymentPaypalComponent,
  CheckOutFormPaymentComponent,
];
const imports: any[] = [SharedModule, CheckOutPageRoutingModule, TabMenuModule];
@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class CheckOutPageModule {}
