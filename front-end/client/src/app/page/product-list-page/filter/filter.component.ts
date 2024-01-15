import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() listDeveloper: any = [];
  @Input() listCateglory: any = [];
  @Output() dataFilter = new EventEmitter<any>();

  public filterForm!: FormGroup;
  public controlName = {
    price: 'price',
    listCateglory: 'listCateglory',
    developer: 'developer',
  };
  private initForm() {
    const me = this;
    me.filterForm = me.formBd.group({
      [me.controlName.price]: me.formBd.array([0, 100]),
      [me.controlName.listCateglory]: me.formBd.array([]),
      [me.controlName.developer]: [''],
    });
  }
  get categloryList(): FormArray {
    const me = this;
    return me.filterForm.get(me.controlName.listCateglory) as FormArray;
  }
  get valuePrice(): FormArray {
    const me = this;
    return me.filterForm.get(me.controlName.price) as FormArray;
  }
  get developer() {
    const me = this;
    return me.filterForm.get(me.controlName.developer);
  }
  constructor(
    private storeSv: StoreService,
    private formBd: FormBuilder,
    private route: ActivatedRoute
  ) {}
  public addCateglory(item: any) {
    const me = this;
    const cateId = me.categloryList.controls.map((cate) => {
      return cate.value._id;
    });
    if (cateId.includes(item._id)) {
      alert('asd');
    } else {
      me.categloryList.push(me.formBd.control(item));
    }
  }
  public removeCateglory(id: any) {
    const me = this;
    me.categloryList.removeAt(id);
  }
  public submitForm() {
    const cateValue = this.categloryList.value.map((item: any) => {
      return item._id;
    });
    if (this.developer?.value === null) {
      this.developer?.patchValue({ _id: '' });
    }
    this.dataFilter.emit({
      price: this.valuePrice.value,
      developer: this.developer?.value._id || undefined,
      category: cateValue,
    });

    console.log(this.developer?.value);
  }

  ngOnInit(): void {
    this.initForm();
  }
}
