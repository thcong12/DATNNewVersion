import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { LayoutService } from 'src/app/service/app.layout.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  providers: [MessageService],
})
export class SideNavComponent implements OnInit {
  iitems: MenuItem[] = [];
  el: any;
  model: MenuItem[] = [];

  constructor(
    public layoutService: LayoutService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.model = [
      {
        label: 'Home Store',
        icon: 'pi pi-home',
        routerLink: '/home',
      },
      {
        label: 'Store',
        icon: 'pi pi-box',
        routerLink: '/product',
      },
      {
        label: 'Profile',
        icon: 'pi pi-comments',
        routerLink: '/profile',
      },
    ];
  }
}
