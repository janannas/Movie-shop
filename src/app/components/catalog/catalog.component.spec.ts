import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CatalogComponent } from "./catalog.component";
import { MoviePosterComponent } from "../movie-poster/movie-poster.component";

describe("CatalogComponent", () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent, MoviePosterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have length of 3", () => {
    expect(component.moviePosters.length).toBe(3);
  });
});
