import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { MockService } from "./mock.Service";
import { mockProducts } from "../testing/mockProducts";
import { CartService } from "./cart.Service";

describe("CartService", () => {
  const mockService = new MockService();
  let { mockProduct1, mockProduct2 } = mockProducts;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

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
  });

  it("should increase amount by 1", () => {
    expect(mockService.orderRows[0].amount).toBe(3);
    mockService.increaseAmount(mockProduct1);
    mockService.createOrderRows();
    expect(mockService.orderRows[0].amount).toBe(4);
  });

  it("should check if cart is empty", () => {
    const test1 = mockService.checkCartEmpty();
    expect(test1).toBe(false);

    mockService.removeProductFromCart(mockProduct1);

    const test2 = mockService.checkCartEmpty();
    expect(test2).toBe(true);
  });

  it("should remove product from cart", () => {
    mockService.removeProductFromCart(mockProduct1);

    expect(mockService.cart.length).toBe(0);
    expect(mockService.orderRows.length).toBe(0);
  });

  it("should return message about product", () => {
    mockService.getProductMsg().subscribe(result => {
      expect(result.productAmount).toBe(1);
      expect(result.productName).toBe("Interstellar");
      expect(result.productImage).toBe(
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SY1000_CR0,0,640,1000_AL_.jpg"
      );
      expect(result.productRejected).toBe(false);
    });
  });

  it("should change value to false", () => {
    mockService.addProductToCart(mockProduct1);
    mockService.getshowCartIndicator().subscribe(result => {
      expect(result).toBe(false);
    });

    mockService.removeProductFromCart(mockProduct1);
    mockService.getshowCartIndicator().subscribe(result => {
      expect(result).toBe(true);
    });
  });

  it("should reset cart", () => {
    mockService.addProductToCart(mockProduct1);
    mockService.addProductToCart(mockProduct2);
    expect(mockService.cart.length).toBe(2);
    mockService.resetCart();
    expect(mockService.cart.length).toBe(0);
  });
});
