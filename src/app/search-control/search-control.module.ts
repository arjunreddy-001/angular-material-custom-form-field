import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFeildControlComponent as FormFieldControlComponent } from './form-field-control/form-field-control.component';
import { FormFeildContainerComponent as FormFieldContainerComponent } from './form-field-container/form-field-container.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [FormFieldControlComponent, FormFieldContainerComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
  ],
  exports: [FormFieldControlComponent, FormFieldContainerComponent],
})
export class SearchControlModule {}
