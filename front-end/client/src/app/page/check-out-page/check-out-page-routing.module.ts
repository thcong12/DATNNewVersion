import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutPageComponent } from './check-out-page.component';

const routes: Routes = [
  {
    path: '',
    component:CheckOutPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckOutPageRoutingModule {}
