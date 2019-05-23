import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule, FormGroup } from "@angular/forms";

import { MovieService } from "../../services/movie.service";
import { MockMovieService } from "../../services/mock-movie.service";

import { BillingFormComponent } from "./billing-form.component";

describe("BillingFormComponent", () => {
  let component: BillingFormComponent;
  let fixture: ComponentFixture<BillingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [BillingFormComponent]
    })
      .overrideComponent(BillingFormComponent, {
        set: {
          providers: [{ provide: MovieService, useClass: MockMovieService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit", () => {
    component.billlingForm.subscribe((myFormData: FormGroup) => {
      expect(myFormData).toBeDefined();
    });
    component.handleOrder();
  });
});
