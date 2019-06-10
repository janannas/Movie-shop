import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { MockService } from "./mock.Service";
import { mockProducts } from "../testing/mockProducts";
import { CartService } from "./cart.Service";

describe("CartService", () => {
  let service: MockService;
  let { mockProduct1, mockProduct2 } = mockProducts;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  beforeEach(() => {
    service = new MockService();
  });

  it("should be created", () => {
    const mockService: MockService = TestBed.get(CartService);
    expect(mockService).toBeTruthy();
  });

  it("should add product to cart", () => {
    expect(service.cart.length).toBe(0);
    service.addProductToCart(mockProduct1);
    expect(service.cart.length).toBe(1);
  });

  it("should not add product to cart if cart already contain that product", () => {
    expect(service.cart.length).toBe(0);

    service.addProductToCart(mockProduct1);
    expect(service.cart.length).toBe(1);

    service.addProductToCart(mockProduct1);
    expect(service.cart.length).toBe(1);
  });

  it("should not add order-row if it already exists", () => {
    service.addProductToCart(mockProduct1);
    service.addProductToCart(mockProduct1);
    service.addProductToCart(mockProduct1);
    expect(service.orderRows.length).toBe(1);
  });

  it("should not add more than 9 products to amount", () => {
    for (let i = 0; i < 10; i++) {
      service.addProductToCart(mockProduct1);
    }
    expect(service.orderRows[0].amount).toBe(9);
  });

  it("should update amount with requested value", () => {
    service.addProductToCart(mockProduct1);
    service.updateAmount(3, 79);
    expect(service.orderRows[0].amount).toBe(3);
  });

  it("should increase amount by 1 each time", () => {
    expect(service.orderRows.length).toBe(0);
    //The first product added does not generate any order-rows, thereby not amount either.
    service.addProductToCart(mockProduct1);
    service.addProductToCart(mockProduct1);
    expect(service.orderRows[0].amount).toBe(2);

    service.addProductToCart(mockProduct1);
    expect(service.orderRows[0].amount).toBe(3);
  });

  it("should remove product completly from cart", () => {
    service.addProductToCart(mockProduct1);

    expect(service.cart.length).toBe(1);
    service.removeProductFromCart(mockProduct1);

    expect(service.cart.length).toBe(0);
    expect(service.orderRows.length).toBe(0);
  });

  it("should check if cart is empty", () => {
    const test1 = service.checkCartEmpty();
    expect(test1).toBe(true);

    service.addProductToCart(mockProduct1);

    const test2 = service.checkCartEmpty();
    expect(test2).toBe(false);
  });

  it("should return message about product", () => {
    service.getProductMsg().subscribe(result => {
      expect(result.productAmount).toBe(1);
      expect(result.productName).toBe("Interstellar");
      expect(result.productImage).toBe(
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SY1000_CR0,0,640,1000_AL_.jpg"
      );
      expect(result.productRejected).toBe(false);
    });
  });

  it("should indicate the state of cart", () => {
    service.getShowCartIndicator().subscribe(result => {
      expect(result).toBeUndefined();
    });

    service.addProductToCart(mockProduct1);
    service.getShowCartIndicator().subscribe(result => {
      expect(result).toBe(false);
    });

    service.removeProductFromCart(mockProduct1);
    service.getShowCartIndicator().subscribe(result => {
      expect(result).toBe(true);
    });
  });

  it("should reset cart", () => {
    expect(service.cart.length).toBe(0);
    service.addProductToCart(mockProduct1);
    service.addProductToCart(mockProduct2);
    expect(service.cart.length).toBe(2);
    service.resetCart();
    expect(service.cart.length).toBe(0);
  });
});
