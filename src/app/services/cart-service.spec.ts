import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { MockService } from './mock.Service';
import { mockProducts } from "../testing/mockData";
import { CartService } from './cart.Service';

describe("MockCartmockService", () => {
  const mockService = new MockService();
  let { mockProduct1 } = mockProducts;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it("should be created", () => {
    const mockService: MockService = TestBed.get(CartService);
    expect(mockService).toBeTruthy();
  });

  it("should add product to cart", () => {
    expect(mockService.cart.length).toBe(0);
    mockService.addProductToCart(mockProduct1);
    expect(mockService.cart.length).toBe(1);
  });

  it("should not add product to cart if cart already contain that product", () => {
    mockService.addProductToCart(mockProduct1);
    expect(mockService.cart.length).toBe(1);
    mockService.addProductToCart(mockProduct1);
    expect(mockService.cart.length).toBe(1);
  });

  it("should not add order-row if it already exists", () => {
    mockService.addProductToCart(mockProduct1);
    mockService.addProductToCart(mockProduct1);
    expect(mockService.orderRows.length).toBe(1);
  });

  it("should not add more than 9 products to amount", () => {
    for (let i = 0; i < 10; i++) {
      mockService.addProductToCart(mockProduct1);
    }
    expect(mockService.orderRows[0].amount).toBe(9);
  });

  it("should update amount", () => {
    mockService.addProductToCart(mockProduct1);
    mockService.updateAmount(3, 79);
    expect(mockService.orderRows[0].amount).toBe(3);
  })

  it("should check if cart is empty", () => {
    mockService.removeProductFromCart(mockProduct1);

    const test = mockService.checkCartEmpty();
    expect(test).toBe(true);
  })

  it("should remove product from cart", () => {
    mockService.removeProductFromCart(mockProduct1);

    expect(mockService.cart.length).toBe(0);
    expect(mockService.orderRows.length).toBe(0);
  })
});
