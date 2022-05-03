import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Observable, Subject } from 'rxjs';

export interface FormFieldValue {
  query: string;
  scope: string;
}

@Component({
  selector: 'form-field-control',
  templateUrl: './form-field-control.component.html',
  styleUrls: ['./form-field-control.component.css'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: FormFeildControlComponent,
    },
  ],
})
export class FormFeildControlComponent
  implements OnInit, MatFormFieldControl<FormFieldValue>
{
  static nextId = 0;

  @ViewChild(MatInput, { read: ElementRef, static: true })
  input!: ElementRef;

  @Input()
  set value(value: FormFieldValue | null) {
    this._value = value;
    this.stateChanges.next();
  }
  get value() {
    return this._value;
  }
  private _value!: FormFieldValue | null;

  stateChanges = new Subject<void>();

  @HostBinding()
  id: string = `custom-form-field-id-${FormFeildControlComponent.nextId++}`;

  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  get placeholder() {
    return this._placeholder;
  }
  private _placeholder!: string;

  ngControl: NgControl | null = null;

  focused!: boolean;

  get empty(): boolean {
    return !this.value?.query && !this.value?.scope;
  }

  @HostBinding('class.floated')
  get shouldLabelFloat(): boolean {
    return true;
  }

  @Input()
  required!: boolean;

  @Input()
  disabled!: boolean;

  errorState: boolean = false;

  controlType: string | undefined = 'custom-form-field';

  autofilled?: boolean | undefined;

  @HostBinding('attr.aria-describedby')
  userAriaDescribedBy: string | undefined = '';

  constructor(private focusMonitor: FocusMonitor) {}

  setDescribedByIds(ids: string[]): void {
    this.userAriaDescribedBy = ids.join(' ');
  }

  onContainerClick(): void {
    this.focusMonitor.focusVia(this.input, 'program');
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.input).subscribe((focused) => {
      this.focused = !!focused;
      this.stateChanges.next();
    });
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.input);
    this.stateChanges.complete();
  }
}
