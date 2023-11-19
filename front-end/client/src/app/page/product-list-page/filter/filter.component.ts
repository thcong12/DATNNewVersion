import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  fromEvent,
  map,
  pluck,
  switchMap,
} from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CategloryService } from 'src/app/service/categlory.service';
import { DevelopersService } from 'src/app/service/developers.service';
import { ProductsService } from 'src/app/service/products.service';
import { StoreService } from 'src/app/service/store.service';
import { UserService } from 'src/app/service/user.service';

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
    value: 'value',
    listCateglory: 'listCateglory',
    developer: 'developer',
  };
  private initForm() {
    const me = this;
    me.filterForm = me.formBd.group({
      [me.controlName.value]: me.formBd.array([0, 100]),
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
    return me.filterForm.get(me.controlName.value) as FormArray;
  }
  constructor(
    private productSv: ProductsService,
    private categlorySv: CategloryService,
    private developerSv: DevelopersService,
    private userSv: UserService,
    private storeSv: StoreService,
    private renderer: Renderer2,
    private authsv: AuthService,
    private router: Router,
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
    this.dataFilter.emit(this.filterForm.value);
  }

  ngOnInit(): void {
    this.initForm();
  }
}
