import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockMovieService } from "./mock-movie.service";

describe("MockMovieService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it("should be created", () => {
    const service: MockMovieService = TestBed.get(MockMovieService);
    expect(service).toBeTruthy();
  });
});
