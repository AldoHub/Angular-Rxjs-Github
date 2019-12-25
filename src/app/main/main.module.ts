import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {  FormsModule,ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
  
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }