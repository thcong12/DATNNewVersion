import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';

import { LayoutComponent } from './layout.component';
import { TopNavComponent } from './component/top-nav/top-nav.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { CartNavComponent } from './component/cart-nav/cart-nav.component';
import { BottomNavComponent } from './component/bottom-nav/bottom-nav.component';

const declarations: any[] = [
  LayoutComponent,
  TopNavComponent,
  SideNavComponent,
  CartNavComponent,
  BottomNavComponent,
];
const imports = [CommonModule, MenuModule, PanelMenuModule];
@NgModule({
  declarations: [...declarations],
  exports: [...declarations, ...imports],
  imports: [...imports],
})
export class LayoutModule {}
