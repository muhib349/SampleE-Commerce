import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductItemComponent } from './componentes/products/prodcuct-item.component'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { from } from 'rxjs';
import { CartItemComponent } from './componentes/cart-item/cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductItemComponent,
    CartItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
