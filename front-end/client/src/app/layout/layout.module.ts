import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { LoaderComponent } from './loader/loader.component';
const declarations: any[] = [
  LayoutComponent,
  TopNavComponent,
  SideNavComponent,
  LoaderComponent,
];
const imports: any[] = [
  CommonModule,
  MenuModule,
  PanelMenuModule,
  SidebarModule,
  RadioButtonModule,
  ButtonModule,
  InputSwitchModule,
  InputTextModule,
  OverlayPanelModule,
  DropdownModule,
  ListboxModule,
];
@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class LayoutModule {}
