import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTitleRoutingModule } from './customTitle-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CustomTitleRoutingModule.components],
  imports: [
    CommonModule,
    CustomTitleRoutingModule,
    SharedModule
  ]
})
export class CustomTitleModule { }
