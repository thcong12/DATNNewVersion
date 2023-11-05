import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { LoaderComponent } from './component/loader/loader.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { TopnavComponent } from './component/topnav/topnav.component';
import { LayoutComponent } from './layout.component';

const declarations: any[] = [
  LayoutComponent,
  LoaderComponent,
  TopnavComponent,
  SidenavComponent,
];
const imports = [CommonModule, MenuModule, PanelMenuModule];
@NgModule({
  declarations: [...declarations],
  exports: [...declarations, ...imports],
  imports: [...imports],
})
export class LayoutModule {}
