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
  const mockProduct2 = {
    id: 76,
    name: "The Dark Knight",
    description:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice",
    price: 199,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
    year: 2008,
    added: "2016-01-05T00:00:00",
    productCategory: [
      {
        categoryId: 5,
        category: null
      },
      {
        categoryId: 6,
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

  it("should create rows", () => {
    const service: MockMovieService = TestBed.get(MockMovieService);

    service.addProductToCart(mockProduct);
    component.cart = service.getProductsFromCart();

    component.createOrderRows();
    expect(component.orderRows[0].amount).toBe(1);
  });

  it("should evaluate to true if there are serveral products in cart", () => {
    const service: MockMovieService = TestBed.get(MockMovieService);
    expect(component.plural).toEqual(false);

    service.addProductToCart(mockProduct);
    component.cart = service.getProductsFromCart();
    component.checkPlural();
    expect(component.plural).toEqual(false);

    service.addProductToCart(mockProduct2);
    component.cart = service.getProductsFromCart();
    component.checkPlural();
    expect(component.plural).toEqual(true);
  });
});
