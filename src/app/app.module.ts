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
import { DetailsComponent } from "./components/details/details.component";
import { BillingFormComponent } from "./components/billing-form/billing-form.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    CatalogComponent,
    CartComponent,
    NotFoundComponent,
    DetailsComponent,
    BillingFormComponent
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
