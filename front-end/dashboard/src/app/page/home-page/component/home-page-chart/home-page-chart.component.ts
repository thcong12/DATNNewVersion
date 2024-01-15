import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { tap } from 'rxjs';
// import { ReportService } from 'src/app/shared/service/report.service';

@Component({
  selector: 'app-home-page-chart',
  templateUrl: './home-page-chart.component.html',
  styleUrls: ['./home-page-chart.component.scss'],
})
export class HomePageChartComponent implements OnInit {
  public chartAmount!: any;
  public chartUser!: any;
  public data!: any;
  public data1!: any;
  public year!: number;
  public loadData(year: any) {
    // const me = this;
    // me.reportSv
    //   .reportByYear(year)
    //   .pipe(
    //     tap((res: any) => {
    //       console.log(res);
    //       this.chartAmount = {
    //         labels: [
    //           '1',
    //           '2',
    //           '3',
    //           '4',
    //           '5',
    //           '6',
    //           '7',
    //           '8',
    //           '9',
    //           '10',
    //           '11',
    //           '12',
    //         ],
    //         datasets: [
    //           {
    //             label: 'Amount',
    //             data: res.order.map((item: any) => {
    //               return item.value;
    //             }),
    //             backgroundColor: '#42A5F5',
    //           },
    //           {
    //             label: 'User Register',
    //             data: res.user.map((item: any) => {
    //               return item.value;
    //             }),
    //             backgroundColor: '#198754',
    //           },
    //           {
    //             label: 'Product Input',
    //             data: res.product.map((item: any) => {
    //               return item.value;
    //             }),
    //             backgroundColor: '#dc3545',
    //           },
    //         ],
    //       };
    //     })
    //   )
    //   .subscribe((x) => (me.data = x));
  }
  public getData() {
    const me = this;
  }
  public getData1() {}
  private formmatData(data: any) {}
  public loadData1() {
    // const me = this;
    // me.reportSv
    //   .reportByMounth()
    //   .pipe(
    //     tap((res: any) => {
    //       this.chartAmount = {
    //         labels: [
    //           '1',
    //           '2',
    //           '3',
    //           '4',
    //           '5',
    //           '6',
    //           '7',
    //           '8',
    //           '9',
    //           '10',
    //           '11',
    //           '12',
    //           '13',
    //           '14',
    //           '15',
    //           '16',
    //           '17',
    //           '18',
    //           '19',
    //           '20',
    //           '21',
    //           '22',
    //           '23',
    //           '24',
    //           '25',
    //           '26',
    //           '27',
    //           '28',
    //           '29',
    //           '30',
    //         ],
    //         datasets: [
    //           {
    //             label: 'Amount',
    //             data: res.map((item: any) => {
    //               return item.value;
    //             }),
    //             backgroundColor: '#42A5F5',
    //           },
    //         ],
    //       };
    //     })
    //   )
    //   .subscribe((x) => (me.data1 = x));
  }
  constructor() {} // private reportSv: ReportService
  ngOnInit(): void {
    const me = this;
    me.chartAmount = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      datasets: [
        {
          label: 'Amount',
          data: [],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
        {
          label: 'User Register',
          data: [],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4,
        },
        {
          label: 'Product Input',
          data: [],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4,
        },
        {
          label: 'New Post',
          data: [],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4,
        },
      ],
    };
  }
}
