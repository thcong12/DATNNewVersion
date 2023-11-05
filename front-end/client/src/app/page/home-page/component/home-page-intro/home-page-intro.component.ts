import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { forkJoin, tap } from 'rxjs';
import { CategloryService } from 'src/app/service/categlory.service';
import { DevelopersService } from 'src/app/service/developers.service';


@Component({
  selector: 'app-home-page-intro',
  templateUrl: './home-page-intro.component.html',
  styleUrls: ['./home-page-intro.component.scss'],
})
export class HomePageIntroComponent implements OnInit {
  counter: number = 0;
  items: MegaMenuItem[]=[];
  public categloryList: any = [];
  public developerList: any = [];
  constructor(
    private categlorySv: CategloryService,
    private develeperSv: DevelopersService
  ) {}
  private getCateglory() {
    const me = this;
    forkJoin({
      categlory: me.categlorySv.getCateglorys(),
      developer: me.develeperSv.getDevelopers(),
    })
      .pipe(
        tap(({ categlory, developer }) => {
          categlory.map((item) => {
            return me.categloryList.push({ label: item.cateName });
          });
          developer.map((item) => {
            return me.developerList.push({ label: item.devName });
          });
        })
      )
      .subscribe({
        complete: () => {
          this.items = [
            {
              label: 'New & Noteworthy',
              style: { 'font-size': '15px' },
              items: [
                [
                  {
                    label: 'New & Noteworthy',
                    style: { 'font-size': '15px' },
                    items: [
                      { label: 'Top Seller', routerLink: '/product/list' },
                      { label: 'New & Trending', routerLink: '/product/list' },
                      { label: 'Recently update', routerLink: '/product/list' },
                      { label: 'Special offer', routerLink: '/product/list' },
                    ],
                  },
                ],
              ],
            },
            {
              label: 'Categlory',
              style: { 'font-size': '15px' },
              items: [
                [
                  {
                    label: 'Categlory',
                    style: { 'font-size': '15px' },
                    items: this.categloryList.slice(0, 4),
                  },
                  {
                    label: 'Categlory',
                    style: { 'font-size': '15px' },
                    items: this.categloryList.slice(5, 9),
                  },
                ],
                [
                  {
                    label: 'Categlory',
                    style: { 'font-size': '15px' },
                    items: this.categloryList.slice(10, 14),
                  },
                  {
                    label: 'Categlory',
                    style: { 'font-size': '15px' },
                    items: this.categloryList.slice(15, 19),
                  },
                ],
              ],
            },
            {
              label: 'Developer',
              style: { 'font-size': '15px' },
              items: [
                [
                  {
                    label: 'Developer',
                    style: { 'font-size': '15px' },
                    items: this.developerList.slice(0, 4),
                  },
                  {
                    label: 'Developer',
                    style: { 'font-size': '15px' },
                    items: this.developerList.slice(5, 9),
                  },
                ],
                [
                  {
                    label: 'Developer',
                    style: { 'font-size': '15px' },
                    items: this.developerList.slice(10, 14),
                  },
                  {
                    label: 'Developer',
                    style: { 'font-size': '15px' },
                    items: this.developerList.slice(15, 19),
                  },
                ],
              ],
            },
            {
              label: 'News',
              style: { 'font-size': '15px' },
              styleClass: 'me-4',
            },
          ];
        },
      });
    me.categlorySv.getCateglorys().pipe();
  }
  ngOnInit(): void {
    this.getCateglory();
  }
  onNext() {
    console.log(this.counter);
    if(this.counter>=2){
      this.counter = 0;
    }else{
      this.counter++;
    }
    
  }

  onPrevious() {
    console.log(this.counter);
    if(this.counter<=0){
      this.counter = 2;
    }else{
      this.counter--;
    }
   
  }
  setClass(value: number): any {
    if (this.counter == value) {
      return {
        animate__fadeIn: true,
      };
    } else if (this.counter < value) {
      return { ccc: true, animate__fadeOut: true };
    } else if (this.counter > value) {
      return { ccc: true, animate__fadeOut: true };
    }
  }
}
