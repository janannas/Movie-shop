import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockMovieService } from "./mock-movie.service";

describe("MockMovieService", () => {
  let service: MockMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.get(MockMovieService);
  });

  it("should be created", () => {
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
});
