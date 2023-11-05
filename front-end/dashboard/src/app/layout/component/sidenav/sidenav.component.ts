import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { LayoutService } from '../../service/layout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  providers: [MessageService],
})
export class SidenavComponent implements OnInit {
  items: MenuItem[] = [];
  el: any;

  constructor(
    public layoutService: LayoutService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-fw pi-home fs-4 m-0 py-2',
        label: 'Dashboard',
        routerLink: '/home',
      },
      {
        icon: 'pi pi-fw pi-folder fs-4  m-0 py-2',
        label: 'Table',
        items: [
          {
            label: 'Categlory',
            icon: 'bi bi-grid',
            routerLink: '/table/category',
          },
          {
            label: 'Developer',
            icon: 'bi bi-person-workspace',
            routerLink: '/table/developer',
          },
          {
            label: 'Product',
            icon: 'bi bi-controller',
            routerLink: '/table/products',
          },
        ],
      },
      {
        icon: 'pi pi-fw pi-user fs-4 m-0 py-2',
        label: 'Users',
        items: [
          {
            label: 'Admin',
            icon: 'bi bi-people-fill',
            routerLink: 'accounts/admin',
          },
          {
            label: 'Users',
            icon: 'bi bi-people',
            routerLink: 'accounts/user',
          },
        ],
      },
      {
        icon: 'pi pi-fw pi-calendar fs-4 m-0 py-2',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
          {
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
        ],
      },
    ];
  }
}
