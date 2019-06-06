import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MovieService } from "src/app/services/movie.service";
import { ProductComponent } from "./product.component";
import { Component } from "@angular/core";
import { MockService } from "src/app/services/mock.service";
import { IMovie } from "src/app/interfaces/IMovie";

describe("ProductComponent", () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ProductComponent, TestHostComponent]
    })
      .overrideComponent(ProductComponent, {
        set: {
          providers: [{ provide: MovieService, useClass: MockService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create", () => {
    expect(testHostComponent).toBeTruthy();
  });

  it("should get path for movie poster", () => {
    expect(
      testHostFixture.nativeElement.querySelector("img").getAttribute("src")
    ).toEqual(
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    );
  });

  it("should call addProductToCart", async(() => {
    spyOn(component.cartService, "addProductToCart");

    let button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();

    fixture.whenStable().then(() => {
      expect(component.cartService.addProductToCart).toHaveBeenCalled();
    });
  }));

  @Component({
    selector: `host-component`,
    template: `
      <app-product
        *ngFor="let movie of movies"
        [movie]="movie"
        [moviePoster]="movie.imageUrl"
      ></app-product>
    `
  })
  class TestHostComponent {
    movies: IMovie[];

    constructor(private service: MockService) {
      this.service.getMovieData().subscribe(myMovieData => {
        this.movies = myMovieData;
      });
    }
  }
});
