import { TestBed } from "@angular/core/testing";

import { MockCartService } from "./mock-cart.service";

describe("MockCartService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: MockCartService = TestBed.get(MockCartService);
    expect(service).toBeTruthy();
  });
});
