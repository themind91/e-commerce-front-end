import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {ProductService} from "./services/product.service";
import {CartService} from "./services/cart.service";
import {Luv2ShopFormService} from "./services/luv2-shop-form.service";
import {Routes, RouterModule} from "@angular/router";
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component'
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component'
import { ReactiveFormsModule } from '@angular/forms';


const routes:Routes = [
  {path:"checkout", component:CheckoutComponent},
  {path:"card-details", component:CardDetailsComponent},
  {path:"products/:id", component:ProductDetailsComponent},
  {path:"search/:keyword",component: ProductListComponent},
  {path:"category/:id/:name", component: ProductListComponent},
  {path:"category", component: ProductListComponent},
  {path:"products", component: ProductListComponent},
  {path:"", redirectTo:"/products", pathMatch:"full"},
  {path:"**", redirectTo:"/products", pathMatch:"full"}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CardDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ProductService,CartService,Luv2ShopFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
