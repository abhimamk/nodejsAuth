import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    FormsModule,
    RouterModule,
    NgxPaginationModule
  ],

  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }
