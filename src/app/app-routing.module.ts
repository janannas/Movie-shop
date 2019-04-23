import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//Components
import { HomeComponent } from "./components/home/home.component";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { ShoppingCartComponent } from "./components/cart/cart.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { DetailsComponent } from "./components/details/details.component";

const routes: Routes = [
  { path: "details/:id", component: DetailsComponent },
  { path: "catalog", component: CatalogComponent },
  { path: "shoppingCart", component: ShoppingCartComponent },
  { path: "", component: HomeComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
