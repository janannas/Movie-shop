import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockMovieService } from "./mock-movie.service";

describe("MockMovieService", () => {
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

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it("should be created", () => {
    const service: MockMovieService = TestBed.get(MockMovieService);
    expect(service).toBeTruthy();
  });

  it("should add product to cart", () => {
    const service: MockMovieService = TestBed.get(MockMovieService);

    expect(service.cart.length).toBe(0);
    service.addProductToCart(mockProduct);
    expect(service.cart.length).toBe(1);
  });

  it("should not add product to cart if cart already contain that product", () => {
    const service: MockMovieService = TestBed.get(MockMovieService);

    expect(service.cart.length).toBe(0);
    service.addProductToCart(mockProduct);
    expect(service.cart.length).toBe(1);
    service.addProductToCart(mockProduct);
    expect(service.cart.length).toBe(1);
  });
});
