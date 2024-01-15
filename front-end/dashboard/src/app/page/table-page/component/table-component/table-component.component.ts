import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss'],
})
export class TableComponentComponent implements OnInit {
  @Input() data: any;
  @Input() headerTable: any;
  @Input() displayField: any;
  @Input() detail: any;
  @Input() displayRetrun!: boolean;
  @Input() gotoDetail?: string;
  @Input() isProduct: boolean = false;
  @Output() itemId = new EventEmitter<string>();
  @Output() displayModal = new EventEmitter<boolean>();
  @Output() isCreate = new EventEmitter<boolean>();
  constructor(private router: Router) {}
  first = 0;

  rows = 10;
  public openDialog(isCreate: boolean, id?: string) {
    this.itemId.emit('');
    this.displayModal.emit(!this.displayRetrun);
    this.isCreate.emit(isCreate);
    if (id) {
      this.itemId.emit(id);
    }
  }
  public goTopage(id?: string) {
    this.router.navigate([this.gotoDetail, id]);
  }
  gotoCraeteNewPage() {
    console.log(this.gotoDetail);
    this.router.navigateByUrl(`/${this.gotoDetail}/create`);
  }
  findImg(key: string) {
    if (key.includes('img') || key.includes('vatar')) {
      return true;
    }
    return false;
  }
  ngOnInit(): void {}
  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
