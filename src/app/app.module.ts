import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ProductComponent } from "./components/product/product.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./components/home/home.component";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { CartComponent } from "./components/cart/cart.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HttpClientModule } from "@angular/common/http";
import { DetailsComponent } from "./components/details/details.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    CatalogComponent,
    CartComponent,
    NotFoundComponent,
    DetailsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
