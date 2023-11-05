import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { LayoutService } from '../../service/layout.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    private authSv: AuthService
  ) {}
  showUserProfile() {
    console.log('dâsd');
  }
  ngOnInit(): void {}
  onLogOut() {
    this.authSv.logout().subscribe();
  }
}
