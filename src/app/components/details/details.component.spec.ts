import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MovieService } from "../../services/movie.service";
import { MockMovieService } from "../../services/mock-movie.service";

import { DetailsComponent } from "./details.component";

describe("DetailsComponent", () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [DetailsComponent]
    })
      .overrideComponent(DetailsComponent, {
        set: {
          providers: [{ provide: MovieService, useClass: MockMovieService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("movies should have the length of 3", () => {
    expect(component.movies.length).toBe(3);
  });

  it("searchMovies should return the the correct id", () => {
    //Testa att logiken är rätt, att jag får tillbaka det id:et jag förväntar mig
  });
});
