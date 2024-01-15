import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss'],
})
export class DialogComponentComponent {
  @Input() createNew!: boolean;
  @Input() displayModal?: boolean;
  @Output() displayRetrun: EventEmitter<boolean> = new EventEmitter<boolean>(
    this.displayModal
  );
  @Input() formData!: FormGroup;
  @Input() dialogHeader!: string;
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();
  @ContentChild(TemplateRef) customTemplateRef!: TemplateRef<any>;
  constructor() {}
  confirmEvent() {
    this.confirm?.emit(this.formData);
  }
}
