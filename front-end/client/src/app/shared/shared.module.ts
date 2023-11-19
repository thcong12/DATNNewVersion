import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ChartModule } from 'primeng/chart';
import { ChipModule } from 'primeng/chip';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { GalleriaModule } from 'primeng/galleria';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
const declarations: any[] = [
  // BaseComponent,
  // InputMsgDirective,
  // LoaderComponent,
  // SortPipe,
  // SearchProductPipe,
];
const primengModule: any[] = [
  DialogModule,
  RatingModule,
  SliderModule,
  GalleriaModule,
  InputTextareaModule,
  DataViewModule,
  ConfirmDialogModule,
  DropdownModule,
  ButtonModule,
  MessagesModule,
  TieredMenuModule,
  MenubarModule,
  MegaMenuModule,
  BreadcrumbModule,
  TabMenuModule,
  StepsModule,
  MenuModule,
  ContextMenuModule,
  PanelMenuModule,
  InputTextModule,
  ToastModule,
  CheckboxModule,
  PasswordModule,
  ChartModule,
  TabViewModule,
  TableModule,
  ChipModule,
];
const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
];
@NgModule({
  declarations: [...declarations],
  exports: [...declarations, ...imports, ...primengModule],
  imports: [...imports, ...primengModule],
})
export class SharedModule {}
