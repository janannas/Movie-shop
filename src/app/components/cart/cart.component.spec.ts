import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CartComponent } from "./cart.component";
import { BillingFormComponent } from "../billing-form/billing-form.component";
import { mockProducts } from "../../testing/mockProducts";
import { MockService } from "src/app/services/mock.service";
import { CartService } from "src/app/services/cart.service";

describe("CartComponent", () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: MockService;

  let { mockProduct1, mockProduct2 } = mockProducts;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [CartComponent, BillingFormComponent]
    })
      .overrideComponent(CartComponent, {
        set: {
          providers: [{ provide: CartService, useClass: MockService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.get(MockService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create rows", () => {
    service.addProductToCart(mockProduct1);
    component.orderRows = service.createOrderRows();
    expect(component.orderRows[0].amount).toBe(1);
  });

  it("should evaluate to true if there are serveral products in cart", () => {
    expect(component.plural).toEqual(false);

    service.addProductToCart(mockProduct1);
    component.cart = service.getProductsFromCart();
    component.checkPlural();
    expect(component.plural).toEqual(false);

    service.addProductToCart(mockProduct2);
    component.cart = service.getProductsFromCart();
    component.checkPlural();
    expect(component.plural).toEqual(true);
  });

  it("should remove product from cart", () => {
    service.addProductToCart(mockProduct1);
    component.cart = service.getProductsFromCart();

    expect(component.cart.length).toBe(1);

    service.removeProductFromCart(mockProduct1);
    expect(component.cart.length).toBe(0);
  });

  it("should not remove wrong product from cart", () => {
    service.addProductToCart(mockProduct1);
    component.cart = service.getProductsFromCart();

    expect(component.cart.length).toBe(1);

    service.removeProductFromCart(mockProduct2);
    expect(component.cart.length).toBe(1);
  });

  it("should return true if cart is empty", () => {
    service.getProductsFromCart();
    expect(component.emptyCart).toBe(true);
  });

  it("should return false if cart is not empty", () => {
    service.addProductToCart(mockProduct1);
    component.emptyCart = service.checkCartEmpty();

    expect(component.emptyCart).toBe(false);
  });

  it("should return true if last product is removed from cart", () => {
    service.addProductToCart(mockProduct1);
    service.getProductsFromCart();
    service.removeProductFromCart(mockProduct1);

    expect(component.emptyCart).toBe(true);
  });

  it("updating amount should trigger calculateTotalProducts-func", () => {
    spyOn(component, "calculateTotalProducts");
    component.handleUpdateAmount(2, 76);
    fixture.whenStable().then(() => {
      expect(component.calculateTotalProducts).toHaveBeenCalled();
    });
  });

  it("should calculate price for product", () => {
    expect(component.totalProducts).toBe(49);

    service.addProductToCart(mockProduct1);
    component.cart = service.getProductsFromCart();
    component.orderRows = service.createOrderRows();
    component.calculateTotalProducts();

    expect(component.totalProducts).toBe(149);
  });
});
