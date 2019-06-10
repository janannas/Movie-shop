import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { MovieService } from "./movie.service";
import { MockService } from "./mock.service";

describe("MovieService", () => {
  let service: MockService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  beforeEach(() => {
    service = new MockService();
  });

  it("should be created", () => {
    const service: MovieService = TestBed.get(MovieService);
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

  it("should delete specified order", () => {
    let test = service.deleteOrder(1);
    expect(test).toBeDefined;
  });
});
