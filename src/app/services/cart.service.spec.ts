import { TestBed } from "@angular/core/testing";

import { CartService } from "./cart.service";

describe("CartService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CartService = TestBed.get(CartService);
    expect(service).toBeTruthy();
  });

  it("should add product to cart", () => {
    const service: CartService = TestBed.get(CartService);
    expect(service.cart.length).toBe(0);
    service.addToCart({
      id: 78,
      name: "Le fabuleux destin d'Amélie Poulain",
      description:
        "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
      price: 100,
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNDg4NjM1YjMtYmNhZC00MjM0LWFiZmYtNGY1YjA3MzZmODc5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
      year: 2001,
      added: "2017-07-10T00:00:00",
      productCategory: [
        {
          categoryId: 7,
          category: null
        }
      ]
    });
    expect(service.cart.length).toBe(1);
  });
});
