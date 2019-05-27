import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MockService } from './mock.service';
import { mockProducts } from "../testing/mockData";

describe('MockService', () => {
  let service: MockService;
  let { mockProduct1 } = mockProducts;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(MockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should be able to search for movie", () => {
    const result = service.searchMovies("Dark");

    expect(result).toBeDefined();
  });

  it("should return empty if search-input is empty", () => {
    let result = [];
    service.searchMovies("abcd").subscribe(data => {
      result = data;
    });

    expect(result.length).toBe(0);
  });

  //Tests for cart-service
  it("should add product to cart", () => {
    expect(service.cart.length).toBe(0);
    service.addProductToCart(mockProduct1);
    expect(service.cart.length).toBe(1);
  });

  it("should not add product to cart if cart already contain that product", () => {
    service.addProductToCart(mockProduct1);
    expect(service.cart.length).toBe(1);
    service.addProductToCart(mockProduct1);
    expect(service.cart.length).toBe(1);
  });

  it("should not add order-row if it already exists", () => {
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

  it("should update amount", () => {
    service.addProductToCart(mockProduct1);
    service.updateAmount(3, 79);
    expect(service.orderRows[0].amount).toBe(3);
  })

  it("should check if cart is empty", () => {
    service.removeProductFromCart(mockProduct1);

    const test = service.checkCartEmpty();
    expect(test).toBe(true);
  })

  it("should remove product from cart", () => {
    service.removeProductFromCart(mockProduct1);

    expect(service.cart.length).toBe(0);
    expect(service.orderRows.length).toBe(0);
  })
});
