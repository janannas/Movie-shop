import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MockCartService } from "src/app/services/mock-cart.service";
import { CartService } from "src/app/services/cart-service.service";

import { CartComponent } from "./cart.component";
import { BillingFormComponent } from "../billing-form/billing-form.component";

describe("CartComponent", () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: MockCartService;

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
          providers: [{ provide: CartService, useClass: MockCartService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.get(MockCartService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create rows", () => {
    service.addProductToCart(mockProduct);
    component.orderRows = service.createOrderRows();
    expect(component.orderRows[0].amount).toBe(1);
  });

  it("should evaluate to true if there are serveral products in cart", () => {
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

  it("should remove product from cart", () => {
    service.addProductToCart(mockProduct);
    component.cart = service.getProductsFromCart();

    expect(component.cart.length).toBe(1);

    service.removeProductFromCart(mockProduct2);
    expect(component.cart.length).toBe(1);

    service.removeProductFromCart(mockProduct);
    expect(component.cart.length).toBe(0);
  });

  it("should return true if cart is empty", () => {
    service.getProductsFromCart();
    expect(component.emptyCart).toBe(true);
  });

  it("should return false if there are products in cart", () => {
    service.addProductToCart(mockProduct);
    component.emptyCart = service.checkCartEmpty();

    expect(component.emptyCart).toBe(false);
  });

  it("should return true if last product is removed from cart", () => {
    service.addProductToCart(mockProduct);
    service.getProductsFromCart();
    service.removeProductFromCart(mockProduct);

    expect(component.emptyCart).toBe(true);
  });
});
