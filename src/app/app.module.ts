import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ProductComponent } from "./components/product/product.component";
import { HomeComponent } from "./components/home/home.component";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { CartComponent } from "./components/cart/cart.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { BillingFormComponent } from "./components/billing-form/billing-form.component";
import { CategoryDetailsComponent } from "./components/category-details/category-details.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    CatalogComponent,
    CartComponent,
    NotFoundComponent,
    ProductDetailsComponent,
    BillingFormComponent,
    CategoryDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
