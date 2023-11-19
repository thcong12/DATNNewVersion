import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/service/app.layout.service';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss']
})
export class ActiveAccountComponent implements OnInit {

  constructor(private layoutSv:LayoutService,private router:Router) { }

  ngOnInit(): void {
    this.layoutSv.onMenuToggle()
    setTimeout(() => {
      this.router.navigate(['/home'])
    }, 3000);
  }
 
}
