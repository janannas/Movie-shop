import { TestBed } from '@angular/core/testing';

import { MockMovieService } from './mock-movie.service';

describe('MockMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockMovieService = TestBed.get(MockMovieService);
    expect(service).toBeTruthy();
  });
});
