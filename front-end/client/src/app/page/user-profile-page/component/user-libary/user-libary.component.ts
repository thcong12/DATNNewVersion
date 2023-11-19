import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-libary',
  templateUrl: './user-libary.component.html',
  styleUrls: ['./user-libary.component.scss'],
})
export class UserLibaryComponent implements OnInit {
  userLibraries!: any;
  constructor() {}

  ngOnInit(): void {}
}
