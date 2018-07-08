import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { AppComponent } from './app.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { PlaceOrderService } from './services/place-order.service';

@NgModule({
  declarations: [
    AppComponent,
    PlaceOrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ],
  providers: [PlaceOrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
