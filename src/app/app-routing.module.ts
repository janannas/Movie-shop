import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//Components
import { HomeComponent } from "./components/home/home.component";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { CartComponent } from "./components/cart/cart.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { CategoryDetailsComponent } from "./components/category-details/category-details.component";
import { AdminComponent } from "./components/admin/admin.component";

const routes: Routes = [
  { path: "categoryDetails/:id", component: CategoryDetailsComponent },
  { path: "productDetails/:id", component: ProductDetailsComponent },
  { path: "catalog", component: CatalogComponent },
  { path: "cart", component: CartComponent },
  { path: "admin", component: AdminComponent },
  { path: "", component: HomeComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
