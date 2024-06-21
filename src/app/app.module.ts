import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DressesComponent } from './dresses/dresses.component';
import { ProductsComponent } from './products/products.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { DressComponent } from './dress/dress.component';
import { ClothesComponent } from './clothes/clothes.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import { MatIconModule } from '@angular/material/icon';
import { DressListComponent } from './dressdata';
import { DressService } from './dress.service';
import { NgFor } from '@angular/common';
import { Dress } from './dress.model';
import { OrdersComponent } from './orders/orders.component';
import { CreatorBadgeComponent } from './creator-badge/creator-badge.component';



const initialDressData: Dress[] = [
  { id: 1, name: 'Dress 20', description: 'Dress 1', link: ['/dress', 1], image: '../../assets/p1.png', price: '₹ 19.99 INR' },
];

export const Dressdata: Dress[] = initialDressData;
export function initializeDressData(dressService: DressService) {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      dressService.getDresses().subscribe((data) => {
        Dressdata.length = 0; // Clear existing data
        Dressdata.push(...data); // Update with new data
        resolve(true);
      }, reject);
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DressesComponent,
    MainComponent,
    ProductsComponent,
    OrderConfirmationComponent,
    DressComponent,
    ClothesComponent,
    CheckoutComponent,
    LoginComponent, 
    SingupComponent, OrdersComponent, CreatorBadgeComponent
  ],
  imports: [
    NgFor,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule 
  ],
  providers: [
    DressService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeDressData,
      deps: [DressService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
