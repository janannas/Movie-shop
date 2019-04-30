import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CartComponent } from "./cart.component";

import { MovieService } from "src/app/services/movie.service";
import { MockMovieService } from "src/app/services/mock-movie.service";

import { BillingFormComponent } from "../billing-form/billing-form.component";

describe("CartComponent", () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const mockProduct = {
    id: 79,
    name: "Modern Times",
    description:
      "The Tramp struggles to live in modern industrial society with the help of a young homeless woman.",
    price: 100,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BYjJiZjMzYzktNjU0NS00OTkxLWEwYzItYzdhYWJjN2QzMTRlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    year: 1936,
    added: "2017-07-01T00:00:00",
    productCategory: [
      {
        categoryId: 7,
        category: null
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [CartComponent, BillingFormComponent]
    })
      .overrideComponent(CartComponent, {
        set: {
          providers: [{ provide: MovieService, useClass: MockMovieService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should calculate total sum of products", () => {
    const service: MockMovieService = TestBed.get(MockMovieService);
    expect(component.totalProducts).toEqual(0);
    service.addProductToCart(mockProduct);
    component.cart = service.getProductsFromCart();
    component.calulateTotalProducts();
    expect(component.totalProducts).toEqual(100);
  });
});
