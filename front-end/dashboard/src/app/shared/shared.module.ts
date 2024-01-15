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
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { ChartModule } from 'primeng/chart';
const declarations: any[] = [
  // BaseComponent,
  // InputMsgDirective,
  // LoaderComponent,
  // SortPipe,
  // SearchProductPipe,
];
const primengModule: any[] = [
  DialogModule,
  ConfirmDialogModule,
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
  DropdownModule,
  TableModule,
  TagModule,
  MultiSelectModule,
  EditorModule,
  InputSwitchModule,
  CalendarModule,
  ChipModule,
  ChartModule,
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
