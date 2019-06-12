import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CartComponent } from "./cart.component";
import { BillingFormComponent } from "../billing-form/billing-form.component";
import { mockProducts } from "../../testing/mockProducts";
import { MockService } from "src/app/services/mock.service";
import { CartService } from "src/app/services/cart.service";
import { ErrorComponent } from "../error/error.component";

describe("CartComponent", () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: MockService;

  let { mockProduct1, mockProduct2 } = mockProducts;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [CartComponent, BillingFormComponent, ErrorComponent]
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

  it("should check if it's product or products", () => {
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

  it("checkPlural should be called when product is removed", () => {
    service.addProductToCart(mockProduct1);
    component.cart = service.getProductsFromCart();

    spyOn(component, "checkPlural");

    component.handleRemoveProduct(mockProduct1);
    fixture.whenStable().then(() => {
      expect(component.checkPlural).toHaveBeenCalled();
    });
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
