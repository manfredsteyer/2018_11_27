import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromPassenger from './passenger.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('passenger', fromPassenger.reducer)
  ],
  declarations: []
})
export class PassengersModule { }
