import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ClothesComponent } from './clothes/clothes.component';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { DressComponent } from './dress/dress.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import {AuthService } from './auth.service';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
  // { path: 'dashboard', component:MainComponent,canActivate: [AuthService] },
  // { path: 'clothes', component: ClothesComponent,canActivate: [AuthService]  },
  // { path: 'product', component: ProductsComponent,canActivate: [AuthService]  },
  // { path: 'checkout', component: CheckoutComponent,canActivate: [AuthService]  },
  // { path: 'order-confirmation', component: OrderConfirmationComponent ,canActivate: [AuthService] },
  // { path: 'dress/:id', component: DressComponent,canActivate: [AuthService]  },
  // { path: 'signup', component: SingupComponent },
  // { path: '', redirectTo:'login',pathMatch:'full' },
  // { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: 'dasboard',pathMatch: 'full' },
  // { path: '', component: LoginComponent,
  //   children:[
  //     {
  //       path:'dashboard',
  //       component:MainComponent
  //     }
  //   ]
  //  }
  { path: 'dashboard', component:MainComponent },
  { path: 'clothes', component: ClothesComponent},
  { path: 'product', component: ProductsComponent },
  { path: 'checkout', component: CheckoutComponent ,canActivate: [AuthService]},
  { path: 'order-confirmation', component: OrderConfirmationComponent,canActivate: [AuthService] },
  { path: 'dress/:id', component: DressComponent},
  { path: 'signup', component: SingupComponent },
  { path: '', redirectTo:'dashboard',pathMatch:'full' },
  { path: 'orders', component: OrdersComponent ,canActivate: [AuthService]},
  { path: '**', redirectTo: 'dasboard',pathMatch: 'full' },
  { path: '', component: MainComponent,
    children:[
      {
        path:'dashboard',
        component:MainComponent
      }
    ]
   }

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
